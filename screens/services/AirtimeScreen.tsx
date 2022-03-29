import React from "react";
import SafeArea from "../../components/CustomSafeAreaView";
import Text, { View } from "../../components/Themed";
import {
  ActivityIndicator,
  Image,
  View as _View,
} from "react-native";
import { useSelector } from "react-redux";
import CurvedButton from "../../components/Button";
import tw from "../../lib/tailwind";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import ContactPicker from "../../components/ContactPicker";
import type { RootStackScreenProps, productType, RootState } from "../../types";
import RippleButton from "../../components/RippleButton";
import withTile from "../../hooks/withTile";

// Assets
const mtnLogo = require("../../assets/images/providers/MTN_LOGO.png");

const motto = {
  mtn: "EveryWhere You Go",
  airtel: "The Smartphone Network",
  "9mobile": "Ig9ting the evolution",
  glo: "Rule Your World",
};

const LoadingIndicator = (
  <View
    style={tw`self-center justify-center items-center flex-1 bg-transparent`}
  >
    <ActivityIndicator size={50} color={tw.color("primary")} />
  </View>
);

const AirtimeScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"AirtimeScreen">) => {
  const userPhone = useSelector((state:RootState) => state.user?.profile.phone || "");

  const [screenLoaded, setScreenLoaded] = React.useState(false);
  const [contactPickerVisible, setContactPickerVisible] = React.useState(false);

  const [recipientNumber, setRecipientNumber] = React.useState("");

  const [airtimeAmount, setAirtimeAmount] = React.useState(50);

  const recipientsInputRef = React.useRef<_View>(null);

  const gotoTransationReview = React.useCallback(() => {
    let paramObj = {
      productType: "airtime" as productType,
      product: networkName + " Airtime Top-Up",
      transactionCost: airtimeAmount,
    };
    navigation.navigate("TransactionReviewScreen", paramObj);
  }, []);

  //destructure passed route params
  const {
    networkName = "MTN",
    providerLogoSrc = mtnLogo,
    recipientType,
  } = route.params;

  // set screenLoaded to true after first-render
  // this would then mount real component in place of a loader which is first mounted to enable
  // speedy transition from previous screen
  React.useEffect(() => {
    setScreenLoaded(true);
  }, []);

  //concat users phone to recipient type of 'My Self'
  const userPhoneFormatted = recipientType == "My Self" ? ` ${userPhone}` : "";

  const handleSetAirtimeAmount = React.useCallback(
    (amount) => setAirtimeAmount(amount),
    []
  );

  const handleRecipientNumberChange = React.useCallback((text) => {
    setRecipientNumber(text);
  }, []);

  const handleContactSelect = React.useCallback((contact) => {
    handleRecipientNumberChange(contact.phoneNumber.replace(/ /g, ""));
    closeContactPicker();
  }, []);

  const closeContactPicker = React.useCallback(() => {
    setContactPickerVisible(false);
  }, []);

  const openContactPicker = React.useCallback(
    () => setContactPickerVisible(true),
    []
  );

  const contactIcon = (
    <RippleButton rippleColor="#0009" onPress={openContactPicker}>
      <View style={tw`p-2.5 rounded-full mb-1 justify-center items-center`}>
        <Icon name="contacts" size={28} style={tw`text-primary rounded-full`} />
      </View>
    </RippleButton>
  );

  //show a loader as rendering is delayed
  if (!screenLoaded) return LoadingIndicator;
  return (
    <SafeArea>
      <View style={tw`flex-row items-start pl-3 mt-1 mb-8 bg-transparent`}>
        <View style={tw`border border-gray p-0.5 bg-surface`}>
          <Image source={providerLogoSrc} style={tw`h-12 w-12`} />
        </View>
        <View
          style={tw`flex-col justify-start items-start ml-2 bg-transparent`}
        >
          <Text type="subTitle">{networkName.toUpperCase()}</Text>
          <Text>{motto[networkName.toLowerCase() as keyof typeof motto]}</Text>
        </View>
      </View>

      {/* PANE TO SELECT RECIEPIENT TYPE */}
      {recipientType === "My Self" ? (
        <InputField
          fieldType="input"
          style={tw`mt-2`}
          fieldLabel="Topping Up For"
          fieldRequired={false}
          fieldLabelIcon="person"
          accessibilityLabel="network input"
          value={`${userPhoneFormatted}`}
          extraInputProps={{ editable: false, disabled: true }}
        />
      ) : null}

      {/* PANE TO ENTER RECIPIENT NUMBER */}
      <View
        style={tw.style(
          `mt-2 bg-transparent`,
          recipientType == "My Self" ? "hidden" : "flex"
        )}
      >
        <InputField
          fieldType="input"
          fieldLabel="Recipient Mobile Number:"
          fieldLabelIcon="phone-portrait"
          ref={recipientsInputRef}
          placeholder="Enter Mobile Number"
          // fieldLabelSubtitle={ recipientType == "Others" ? "(Enter one number per line)" : null}
          accessibilityLabel="recipient numbers input"
          value={recipientNumber}
          onChangeText={handleRecipientNumberChange}
          rightInputNode={contactIcon}
          extraInputProps={{
            keyboardType: "phone-pad",
            maxLength: 20,
            accessibilityLabel: "multi-number recipients input",
            accessibilityRole: "text",
          }}
        />
      </View>

      {/* PANE TO ENTER AMOUNT*/}
      <InputField
        fieldType="input"
        fieldLabel="Airtime Amount:"
        style={tw`my-4`}
        fieldLabelIcon="md-cash-outline"
        accessibilityLabel="airtime amount input"
        value={"" + airtimeAmount}
        extraInputProps={{
          keyboardType: "number-pad",
          maxLength: 6,
        }}
        onChangeText={handleSetAirtimeAmount}
      />
      <CurvedButton
        style={tw`my-2`}
        label="Buy Now"
        rightIconName="chevron-forward-circle-outline"
        onPress={gotoTransationReview}
        accessibilityRole="button"
        accessibilityLabel="cta buy airtime"
      />
      {contactPickerVisible ? (
        <ContactPicker
          onRequestClose={closeContactPicker}
          onBackgroundTouch={closeContactPicker}
          onContactSelect={handleContactSelect}
        />
      ) : null}
    </SafeArea>
  );
};

export default withTile(AirtimeScreen, 1);
