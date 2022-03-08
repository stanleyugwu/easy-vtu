import React, { useRef, useEffect } from "react";
import { Animated, ViewStyle } from "react-native";
import PropTypes from "prop-types";

/**
 * @typedef {Object} FadeInViewProps
 * @property {number} [duration] Duration of the fade animation in milliseconds
 * @property {number} [delay] Number of milliseconds to delay animation for
 * @property {boolean} [slideUp] Whether to also add slide-up animation while fading in
 * @property {ViewStyle} [containerStyle] Style for `<Animated.View/>`
 */

/**
 * Adds fade in animation effect when rendering its children
 * @param {FadeInViewProps} props
 */
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; //fade animation value
  const translateAnim = useRef(new Animated.Value(20)).current; //slide animation value

  useEffect(() => {
    return Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: props.duration,
        delay: props.delay,
        useNativeDriver: true,
      }),

      props.slideUp &&
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: props.duration,
          delay: props.delay,
          useNativeDriver: true,
        }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: props.slideUp ? translateAnim : 0 }],
        ...props.containerStyle,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

FadeInView.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  slideUp: PropTypes.bool,
  containerStyle: PropTypes.object,
};

FadeInView.defaultProps = {
  duration: 700,
  delay: 0,
  slideUp: false,
};

export default React.memo(FadeInView);
