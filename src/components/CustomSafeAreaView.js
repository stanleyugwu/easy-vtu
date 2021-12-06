import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";


/**
 * renders its children in the safe area of the screen. It pads, adds gray background,
 * and wraps children in `<Scrollview/>` too.
 */
const SafeArea = ({ children, scrollViewProps, containerStyle, ...rest }) => (
  <SafeAreaView
    style={[
      { backgroundColor: "#e3e3e3", height: "100%", zIndex: 99, padding: 10 },
      containerStyle,
    ]}
    mode="margin"
    {...rest}
  >
    <ScrollView keyboardShouldPersistTaps="handled" {...scrollViewProps} >
      {children}
    </ScrollView>
  </SafeAreaView>
);

SafeArea.propTypes = {
  /** style for `SafeAreaView` wrapper component */
  containerStyle: PropTypes.object,

  /** extra props object for <ScrollView/> wrapper component */
  scrollViewProps: PropTypes.object,
};

SafeArea.defaultProps = {
  containerStyle: null,
  scrollViewProps: null,
};

export default SafeArea;
