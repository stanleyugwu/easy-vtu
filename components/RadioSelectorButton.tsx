import React from "react";
import { RadioButton } from "react-native-paper";
import tw from "../lib/tailwind";
import Text, { View } from "./Themed";
import RippleButton, { RippleButtonProps } from "./RippleButton";

export type RadioSelectorButtonProps = {
  /** text to show in selector button */
  label: string;
  /** determine whether radio is checked or uncheckes */
  checked: boolean;
} & RippleButtonProps;

const RadioSelectorButton = ({
  style,
  onPress,
  label = "Select",
  checked = false,
  ...otherProps
}: RadioSelectorButtonProps) => {
  return (
    <RippleButton
      style={tw.style(
        "flex-row rounded-full items-center justify-between border border-gray-300 w-full my-2 bg-primary",
        style
      )}
      onPress={onPress}
      {...otherProps}
    >
      <View
        style={tw.style(
          "flex-row rounded-full items-center justify-between w-full p-2 bg-transparent"
        )}
      >
        <Text
          style={tw`font-sans-semibold pl-5 text-secondary`}
          accessibilityLabel="button text"
        >
          {label}
        </Text>
        <RadioButton
          value="SELF"
          color={tw.color("secondary")}
          uncheckedColor={tw.color("secondary")}
          status={checked ? "checked" : "unchecked"}
          onPress={onPress as () => void}
        />
      </View>
    </RippleButton>
  );
};

export default React.memo(RadioSelectorButton);
