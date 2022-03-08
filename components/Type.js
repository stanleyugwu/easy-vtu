import React, { ReactText } from "react";
import { Text as NativeText, TextProps, TextStyle } from "react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";

/**
 * @typedef {Object} CustomTextProps
 * @property {TextStyle} style Text component style
 * @property {TextProps} restOfProps Other props passed `Text` props
 * @property {ReactText} children Component children
 */

/**
 * Renders text just like native `Text` component, but with pre-defined styles that match app theme
 * @param {CustomTextProps} props
 */
const Text = (props) => {
  const { children, style, ...restOfProps } = props;
  return (
    <NativeText
      style={tw.style("text-center text-base leading-6 text-black font-sans", style)}
      {...restOfProps}
    >
      {children}
    </NativeText>
  );
};

Text.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  restOfProps: PropTypes.object,
};

/**
 * Renders title text with pre-defined styles that match app theme
 * @param {CustomTextProps} props
 */
const Title = (props) => {
  const { children, style, ...restOfProps } = props;
  return (
    <NativeText
      style={[tw`text-center text-black font-sans-semibold text-xl`, style]}
      {...restOfProps}
    >
      {children}
    </NativeText>
  );
};

Text.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  restOfProps: PropTypes.object,
};

export { Text as default, Title };
