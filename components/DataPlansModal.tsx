import Text, { View, ViewProps } from "./Themed";
import React from "react";
import { NetworkProvidersNames } from "../utils/detectCarrierFromNumber";
import { DataPlan, FormFieldsTypes, RootState, Server } from "../types";
import ReactNativeModal from "react-native-modal";
import Layout from "../constants/Layout";
import tw from "../lib/tailwind";
import { GestureResponderEvent, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons as Icon, MaterialIcons } from "@expo/vector-icons";
import myAxios from "../adapters/instance";
import { AxiosResponse } from "axios";
import { addDataPlans } from "../store/slices/dataPlansSlice";
import RippleButton from "./RippleButton";
import appStyles from "../lib/appStyles";

// Loader animations
import loader from "../assets/json/loader.json";
import errorAnimation from "../assets/json/network_error_animation.json";
import AnimatedLottieView from "lottie-react-native";

const fetchProviderDataPlans = (provider: NetworkProvidersNames = "Mtn") => {
  return myAxios.post<
    any,
    AxiosResponse<Server.DataPlans>,
    FormFieldsTypes.GetDataPlans
  >(
    "/api/variation_codes",
    {
      // @ts-ignore
      serviceID: `${provider.toLowerCase()}-data`,
    },
    {
      timeout: 12000,
      timeoutErrorMessage: "Request timed out",
    }
  );
};

export type DataPlansModalProps = {
  /**
   * Determines whether the modal is visible or not
   */
  isVisible: boolean;

  /**
   * The network provider to show its data plans
   */
  plansProvider: NetworkProvidersNames;

  /**
   * Called when a data plan is selected
   */
  onPlanSelect?: (selectedPlan: DataPlan) => void;

  /**
   * Called when modal is closed
   */
  onClose: (evt: GestureResponderEvent) => void;
} & ViewProps;

export type DataPlanProps = DataPlan & {
  onPress: (evt: GestureResponderEvent) => void;
};

const DataPlanButton = ({ onPress, name }: DataPlanProps) => (
  <RippleButton
    onPress={onPress}
    style={tw.style(`w-full`, appStyles.boxShadow)}
  >
    <View style={tw`bg-surface p-3`}>
      <Text type="body2" style={tw`text-center font-sans-semibold`}>
        {name?.toUpperCase()}
      </Text>
    </View>
  </RippleButton>
);

const DataPlansModal = ({
  isVisible = false,
  plansProvider = "Mtn",
  onPlanSelect,
  onClose,
  ...otherProps
}: DataPlansModalProps) => {
  // early bail out
  if (!isVisible) return null;

  const provider = plansProvider.toLowerCase();
  // @ts-ignore
  const plans = useSelector((state: RootState) => state.dataPlans[provider]) as
    | DataPlan[]
    | undefined;
  const [requestError, setRequestError] = React.useState("");

  const dispatch = useDispatch();

  const fetchPlansEffect = () => {
    setRequestError("");
    if (plans === undefined) {
      fetchProviderDataPlans(plansProvider)
        .then(
          ({
            data: {
              data: { variations },
            },
          }) => {
            dispatch(
              addDataPlans({
                provider: plansProvider,
                plans: variations,
              })
            );
          }
        )
        .catch((error: Server.RequestError) => {
          setRequestError(error.message);
        });
    }
  };

  // This effect will take care of fetching the passed provider's data plans
  // when the provider's plans is not already in state
  React.useEffect(fetchPlansEffect, [plans]);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationInTiming={500}
      // @ts-ignore
      onBackButtonPress={onClose}
      animationOutTiming={500}
      deviceHeight={Layout.screen.height}
      deviceWidth={Layout.screen.width}
      backdropTransitionInTiming={800}
      supportedOrientations={["portrait", "landscape"]}
      backdropTransitionOutTiming={400}
      animationIn={"zoomIn"}
      animationOut={"zoomOutUp"}
      style={{
        justifyContent: "center",
        margin: 0,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View
        style={tw.style("w-11/12 self-center rounded-md", {
          backgroundColor: tw.color("surface"),
          height: "90%",
        })}
        {...otherProps}
      >
        <Icon
          name="close"
          size={23}
          color={tw.color("secondary")}
          style={tw.style(`absolute top-3 right-4`, { zIndex: 999 })}
          onPress={onClose}
        />
        <Text
          type="overline"
          style={tw`text-center text-on-primary rounded-t-md p-4 bg-primary`}
        >
          {plansProvider} Data Plans
        </Text>

        <ScrollView
          contentContainerStyle={{
            backgroundColor: "transparent",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
          persistentScrollbar
          centerContent
        >
          {
            // Plans not fetched and there's not error
            plans === undefined && !requestError ? (
              <View style={tw`bg-transparent mt-5`}>
                <AnimatedLottieView
                  source={loader}
                  style={{ width: "100%", height: 60, alignSelf: "center" }}
                  resizeMode="contain"
                  autoPlay={true}
                  speed={2.5}
                />
                <Text type="body2">Loading Plans</Text>
              </View>
            ) : // Plans not fetched and there's error
            plans === undefined && requestError ? (
              <>
                <View style={tw`bg-transparent mt-5`}>
                  <AnimatedLottieView
                    source={errorAnimation}
                    style={{ width: "100%", height: 100, alignSelf: "center" }}
                    resizeMode="contain"
                    autoPlay={true}
                    speed={2.5}
                  />
                  <Text type="body2" style={tw`text-center`}>
                    {requestError}
                  </Text>
                  <Text
                    type="button"
                    style={tw`text-secondary mt-4 text-center`}
                    onPress={fetchPlansEffect}
                  >
                    Retry
                  </Text>
                </View>
              </>
            ) : // plans fetched but empty
            !plans?.length ? (
              <>
                <MaterialIcons
                  name="sms-failed"
                  size={60}
                  color={tw.color("gray")}
                />
                <Text style={tw`text-center text-gray`}>
                  {plansProvider} data plans are not currently available, please
                  check back later.
                </Text>
              </>
            ) : (
              // plans exists
              plans.map((plan, idx) => (
                <DataPlanButton
                  onPress={() => onPlanSelect?.(plan)}
                  fixedPrice={plan.fixedPrice}
                  variation_amount={plan.variation_amount}
                  variation_code={plan.variation_code}
                  name={plan.name}
                  key={idx.toString()}
                />
              ))
            )
          }
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default React.memo(DataPlansModal);
