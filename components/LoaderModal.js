import React from "react";
import { Modal, View, ViewStyle } from "react-native";
import Text from "./Type";
import LottieView from "lottie-react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LoaderModalProps
 * @property {string} [accessibilityLabel] Custom accessibilty label for `<Modal/>` wrapper
 * @property {string} loadingText Optional text to show below loading animation
 * @property {ViewStyle} [modalStyle] `View` Style for main (white colored) modal component
 * @property {ViewStyle} [modalWrapperStyle] Style for modal wrapper component. This is the transparent area
 */

/**
 * Renders a loading modal with animation and text
 */
const LoaderModal = (
  /** @type {LoaderModalProps} */ {
    loadingText,
    accessibilityLabel,
    modalWrapperStyle,
    modalStyle,
  }
) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true, disabled: true, expanded: true }}
    >
      <View
        style={[
          { width: "100%", height: "100%", backgroundColor: "#0009" },
          modalWrapperStyle,
        ]}
        accessibilityLabel="loader modal wrapper"
      >
        <View
          accessibilityLabel="loader modal main"
          style={tw.style(
            "rounded-lg mx-auto my-auto w-64 max-w-md bg-white p-2 items-center",
            modalStyle
          )}
        >
          <View style={tw`w-full flex-col items-center justify-center content-center`}>
            <LottieView
              source={require("../assets/json/loader.json")}
              style={{ width: '100%',height:50, alignSelf: "center",}}
              resizeMode="contain"
              autoPlay={true}
              speed={2.5}
            />
            {loadingText ? (
              <Text
                accessibilityLabel="loader modal text"
                style={tw`font-sans-semibold text-sm mt-1 content-center items-center`}
              >
                {loadingText}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

LoaderModal.propTypes = {
  accessibilityLabel: PropTypes.string,
  modalWrapperStyle: PropTypes.object,
  modalStyle: PropTypes.object,
  loadingText: PropTypes.string,
};

LoaderModal.defaultProps = {
  accessibilityLabel: "Loader Dialog",
  loadingText:"Processing"
};

export default React.memo(LoaderModal);
