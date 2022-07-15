import { View } from "react-native";
import React from "react";
import Text, { TextProps, ViewProps } from "./Themed";
import AnimatedLottieView from "lottie-react-native";
import emptyData from "../assets/json/empty_animation.json";

export type EmptyDataTypes = {
  /**
   * Style for the main animation
   */
  animationStyle?: ViewProps["style"];

  /**
   * Style for the text below the animation
   */
  textStyle?: TextProps["style"];

  /**
   * Animation text
   */
  text?: string;
} & ViewProps;

/**
 * Shows animation denoting empty data
 */
const EmptyData = ({
  animationStyle,
  textStyle,
  text = "Nothing here!. Come back later",
  style,
  ...otherProps
}: EmptyDataTypes) => {
  return (
    <View
      style={[{ justifyContent: "center", alignItems: "center" }, style]}
      {...otherProps}
    >
      <AnimatedLottieView
        source={emptyData}
        autoPlay
        resizeMode="contain"
        style={[
          { width: 150, height: 150, alignSelf: "center" },
          animationStyle,
        ]}
      />
      <Text style={[{ textAlign: "center" }, textStyle]} type="body2">
        {text}
      </Text>
    </View>
  );
};

export default React.memo(EmptyData);
