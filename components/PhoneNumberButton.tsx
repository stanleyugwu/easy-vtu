import React from "react";
import { GestureResponderEvent } from "react-native";
import appStyles from "../lib/appStyles";
import tw from "../lib/tailwind";
import { NetworkCarriers } from "../types";
import RippleButton from "./RippleButton";
import Text, { View } from "./Themed";

export type PhoneNumberButtonType = {
  carrier?: NetworkCarriers;
  phoneNumber: string;
  onPress: (evt: GestureResponderEvent) => void;
};

const PhoneNumberButton = ({
  carrier = NetworkCarriers.Unknown,
  phoneNumber,
  onPress,
}: PhoneNumberButtonType) => {
  return (
    <RippleButton
      style={[tw`bg-primary rounded-lg`, appStyles.boxShadow]}
      onPress={onPress}
    >
      <View
        style={tw`bg-transparent px-2.5 py-1.5 flex-row items-center justify-center`}
      >
        <Text style={[tw`font-sans-semibold text-secondary`, { fontSize: 13 }]}>
          {phoneNumber}
        </Text>
        <Text
          style={[
            tw`font-sans-semibold text-on-dark items-center`,
            { fontSize: 11, lineHeight: 16, fontWeight: "700" },
          ]}
        >
          {" - "}
          {NetworkCarriers[carrier].toUpperCase()}
        </Text>
      </View>
    </RippleButton>
  );
};

export default PhoneNumberButton;
