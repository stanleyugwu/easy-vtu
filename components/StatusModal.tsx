import React from "react";
import { GestureResponderEvent } from "react-native";
import Text, { View } from "./Themed";
import ModalWrapper from "./ModalWrapper";
import PropTypes from "prop-types";
import tw from "../lib/tailwind";
import LottieView from "lottie-react-native";
import type { ViewProps } from "./Themed";

// Animations
import successAnimation from "../assets/json/success_animation.json";
import failureAnimation from "../assets/json/error_animation.json";

export type StatusModalProps = {
  /** Determines whether modal should indicate failure or success */
  status: "success" | "failure";
  /** Function to be invoked when the `'OKAY'`
   * text in the modal is pressed
   */
  onClose: (event: GestureResponderEvent) => void;
  /** Text to further describe the status */
  statusText: string;
  /** Optional Title for the text */
  statusTextTitle?: string;
} & ViewProps;

/**
 * Render a modal to indicate the status of a process, whether it failed or succeded.\
 * Such as whether a transaction was successful or not.
 * @param {StatusModalProps} props
 */
const StatusModal = ({
  style,
  onClose,
  status = "success",
  statusText,
  statusTextTitle,
  ...otherProps
}: StatusModalProps) => {
  return (
    <ModalWrapper accessibilityLabel={status + " modal"} visible={true}>
      <View
        accessibilityLabel={status + " modal main"}
        style={tw.style(
          "mx-auto my-auto w-11/12 max-w-md bg-surface items-center rounded-xl",
          style
        )}
        {...otherProps}
      >
        <View
          style={tw`w-full flex-col items-center p-3 justify-center bg-transparent content-center`}
          accessibilityLabel="animation wrapper"
        >
          {status == "success" ? (
            <LottieView
              source={successAnimation}
              style={{ width: "100%", height: 120, alignSelf: "center" }}
              resizeMode="contain"
              autoPlay={true}
              loop={true}
              duration={2000}
              speed={2}
            />
          ) : (
            <LottieView
              source={failureAnimation}
              style={{ width: "100%", height: 60, alignSelf: "center" }}
              resizeMode="contain"
              loop={true}
              autoPlay={true}
            />
          )}
          {statusTextTitle ? (
            <Text
              type="title"
              accessibilityLabel={status + " modal text"}
              style={tw`mt-1 mb-2 content-center items-center text-center`}
            >
              {statusTextTitle}
            </Text>
          ) : null}
          {statusText ? (
            <Text
              accessibilityLabel={status + " modal text"}
              style={tw`mt-1 content-center items-center text-center`}
            >
              {statusText}
            </Text>
          ) : null}
        </View>
        <View style={tw`mt-3 bg-transparent justify-end w-full px-6`}>
          <Text
            type="button"
            style={tw.style(`text-right p-2 text-primary`, {
              fontSize: 17,
              lineHeight: 32,
            })}
            onPress={onClose}
          >
            OKAY
          </Text>
        </View>
      </View>
    </ModalWrapper>
  );
};

export default StatusModal;
