import React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { ScrollViewProps } from "react-native";

export type CustomSafeAreaProps = {
  /** When `true`, makes its children scrollable when they overflow the screen. */
  scrollable?: boolean;

  /** Props for inner `ScrollView` component. This only applies when `scrollable` is `true`.*/
  scrollViewProps?: ScrollViewProps;
  /** Style for `SafeAreaView` or `ScrollView` wrapper component depending on `scrollable` prop */
  style?: SafeAreaViewProps["style"] | ScrollViewProps["style"];
} & SafeAreaViewProps;

/**
 * renders its children in the safe area of the screen. It pads, adds gray background,
 * and optionally wraps children in `<Scrollview/>` too.
 */
const SafeArea = ({
  scrollable = true,
  children,
  scrollViewProps,
  style,
  ...otherProps
}: CustomSafeAreaProps) => (
  <SafeAreaView
    style={[
      {
        height: "100%",
        padding: scrollable
          ? 0
          : 10 /* dont pad here if scrollView will be rendered, i.e `scrollable = true` */,
      },
      // only apply passed style to safeArea if scrollView wont be rendered, i.e `scrollable = false`
      scrollable ? null : style,
    ]}
    mode="margin"
    {...otherProps}
  >
    {scrollable ? (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[{ padding: 10 }, style]}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    ) : (
      children
    )}
  </SafeAreaView>
);

export default React.memo(SafeArea);
