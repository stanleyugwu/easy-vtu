import { MaterialIcons as Icon } from "@expo/vector-icons";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import myAxios from "../../adapters/instance";
import Button from "../../components/Button";
import ContactPicker from "../../components/ContactPicker";
import DataPlansModal from "../../components/DataPlansModal";
import DetectedLines from "../../components/DetectedLines";
import ErrorText from "../../components/ErrorText";
import InputField from "../../components/InputField";
import InsufficientFund from "../../components/InsufficientFund";
import LoaderModal from "../../components/LoaderModal";
import NetworkProvidersDialog from "../../components/NetworkProvidersDialog";
import PaymentMethodPicker, {
  PaymentMethods,
} from "../../components/PaymentMethodPicker";
import RippleButton from "../../components/RippleButton";
import SavedHistory from "../../components/SavedHistory";
import StatusModal from "../../components/StatusModal";
import Text, { View } from "../../components/Themed";
import tw from "../../lib/tailwind";
import store from "../../store";
import { saveToHistoryData } from "../../store/slices/appSlice";
import { removeMoney } from "../../store/slices/walletSlice";
import {
  Contact,
  DataPlan,
  FormFieldsTypes,
  NetworkCarriers,
  NetworkServiceId,
  RootStackScreenProps,
  RootTabScreenProps,
  Server,
} from "../../types";
import detectCarrierFromNumber, {
  NetworkProvidersNames,
} from "../../utils/detectCarrierFromNumber";
import formatPhoneNumber from "../../utils/formatPhoneNumber";

const DataScreenSchema = Yup.object().shape({
  provider: Yup.number()
    .test("provider-valid", "Select a network provider for top-up", (value) => {
      return (
        value != undefined &&
        value in NetworkCarriers &&
        value != NetworkCarriers.Unknown
      );
    })
    .required("You didn't select a provider to top up"),

  phoneNumber: Yup.string()
    .matches(/^0(7|8|9)(0|1)[0-9]{8}$/, "Mobile number is invalid")
    .required("You didn't enter a mobile number"),

  plan: Yup.string().required("You didn't select a data plan"),
});

