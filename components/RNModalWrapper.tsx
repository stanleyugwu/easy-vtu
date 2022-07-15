import React from "react";
import ReactNativeModal from "react-native-modal";
import Layout from "../constants/Layout";
import tw from "../lib/tailwind";
import { View } from "./Themed";

export type RNModalWrapperProps = Partial<ReactNativeModal["props"]>;
const RNModalWrapper = ({
  isVisible = true,
  animationInTiming = 500,
  animationOutTiming = 1500,
  swipeDirection = "down",
  propagateSwipe = true,
  deviceHeight = Layout.screen.height,
  deviceWidth = Layout.screen.width,
  backdropTransitionInTiming = 800,
  supportedOrientations = ["portrait", "landscape"],
  backdropTransitionOutTiming = 500,
  animationIn = "slideInUp",
  animationOut = "slideOutDown",
  style,
  children,
  ...otherProps
}: RNModalWrapperProps) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      useNativeDriver
      useNativeDriverForBackdrop
      swipeDirection={swipeDirection}
      propagateSwipe={propagateSwipe}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      backdropTransitionInTiming={backdropTransitionInTiming}
      supportedOrientations={supportedOrientations}
      backdropTransitionOutTiming={backdropTransitionInTiming}
      animationIn={animationIn}
      animationOut={animationOut}
      style={[
        {
          justifyContent: "flex-end",
          margin: 0,
          alignSelf: "center",
          width: "100%",
        },
        style,
      ]}
      {...otherProps}
    >
      <View style={tw`h-1/2 rounded-t-xl p-4 bg-surface`}>{children}</View>
    </ReactNativeModal>
  );
};

export default RNModalWrapper;
