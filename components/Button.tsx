import React from "react";
import Text from "./Themed";
import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableHighlight,
  View,
  ColorValue,
  GestureResponderEvent,
  ViewProps,
} from "react-native";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import PressResizerView from "./PressResizerView";
import appStyles from "../lib/appStyles";
import RippleButton, { RippleButtonProps } from "./RippleButton";

export type ButtonProps = {
  /** Button text label */
  label?: string;
  /** Name of icon to show in the **left** side of the button.
   *  This prop will be invalid when `leftNode` prop is given
   */
  leftIconName?: keyof typeof Icon.glyphMap;
  /** Name of icon to show in the **right** side of the button.
   *  This prop will be invalid when `rightNode` prop is given.
   */
  rightIconName?: keyof typeof Icon.glyphMap;
  /**
   * React node to render at the **left** side of the button.
   * This will be rendered instead of `leftIconName`.
   */
  leftNode?: React.ReactNode;
  /** React node to render at the **right** side of the button.
   * This will be rendered instead of `rightIconName`.
   */
  rightNode?: React.ReactNode;
  /** An array of at-least two color strings to be used to apply gradient to button.
   * each color represents a stop in the gradient.
   * **Example:** `<Button gradient={['red','blue']} />`
   */
  gradient?: string[];
  /** Background color of button */
  bgColor?: string;
  /** Text color of label */
  labelColor?: ColorValue;
  /** If `true`, disables all interaction with button */
  disabled?: boolean;
  /** Callback to be called when button is pressed */
  onPress: (event: GestureResponderEvent) => void;
  /** Style for `<TouchableHighlight/>` */
  touchableStyle?: TouchableHighlight["props"]["style"];
  /** Whether button shadow is shown or not */
  dropShadow?: boolean;
} & RippleButtonProps;

/**
 * Renders a curved, pressable button
 * @example <Button label={"HELLO CURVY"} />
 * @param {ButtonProps} props
 */
const Button = ({
  leftIconName,
  leftNode,
  labelColor = tw.color("secondary") as string,
  rightIconName,
  rightNode,
  touchableStyle,
  label = "Click Me",
  onPress,
  bgColor = tw.color("primary") as string,
  style,
  disabled = false,
  dropShadow = true,
  gradient,
  ...otherProps
}: ButtonProps) => {
  // compute element that'll sit left and right to text label
  const left = React.useMemo(
    () =>
      leftIconName && !leftNode ? (
        <Icon
          name={leftIconName}
          size={25}
          color={labelColor}
          accessibilityRole="image"
          testID="left icon"
        />
      ) : (
        leftNode
      ),
    [leftIconName, leftNode]
  );
  const right = React.useMemo(
    () =>
      rightIconName && !rightNode ? (
        <Icon
          name={rightIconName}
          size={25}
          color={labelColor}
          accessibilityRole="image"
          testID="right icon"
        />
      ) : (
        rightNode
      ),
    [rightIconName, rightNode]
  );

  const InnerView = (
    <View
      style={tw`self-center flex-row justify-center items-center bg-transparent`}
      testID={"inner view"}
    >
      {left}
      <Text
        type="button"
        style={[tw`mx-6 font-sans-semibold`, { color: labelColor }]}
        accessibilityLabel={"button label"}
      >
        {label}
      </Text>
      {right}
    </View>
  );

  const Touchable = (
    <RippleButton
      onPress={!disabled && onPress}
      style={tw.style("rounded-lg")}
      accessibilityRole="button"
      accessibilityLabel="curved button"

      {...otherProps}
    >
        <LinearGradient
          colors={gradient ? gradient : [bgColor, bgColor]}
          start={{ x: 0.4, y: 0.2 }}
          end={{ x: 1, y: 0.2 }}
          testID={"gradient wrapper"}
          style={tw.style(
            "rounded-lg justify-center w-full",
            { maxHeight: 60, minHeight: 46, height: 55 }
          )}
        >
          {InnerView}
        </LinearGradient>
    </RippleButton>
  );

  //conditionally apply drop shadow
  return (
    <PressResizerView
      style={[dropShadow && appStyles.boxShadow, tw`rounded-lg bg-transparent`, style]}
    >
      {Touchable}
    </PressResizerView>
  );
};

export default React.memo(Button);
