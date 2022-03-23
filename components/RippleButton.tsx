import {
  ColorValue,
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { View, ViewProps } from "./Themed";

export type RippleButtonProps = ViewProps & {
  /** The color of the ripple effect */
  rippleColor?: ColorValue;
  /** Whether the effect will spread outside the container */
  borderless?: boolean;
  /** Callback to be called when card is pressed */
  onPress?: (event: GestureResponderEvent) => void;
};

/** Polymorphic button component that will render a
 * button with ripple effect for android, and TouchableOpacity for iOS
 */
const RippleButton = ({
  rippleColor = "#FEF7E0",
  borderless = false,
  accessibilityLabel = "Ripple Button",
  onPress,
  style,
  children,
  ...otherProps
}: RippleButtonProps) => {
  if (Platform.OS === "android") {
    return (
      <View {...otherProps} style={[{ backgroundColor: "transparent" }, style]}>
        <TouchableNativeFeedback
          accessibilityLabel={accessibilityLabel}
          background={TouchableNativeFeedback.Ripple(rippleColor, borderless)}
          onPress={onPress}
          useForeground
        >
          {children}
        </TouchableNativeFeedback>
      </View>
    );
  }

  return (
    <View {...otherProps} style={[{ backgroundColor: "transparent" }, style]}>
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(RippleButton);
