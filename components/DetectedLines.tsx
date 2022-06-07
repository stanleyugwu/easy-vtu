import { ActivityIndicator } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { getCarrierSync, getPhoneNumberSync } from "react-native-device-info";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import { NetworkCarriers } from "../types";
import detectCarrierFromNumber from "../utils/detectCarrierFromNumber";
import store from "../store";
import Text, { View, ViewProps } from "./Themed";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import PhoneNumberButton from "./PhoneNumberButton";

export type DetectedLinesProps = {
  /**
   * Funcion to be called when the detected sim card phone number is pressed
   */
  onSimLinePress?: (
    detectedNumber: string,
    detectedCarrier: NetworkCarriers
  ) => void;
  /**
   * Function to be called when the user profile phone number is detected
   */
  onProfileNumberPress?: (
    profileNumber: string,
    profileCarrier: NetworkCarriers
  ) => void;
} & ViewProps;

/**
 * This component takes care of detecting and displaying user phone numbers for easier top up
 */
const DetectedLines = ({
  onSimLinePress,
  onProfileNumberPress,
  ...otherProps
}: DetectedLinesProps) => {
  // detected sim info
  const detectedNumber = React.useRef("");
  const detectedCarrier = React.useRef<NetworkCarriers>(0);

  // profile phone number and carrier
  const profileNumber = React.useRef("");
  const profileNumberCarrier = React.useRef<NetworkCarriers>(0);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      // detect and set phone number and carrier
      let carrier = getCarrierSync()?.toLowerCase(),
        phone = getPhoneNumberSync();
      if (phone && phone.toLowerCase() != "unknown") {
        phone = formatPhoneNumber(phone); // format phone
        // phone number was detected
        detectedNumber.current = phone;
        if (carrier && carrier != "unknown") {
          // carrier was detected, lets check if it matches any of supported carriers
          if (carrier.includes("mtn"))
            detectedCarrier.current = NetworkCarriers.Mtn;
          else if (carrier.includes("airtel"))
            detectedCarrier.current = NetworkCarriers.Airtel;
          else if (carrier.includes("glo"))
            detectedCarrier.current = NetworkCarriers.Glo;
          else if (carrier.includes("etisalat"))
            detectedCarrier.current = NetworkCarriers.Etisalat;
          else detectedCarrier.current = NetworkCarriers.Unknown;
        } else {
          // carrier not detected, lets get carrier from phone
          detectedCarrier.current = detectCarrierFromNumber(phone);
        }
      }

      // set user profile phone number and detect carrier
      let profilePhone = store.getState().user.profile?.phone;
      if (profilePhone) {
        profilePhone = profilePhone;
        profileNumber.current = profilePhone;
        profileNumberCarrier.current = detectCarrierFromNumber(profilePhone);
      }

      setLoading(false);
    })();
  }, []);

  if (loading)
    return <ActivityIndicator size={20} color={tw.color("primary")} />;

  // return null if nothing was detected
  if (!profileNumber.current && !detectedNumber.current) return null;

  return (
    <View style={{ backgroundColor: "transparent" }} {...otherProps}>
      <Text type="body2" style={tw`font-sans-bold pb-1 mt-5`}>
        <Icon name="sim-card" size={14} /> Your Phone Number
        {profileNumber.current && detectedNumber.current ? "s" : ""}
      </Text>
      <View style={tw`flex-row justify-start bg-transparent max-w-md w-full`}>
        {detectedNumber.current ? (
          <PhoneNumberButton
            phoneNumber={detectedNumber.current}
            carrier={detectedCarrier.current}
            onPress={() =>
              onSimLinePress?.(detectedNumber.current, detectedCarrier.current)
            }
          />
        ) : null}
        {profileNumber.current ? (
          <PhoneNumberButton
            phoneNumber={profileNumber.current}
            carrier={profileNumberCarrier.current}
            onPress={() =>
              onProfileNumberPress?.(
                profileNumber.current,
                profileNumberCarrier.current
              )
            }
          />
        ) : null}
      </View>
    </View>
  );
};

export default DetectedLines;
