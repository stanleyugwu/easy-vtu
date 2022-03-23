import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import ModalWrapper, { ModalWrapperProps } from "./ModalWrapper";
import Text, { View } from "./Themed";
import tw from "../lib/tailwind";
import LottieView from "lottie-react-native";
import PressResizerView from "./PressResizerView";

// Loader Animation
import networkErrorLoader from "../assets/json/network_error_animation.json";
import RippleButton from "./RippleButton";

export type NetworkErrorProps = {
  /** Function to be called when the `'Try Again'` button is pressed */
  onRetry?: (event: GestureResponderEvent) => void;
  /** Text to use in place of default `connection-error` text */
  errorText?: string;
} & ModalWrapperProps;

const defaultErrorText =
  "Connection Error.\nPlease check your internet connection and try again";
/**
 * Renders a modal indicating internet connection error and a button to retry
 * @param {NetworkErrorProps} props
 */
const NetworkError = ({
  onRetry,
  errorText = defaultErrorText,
  onBackgroundTouch,
  onRequestClose,
  ...otherProps
}: NetworkErrorProps) => {
  return (
    <ModalWrapper
      visible={true}
      accessibilityLabel="network error modal container"
      onBackgroundTouch={onBackgroundTouch}
      onRequestClose={onRequestClose}
      {...otherProps}
    >
      <View
        style={tw`w-full bg-surface rounded-xl flex-col items-center p-3 justify-center content-center`}
        accessibilityLabel="network error modal"
      >
        <LottieView
          source={networkErrorLoader}
          style={{ width: "100%", height: 120 }}
          resizeMode="contain"
          loop={true}
          autoPlay={true}
        />
        <Text
          accessibilityLabel={"network error text"}
          style={tw`font-sans-semibold text-on-surface text-center mb-2 content-center items-center`}
        >
          {errorText}
        </Text>

        <RippleButton
          rippleColor={tw.color("secondary")}
          accessibilityLabel="try again button"
          onPress={onRetry}
          style={tw`mt-4 mb-2`}
        >
          <View style={tw`bg-primary py-3.5 px-7 rounded-md`}>
            <Text type="button" style={tw`text-secondary`}>
              Try Again
            </Text>
          </View>
        </RippleButton>
      </View>
    </ModalWrapper>
  );
};

export default React.memo(NetworkError);
