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

export type ButtonProps = {
  /** Button text label */
  label: string;
  /** Name of icon to show in the **left** side of the button.
   *  This prop will be invalid when `leftNode` prop is given
   */
  leftIconName: keyof typeof Icon.glyphMap;
  /** Name of icon to show in the **right** side of the button.
   *  This prop will be invalid when `rightNode` prop is given.
   */
  rightIconName: keyof typeof Icon.glyphMap;
  /**
   * React node to render at the **left** side of the button.
   * This will be rendered instead of `leftIconName`.
   */
  leftNode: React.ReactNode;
  /** React node to render at the **right** side of the button.
   * This will be rendered instead of `rightIconName`.
   */
  rightNode: React.ReactNode;
  /** An array of at-least two color strings to be used to apply gradient to button.
   * each color represents a stop in the gradient.
   * **Example:** `<Button gradient={['red','blue']} />`
   */
  gradient: string[];
  /** Background color of button */
  bgColor: string;
  /** Text color of label */
  labelColor: ColorValue;
  /** If `true`, disables all interaction with button */
  disabled: boolean;
  /** Callback to be called when button is pressed */
  onPress: (event: GestureResponderEvent) => void;
  /** Style for `<TouchableHighlight/>` */
  touchableStyle: TouchableHighlight["props"]["style"];
  /** Whether button shadow is shown or not */
  dropShadow: boolean;
} & ViewProps;

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

  /**
   *  Padding and margin applied from touchableStyle wont work as expected because they're added to
   * the wrapping `PressResizerView`.
   *
   * Below code will seperate padding and margin styles from other styles in touchableStyle.
   * the goal is to apply the margin and padding styles to `LinearGradient` component and others to
   * `TouchableHighlight` wrapper component
   */
  let stringifiedStyles =
    touchableStyle && Object.entries(touchableStyle).toString(); //stringify styles for easy comparison

  // This will finally seperate and export spacing styles and other styles
  const seperatedStyles = React.useMemo(() => {
    if (touchableStyle && touchableStyle instanceof Object) {
      //list of padding and margin style properties
      const spacingStyleNames = [
        "marginRight",
        "paddingRight",
        "marginLeft",
        "paddingLeft",
        "marginHorizontal",
        "paddingHorizontal",
        "marginVertical",
        "paddingVertical",
        "marginStart",
        "paddingStart",
        "marginEnd",
        "paddingEnd",
        "marginTop",
        "paddingTop",
        "marginBottom",
        "paddingBottom",
      ];

      const spacingStyles = {} as any; //will hold padding and margin styles
      const otherStyles = {} as any; //will hold other styles

      Object.entries(touchableStyle || {}).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];

        if (spacingStyleNames.includes(key)) {
          spacingStyles[key] = value;
        } else {
          otherStyles[key] = value;
        }
      });

      return {
        spacingStyles,
        otherStyles,
      };
    }
    return { spacingStyles: null, otherStyles: null };
  }, [stringifiedStyles]);

  const InnerView = (
    <View
      style={tw`self-center flex-row justify-center items-center`}
      testID={"inner view"}
    >
      {left}
      <Text
        style={[tw`mx-6 font-sans-semibold`, { color: labelColor }]}
        accessibilityLabel={"button label"}
      >
        {label}
      </Text>
      {right}
    </View>
  );

  const Touchable = (
    <TouchableHighlight
      onPress={onPress}
      style={tw.style(seperatedStyles.otherStyles, "rounded-lg")}
      accessibilityRole="button"
      accessibilityLabel="curved button"
      disabled={disabled}
    >
      <>
        <LinearGradient
          colors={gradient ? gradient : [bgColor, bgColor]}
          start={{ x: 0.4, y: 0.2 }}
          end={{ x: 1, y: 0.2 }}
          testID={"gradient wrapper"}
          style={tw.style(
            "rounded-lg justify-center w-full",
            { maxHeight: 60, minHeight: 46, height: 55 },
            seperatedStyles.spacingStyles
          )}
        >
          {InnerView}
        </LinearGradient>
      </>
    </TouchableHighlight>
  );

  //conditionally apply drop shadow
  return (
    <PressResizerView
      style={[style, dropShadow && appStyles.boxShadow, tw`rounded-lg`]}
      {...otherProps}
    >
      {Touchable}
    </PressResizerView>
  );
};

export default React.memo(Button);