const DataScreen = ({
  navigation,
}: RootStackScreenProps<"DataScreen"> & RootTabScreenProps<"Wallet">) => {
  const [contactPickerVisible, setContactPickerVisible] = React.useState(false);
  const [savedHistoryModalVisible, setSavedHistoryModalVisible] =
    React.useState(false);

  /*******************
   * FORMIK HANDLERS
   *******************/
  const onSubmit = (values: any) => {
    // At this point we're ready to hit the server
    setPaymentMethodModalVisible(true);
  };

  const formik = useFormik({
    initialValues: {
      provider: NetworkCarriers.Unknown,
      phoneNumber: "",
      plan: "",
    },
    onSubmit: onSubmit,
    validationSchema: DataScreenSchema,
  });

  /*******************
   * CONTACT HANDLERS
   *******************/
  const openContactPicker = React.useCallback(() => {
    setContactPickerVisible(true);
  }, []);

  const closeContactPicker = React.useCallback(() => {
    setContactPickerVisible(false);
  }, []);

  const handleContactSelect = React.useCallback((contact: Contact) => {
    const phone = formatPhoneNumber(contact.phoneNumber),
      carrier = detectCarrierFromNumber(phone);
    formik.setValues(
      {
        ...formik.values,
        provider: carrier,
        phoneNumber: phone,
      },
      true
    );
    closeContactPicker();
  }, []);

  /*********************************
   * PHONE NUMBER DETECTION HANDLERS
   *********************************/
  const handleSimLineDetect = React.useCallback(
    (number: string, carrier: NetworkCarriers) => {
      formik.setValues(
        {
          ...formik.values,
          provider: carrier,
          phoneNumber: number,
        },
        true
      );
    },
    []
  );

  // Effect for detecting carrier from recipient number field as user types
  React.useEffect(() => {
    let recipientNumber = formik.values.phoneNumber;
    // we try to detect carrier from number as user enters it
    if (recipientNumber.length > 3 && recipientNumber.startsWith("0")) {
      // number is e.g 0806
      formik.setFieldValue(
        "provider",
        detectCarrierFromNumber(recipientNumber)
      );
    }
  }, [formik.values.phoneNumber]);

  /****************************
   * NETWORK PROVIDER SELECTION HANDLERS
   ****************************/
  const handleProviderSelection = React.useCallback(
    (selectedProvider: NetworkCarriers) => {
      formik.setFieldValue("plan", "");
      formik.setFieldValue("provider", selectedProvider);
    },
    []
  );

  /****************************
   * DATA PLAN SELECTION HANDLERS
   ****************************/
  const [dataPlansModalVisible, setDataPlansModalVisible] =
    React.useState(false);
  const planInfo = React.useRef<{
    variation_code: string;
    variation_amount: string;
  }>({
    variation_amount: "",
    variation_code: "",
  });
  const handleDataPlanSelect = React.useCallback((plan: DataPlan) => {
    formik.setFieldValue("plan", plan.name);
    closeDataPlansModal();
    /**
     * For readability, We're setting `variation_name` of plan in state to show user,
     * instead of `variation_code` which the server requires for top-up.
     * So below will make sure the `variation_code` of any selected plan is cached, to be used
     * when it's time to hit the server. We also store `variation_amount` for checking plan price
     */
    planInfo.current.variation_code = plan.variation_code;
    planInfo.current.variation_amount = plan.variation_amount;
  }, []);

  const closeDataPlansModal = React.useCallback(
    () => setDataPlansModalVisible(false),
    []
  );

  /****************************
   * HISTORY SELECTION HANDLERS
   ****************************/
  const handleHistorySelect = React.useCallback(
    (networkName: NetworkCarriers, phoneNumber: string) => {
      formik.setFieldValue("provider", networkName);
      formik.setFieldValue("phoneNumber", phoneNumber);
      closeHistoryModal();
    },
    []
  );

  const closeHistoryModal = React.useCallback(
    () => setSavedHistoryModalVisible(false),
    []
  );

  /****************************
   * PAYMENT METHOD HANDLERS
   ****************************/
  const [paymentMethodModalVisible, setPaymentMethodModalVisible] =
    React.useState(false);
  const handlePaymentMethodSelect = (selectedMethod: PaymentMethods) => {
    closePaymentMethodModal(); // close the payment method modal
    setProcessingModalVisible(true); // show loader

    if (selectedMethod == "wallet") handleWalletPayment();
  };

  const closePaymentMethodModal = React.useCallback(
    () => setPaymentMethodModalVisible(false),
    []
  );

  // handles topping up from wallet
  const handleWalletPayment = () => {
    const walletBalance = store.getState().wallet.balance;
    const topupAmount = parseInt(planInfo.current.variation_amount, 10);

    // just extra check in case parsing variation_amount fails
    if (!topupAmount || typeof topupAmount != "number") {
      // we hope the condition fails cus we're supposed to be able to parse variation_amount to
      // valid integer unless server returned invalid amount
      setProcessingModalVisible(false); // hide processing modal
      setProcessingError(
        "An error occured!, Please check your inputs and try again."
      ); // show error
      return; // terminate
    }

    // assert user has enough balance to perform transaction
    if (walletBalance < topupAmount) {
      // insufficent fund
      setProcessingModalVisible(false); // hide processing modal
      setInsufficientFundModalVisible(true); // show error
      return; // terminate
    }

    // regenerate new abortcontroller every time a request is about to be made
    // so as to avoid permanently cancelling a request
    controller = new AbortController();

    const networkId = (
      NetworkCarriers[formik.values.provider] + "-data"
    ).toLowerCase() as NetworkServiceId;
    const phone = formik.values.phoneNumber;
    const planId = planInfo.current.variation_code;

    // At this point, balance is sufficient for the transaction.
    // everything is set, let's hit the server
    myAxios
      .post<any, AxiosResponse<Server.TopupData>, FormFieldsTypes.TopupData>(
        "/api/top_data",
        {
          amount: topupAmount.toString(),
          phone,
          serviceID: networkId,
          variation_code: planId,
        },
        {
          signal: controller.signal,
        }
      )
      .then(({ data: { message } }) => {
        // Transaction succeeded.
        // let's deduct money from wallet, hide processing loader, show success modal, and save transaction to history
        dispatch(removeMoney(topupAmount));
        dispatch(
          saveToHistoryData({
            date: Date.now(),
            networkName: formik.values.provider,
            phoneNumber: phone,
          })
        );
        setProcessingModalVisible(false);
        setProcessingSuccessful(message);
      })
      .catch((error: Server.RequestError) => {
        setProcessingModalVisible(false);
        setProcessingError(error.message);
      });
  };

  /****************************
   * PROCESSING/ERROR MODAL HANDLERS
   ****************************/
  const [processingModalVisible, setProcessingModalVisible] =
    React.useState(false);
  const [insufficientFundModalVisible, setInsufficientFundModalVisible] =
    React.useState(false);
  const [processingError, setProcessingError] = React.useState("");
  const [processingSuccessful, setProcessingSuccessful] = React.useState("");

  //axios abort controller source
  let controller = new AbortController();
  const dispatch = useDispatch();

  const phoneInputRightIcons = React.useMemo(
    () => (
      <View style={tw`flex-row bg-transparent`}>
        <RippleButton
          rippleColor="#0009"
          onPress={() => setSavedHistoryModalVisible(true)}
        >
          <View
            style={tw`p-2 rounded-full mb-1 mr-2.5 justify-center items-center`}
          >
            <Icon
              name="history"
              size={23}
              style={tw`text-primary rounded-full`}
            />
          </View>
        </RippleButton>
        <RippleButton rippleColor="#0009" onPress={openContactPicker}>
          <View style={tw`p-2 rounded-full mb-1 justify-center items-center`}>
            <Icon
              name="contacts"
              size={23}
              style={tw`text-primary rounded-full`}
            />
          </View>
        </RippleButton>
      </View>
    ),
    []
  );

  //cancel request when user exits screen
  navigation.addListener("beforeRemove", () => {
    controller.abort();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10 }}
        keyboardShouldPersistTaps="always"
      >
        <DetectedLines
          onSimLinePress={handleSimLineDetect}
          onProfileNumberPress={handleSimLineDetect}
        />

        {/* PANE TO SELECT PROVIDER */}
        <View style={tw.style(`bg-transparent pb-0 rounded-md mt-5`)}>
          <Text
            type="body2"
            style={[tw`font-sans-bold pb-2`, { color: "#666" }]}
          >
            <Icon name="signal-cellular-alt" size={14} /> Choose network:
          </Text>
          <NetworkProvidersDialog
            onNetworkSelect={handleProviderSelection}
            selectedNetwork={formik.values.provider}
          />
          <ErrorText error={formik.errors.provider} />
        </View>

        {/* PANE TO ENTER MOBILE NUMBER */}
        <View style={tw.style(`mt-5 bg-transparent`)}>
          <InputField
            fieldType="input"
            fieldLabel={"Recipient Mobile Number:"}
            fieldLabelIcon="phone-portrait"
            fieldRequired={false}
            placeholder="Enter Mobile Number"
            accessibilityLabel="recipient numbers input"
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange("phoneNumber")}
            rightInputNode={phoneInputRightIcons}
            extraInputProps={{
              keyboardType: "number-pad",
              maxLength: 20,
              accessibilityLabel: "multi-number recipients input",
              accessibilityRole: "text",
            }}
          />
          <ErrorText error={formik.errors.phoneNumber} />
        </View>

        {/* PANE TO SELECT DATA PLAN */}
        <View style={tw.style(`mt-5 bg-transparent`)}>
          <InputField
            fieldType="button"
            value={
              formik.values.plan.length == 0
                ? `Select${
                    formik.values.provider != NetworkCarriers.Unknown
                      ? " " + NetworkCarriers[formik.values.provider]
                      : ""
                  } Plan`
                : formik.values.plan
            }
            fieldLabel="Data plan:"
            fieldRequired={false}
            onButtonPress={() => {
              // do nothing if invalid provider was selected, else open dataplans modal
              if (formik.values.provider === NetworkCarriers.Unknown)
                return formik.validateField("provider");
              setDataPlansModalVisible(true);
            }}
            rightInputIcon="chevron-down"
          />
          <ErrorText error={formik.errors.plan} />
        </View>

        <Button
          style={tw`mt-7`}
          label="Buy Now"
          onPress={(e) => formik.handleSubmit()}
        />
      </ScrollView>

      {/***********
       * OVERLAYS
       ************/}
      <DataPlansModal
        isVisible={dataPlansModalVisible}
        onClose={closeDataPlansModal}
        plansProvider={
          // the values of NetworkCarrier keys match NetworkProviderNames type
          NetworkCarriers[formik.values.provider] as NetworkProvidersNames
        }
        onPlanSelect={handleDataPlanSelect}
      />
      <SavedHistory
        historyType="data"
        isVisible={savedHistoryModalVisible}
        onClose={closeHistoryModal}
        onHistorySelect={handleHistorySelect}
      />
      <PaymentMethodPicker
        onBackdropPress={closePaymentMethodModal}
        onBackButtonPress={closePaymentMethodModal}
        onMethodSelect={handlePaymentMethodSelect}
        isVisible={paymentMethodModalVisible}
      />
      {processingError ? (
        <StatusModal
          statusTextTitle="Transaction Failed"
          status="failure"
          statusText={processingError}
          onClose={() => setProcessingError("")}
        />
      ) : null}
      {processingSuccessful ? (
        <StatusModal
          statusTextTitle="Transaction Successful"
          status="success"
          statusText={processingSuccessful}
          onClose={() => {
            // lets clear form when transaction is successful
            formik.resetForm();
            setProcessingSuccessful("");
          }}
        />
      ) : null}
      {processingModalVisible ? (
        <LoaderModal loadingText="Processing..." />
      ) : null}
      <InsufficientFund
        isVisible={insufficientFundModalVisible}
        onTopUp={() => {
          setInsufficientFundModalVisible(false);
          navigation.navigate("Wallet");
        }}
        onClose={() => setInsufficientFundModalVisible(false)}
      />
      <ContactPicker
        isVisible={contactPickerVisible}
        onBackButtonPress={closeContactPicker}
        onBackdropTouch={closeContactPicker}
        onContactSelect={handleContactSelect}
      />
    </SafeAreaView>
  );
};

export default DataScreen;
