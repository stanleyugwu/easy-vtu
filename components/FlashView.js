import React, { useRef, useEffect } from "react";
import { Animated, ViewStyle } from "react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";

/**
 * adds flash animation effect to its children
 * @typedef {Object} FlasViewProp
 * @property {Boolean} animate - prop to enable or disable animation
 * @property {Number} delay - number of milliseconds to delay animation
 * @property {Number} bounciness - bounciness of element when animating
 * @property {ViewStyle} containerStyle - style object for Animated.View component
 */

/**
 * Adds flash animation to children on display
 */
const FlashView = React.forwardRef((/** @type {FlasViewProp} */props, ref) => {
  //store animated value
  const flasAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return (
      props.animate &&
      Animated.spring(flasAnim, {
        toValue: 1,
        useNativeDriver: true,
        delay: props.delay,
        bounciness: props.bounciness,
        speed: 20,
      }).start()
    );
  }, [flasAnim]);

  return (
    <Animated.View
      style={tw.style(
        { transform: [{ scale: flasAnim }] },
        props.containerStyle
      )}
      ref={ref}
    >
      {props.children}
    </Animated.View>
  );
});

FlashView.defaultProps = {
  animate: true,
  delay: 20,
  bounciness: 15,
  containerStyle: null,
};

FlashView.propTypes = {
  /** determines whether animation is enabled or not */
  animate: PropTypes.bool,

  /** delay for animation */
  delay: PropTypes.number,

  /** bounciness of animation */
  bounciness: PropTypes.number,

  /** styles for `Animated.View` wrapper component */
  containerStyle: PropTypes.object,
};

export default React.memo(FlashView);
