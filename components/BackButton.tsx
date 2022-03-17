import React from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./Themed";
import { Entypo as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";

export type BackButtonProps = {
  /** text label for button */
  buttonText?: string;
  /** Style for `Icon` component */
  iconStyle?: TextStyle;
  /** style for label wrapper `Text` component */
  textStyle?: TextStyle;
} & TouchableOpacityProps;

/**
 * Back button component
 */
const BackButton = ({
  style,
  textStyle,
  iconStyle,
  buttonText = "Back",
  onPress,
  ...otherProps
}: BackButtonProps) => (
  <TouchableOpacity
    style={[tw`p-2 flex-row`, style]}
    onPress={onPress}
    accessibilityLabel="back-button"
    {...otherProps}
  >
    <Icon
      accessibilityLabel="back-button icon"
      name="chevron-thin-left"
      size={25}
      style={[tw.style("text-on-background"), iconStyle]}
    />
    <Text
      style={textStyle}
      accessibilityRole="text"
      accessibilityLabel={"button label"}
    >
      {buttonText}
    </Text>
  </TouchableOpacity>
);

export default React.memo(BackButton);
