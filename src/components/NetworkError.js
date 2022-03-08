import React from "react";
import { View, GestureResponderEvent, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import ModalWrapper from "./ModalWrapper";
import Text from "./Type";
import tw from "../lib/tailwind";
import LottieView from "lottie-react-native";
import PressResizerView from "./PressResizerView";

/**
 * @typedef {Object} NetworkErrorProps
 * @property {() => void} [onRequestClose] The onRequestClose prop allows passing a function that will be called
 * once the modal has been dismissed. On the Android platform, this is a required function.
 * @property {() => void} [onBackgroundTouch] Function to call when the area around the modal is touched
 * @property {(event: GestureResponderEvent) => void} onRetry Function to be called when the `'Try Again'` button is pressed
 * @property {string} [errorText] Text to use in place of default connection-error text
 */

/**
 * Renders a modal indicating internet connection error and a button to retry
 * @param {NetworkErrorProps} props
 */
const NetworkError = (props) => {
  return (
    <ModalWrapper
      visible={true}
      accessibilityLabel="network error modal container"
      onBackgroundTouch={props.onBackgroundTouch}
      onRequestClose={props.onRequestClose}
    >
      <View
        style={tw`w-full bg-white rounded-lg flex-col items-center p-3 justify-center content-center`}
        accessibilityLabel="network error modal"
      >
        <LottieView
          source={require("../../assets/network_error_animation.json")}
          style={{ width: "100%", height: 120 }}
          resizeMode="contain"
          loop={true}
          autoPlay={true}
        />
        <Text
          accessibilityLabel={"network error text"}
          style={tw`font-sans-semibold mb-2 content-center items-center`}
        >
          {props.errorText}
        </Text>

        <TouchableOpacity
          style={tw`mt-4 mb-2`}
          onPress={props.onRetry}
          activeOpacity={0.95}
          accessibilityLabel="try again button"
        >
          <PressResizerView
            containerStyle={tw`rounded-md py-2 px-6 bg-primary rounded-md`}
          >
            <Text style={tw`text-accent`}>Try Again</Text>
          </PressResizerView>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

NetworkError.PropTypes = {
  onRequestClose: PropTypes.func,
  onBackgroundTouch: PropTypes.func,
  onRetry: PropTypes.func.isRequired,
  errorText: PropTypes.string,
};

NetworkError.defaultProps = {
  errorText:
    "Connection Error.\nPlease check your internet connection and try again",
};

export default React.memo(NetworkError);
