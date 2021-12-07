import React, { ReactNode } from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { ScrollViewProperties, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

/**
 * @typedef {Object} CustomSafeAreaProps
 * @property {boolean} scrollable When `true`, makes its children scrollable when the overflow the screen.
 * @property {ScrollViewProperties} scrollViewProps Props for inner `ScrollView` component.
 * This only applies when `scrollable` is `true`.
 * @property {ViewStyle} containerStyle Style for `SafeAreaView` or `ScrollView` wrapper component depending on scrollable prop
 * @property {ReactNode} children Children to render
 * @property {SafeAreaViewProps} restOfProps Extra props for `SafeAreaView`
 */

/**
 * renders its children in the safe area of the screen. It pads, adds gray background,
 * and optionally wraps children in `<Scrollview/>` too.
 */
const SafeArea = (
  /** @type {CustomSafeAreaProps} */ {
    scrollable,
    children,
    scrollViewProps,
    containerStyle,
    ...restOfProps
  }
) => (
  <SafeAreaView
    style={[
      {
        height: "100%",
        padding: scrollable
          ? 0
          : 10 /* dont pad here if scrollView will be rendered */,
      },
      scrollable ? null : containerStyle, //only apply passed style to safeArea if scrollView wont be rendered
    ]}
    mode="margin"
    {...restOfProps}
  >
    {scrollable ? (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[{ padding: 10 }, containerStyle]}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    ) : (
      children
    )}
  </SafeAreaView>
);

SafeArea.propTypes = {
  scrollable: PropTypes.bool.isRequired,
  containerStyle: PropTypes.object,
  scrollViewProps: PropTypes.object,
};

SafeArea.defaultProps = {
  scrollable: true,
};

export default React.memo(SafeArea);
