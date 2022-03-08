import React from "react";
import { View, GestureResponderEvent, ViewStyle } from "react-native";
import Text from "./Type";
import ModalWrapper from "./ModalWrapper";
import PropTypes from "prop-types";
import tw from "../lib/tailwind";
import LottieView from "lottie-react-native";

/**
 * @typedef {Object} StatusModalProps
 * @property {"success" | "failure"} status Determines whether modal should indicate failure or success
 * @property {(event:GestureResponderEvent) => void} onClose Function to be invoked when the `'OKAY'`
 * text in the modal is pressed
 * @property {string} statusText Text to further describe the status
 * @property {ViewStyle} modalStyle Style for the modal
 */

/**
 * Render a modal to indicate the status of a process, whether it failed or succeded.\
 * Such as whether a transaction was successful or not.
 * @param {StatusModalProps} props
 */
const StatusModal = (props) => {
  return (
    <ModalWrapper accessibilityLabel={props.status + " modal"} visible={true}>
      <View
        accessibilityLabel={props.status + " modal main"}
        style={tw.style(
          "mx-auto my-auto w-11/12 max-w-md bg-white items-center",
          props.modalStyle
        )}
      >
        <View
          style={tw`w-full flex-col items-center p-3 justify-center content-center`}
          accessibilityLabel="animation wrapper"
        >
          {props.status == "success" ? (
            <LottieView
              source={require("../assets/json/success_animation.json")}
              style={{ width: "100%", height: 120, alignSelf: "center" }}
              resizeMode="contain"
              autoPlay={true}
              loop={false}
              speed={2.2}
            />
          ) : (
            <LottieView
              source={require("../assets/json/error_animation.json")}
              style={{ width: "100%", height: 60, alignSelf: "center" }}
              resizeMode="contain"
              loop={true}
              autoPlay={true}
            />
          )}
          {props.statusText ? (
            <Text
              accessibilityLabel={props.status + " modal text"}
              style={tw`font-sans-semibold text-sm mt-1 content-center items-center`}
            >
              {props.statusText}
            </Text>
          ) : null}
        </View>
        <View
          style={tw`mt-3 justify-end w-full py-2 px-6 border-t border-gray-light`}
        >
          <Text
            style={tw.style(`text-right font-sans-semibold text-primary`, {
              fontSize: 17,
            })}
            onPress={props.onClose}
          >
            OKAY
          </Text>
        </View>
      </View>
    </ModalWrapper>
  );
};

StatusModal.propTypes = {
  status: PropTypes.oneOf(["success", "failure"]).isRequired,
  statusText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  modalStyle: PropTypes.object,
};

StatusModal.defaultProps = {
  status: "failure",
};

export default React.memo(StatusModal);
