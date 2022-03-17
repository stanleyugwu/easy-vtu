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
  rippleColor = "#6200EE33",
  borderless = false,
  accessibilityLabel = "Ripple Button",
  onPress,
  style,
  children,
  ...otherProps
}: RippleButtonProps) => {
  // Below code, line `36-74` will seperate padding styles and other styles, then export the two as objects
  let stringifiedStyles = style && Object.entries(style).toString(); //stringify styles for easy comparison

  const seperatedStyles = React.useMemo(() => {
    if (style && style instanceof Object) {
      //list of padding style properties
      const spacingStyleNames = [
        "paddingRight",
        "paddingLeft",
        "paddingHorizontal",
        "paddingVertical",
        "paddingStart",
        "paddingEnd",
        "paddingTop",
        "paddingBottom",
      ];

      const spacingStyles = {} as Record<
        string,
        string | number | Record<string, string | number>
      >; //will hold padding and margin styles
      const otherStyles = {} as Record<
        string,
        string | number | Record<string, string | number>
      >; //will hold other styles

      // Main code to seperate the styles
      Object.entries(style || {}).forEach((entry) => {
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

  if (Platform.OS === "android") {
    return (
      <View {...otherProps} style={[{backgroundColor:'transparent'}, seperatedStyles.otherStyles]}>
        <TouchableNativeFeedback
          accessibilityLabel={accessibilityLabel}
          background={TouchableNativeFeedback.Ripple(rippleColor, borderless)}
          onPress={onPress}
          style={seperatedStyles.spacingStyles}
          useForeground
        >
          {children}
        </TouchableNativeFeedback>
      </View>
    );
  }

  return (
    <View {...otherProps} style={[{backgroundColor:'transparent'}, seperatedStyles.otherStyles]}>
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        activeOpacity={0.7}
        onPress={onPress}
        style={seperatedStyles.spacingStyles}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(RippleButton);
