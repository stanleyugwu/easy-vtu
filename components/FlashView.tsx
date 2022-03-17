import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";

export type FlasViewProps = {
  /** Whether to enable or disable animation */
  animate?: boolean;
  /** Number of milliseconds to delay animation */
  delay?: number;
  /** Bounciness of element when animating */
  bounciness: number;
} & typeof Animated.View["defaultProps"];

/**
 * Adds flash animation to children on display
 */
const FlashView = React.forwardRef(
  (
    {
      animate = true,
      delay = 20,
      bounciness = 15,
      style,
      children,
    }: FlasViewProps,
    ref: React.ForwardedRef<View>
  ) => {
    //store animated value
    const flasAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (animate)
        Animated.spring(flasAnim, {
          toValue: 1,
          useNativeDriver: true,
          delay: delay,
          bounciness: bounciness,
          speed: 20,
        }).start();
    }, [flasAnim]);

    return (
      <Animated.View
        style={[{ transform: [{ scale: flasAnim }] }, style]}
        ref={ref}
      >
        {children}
      </Animated.View>
    );
  }
);

export default React.memo(FlashView);
