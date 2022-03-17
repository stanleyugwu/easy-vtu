import React from "react";
import { Modal } from "react-native";
import LottieView from "lottie-react-native";
import tw from "../lib/tailwind";
import Text, { View, ViewProps } from "./Themed";

// Loader animation
import loader from "../assets/json/loader.json";

export type LoaderModalProps = {
  /** Optional text to show below loading animation */
  loadingText?: string;
  /** `View` Style for main (white colored) modal component */
  modalStyle?: ViewProps["style"];
} & ViewProps;

/**
 * Renders a loading modal with animation and text
 */
const LoaderModal = ({
  loadingText,
  accessibilityLabel = "Loader Dialog",
  modalStyle,
  style,
}: LoaderModalProps) => {
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
          style,
        ]}
        accessibilityLabel="loader modal wrapper"
      >
        <View
          accessibilityLabel="loader modal main"
          style={tw.style(
            "rounded-lg mx-auto my-auto w-64 max-w-md bg-surface p-2 items-center",
            modalStyle
          )}
        >
          <View
            style={tw`w-full flex-col items-center bg-transparent justify-center content-center`}
          >
            <LottieView
              source={loader}
              style={{ width: "100%", height: 50, alignSelf: "center" }}
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

export default React.memo(LoaderModal);
