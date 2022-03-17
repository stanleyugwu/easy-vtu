import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { ViewProps } from "./Themed";

export type FadeInViewProps = {
  /** Duration of the fade animation in milliseconds */
  duration?: number;
  /** Number of milliseconds to delay animation */
  delay?: number;
  /** Whether to also add `slide-up` animation while fading in */
  slideUp?: boolean;
} & ViewProps;

/**
 * Adds fade in animation effect when rendering its children
 * @param {FadeInViewProps} props
 */
const FadeInView = ({
  duration = 700,
  delay = 0,
  slideUp = false,
  style,
  children,
}: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; //fade animation value
  const translateAnim = useRef(new Animated.Value(20)).current; //slide animation value

  useEffect(() => {
    return Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),

      (slideUp as any) &&
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideUp ? translateAnim : 0 }],
        ...(style as object),
      }}
    >
      {children}
    </Animated.View>
  );
};

export default React.memo(FadeInView);
