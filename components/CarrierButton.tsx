import {
  ImageSourcePropType,
  GestureResponderEvent,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import appStyles from "../lib/appStyles";
import Text, { View } from "./Themed";
import RippleButton, { RippleButtonProps } from "./RippleButton";

export type CarrierButtonType = {
  /**
   * Name of the network
   */
  providerName: string;
  /**
   * The logo of the network provider
   */
  logo: ImageSourcePropType;

  /**
   * Determines whether the button is active or not
   */
  selected: boolean;

  /**
   * Called when the button s pressed
   */
  onPress: (evt: GestureResponderEvent) => void;
} & RippleButtonProps;

/**
 * This component displays an individual network provider button.
 * It also supports active/inactive states in which case it will take a different style
 */
const CarrierButton = ({
  logo,
  onPress,
  selected = false,
  providerName = "Unknown",
  ...otherProps
}: CarrierButtonType) => (
  <RippleButton
    onPress={onPress}
    style={tw.style(
      "mr-2 rounded-xl justify-center items-center",
      selected ? "bg-primary" : "bg-surface",
      appStyles.boxShadowSmall,
      { flex: 1, maxWidth: 200 }
    )}
    {...otherProps}
  >
    <View
      style={tw`bg-transparent p-2.5 w-full rounded-xl justify-center items-center`}
    >
      <View
        style={[
          tw.style(
            `p-1.5 rounded-full`,
            { width: 50, height: 50 },
            selected ? "bg-surface" : { backgroundColor: "#eee" }
          ),
        ]}
      >
        <Image source={logo} style={tw.style(`w-full h-full rounded-full`)} />
      </View>
      <Text
        type="body2"
        style={tw.style(
          `text-center mt-1.5`,
          selected && "text-on-primary font-sans-semibold"
        )}
      >
        {providerName}
      </Text>
    </View>
  </RippleButton>
);

export default CarrierButton;
