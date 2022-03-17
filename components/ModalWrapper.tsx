import React, { ForwardedRef } from "react";
import {
  Modal,
  ModalProps,
  ColorValue,
  GestureResponderEvent,
} from "react-native";
import tw from "../lib/tailwind";
import { View, ViewProps } from "./Themed";

export type ModalWrapperProps = {
  /** Background color of the modal overlay.\
   * The overlay is the transparent and dark area around the actual modal.
   */
  overlayColor?: ColorValue;
  /** Function to call when the area around the modal is touched */
  onBackgroundTouch?: (event: GestureResponderEvent) => void;
  /** Styles for the modal overlay `View` */
  style?: ViewProps["style"];
  /** Where to position the modal dialog */
  modalPosition?: "top" | "center" | "bottom";
} & ModalProps;

/**
 * A HOC that wraps passed component in a modal dialog
 */
const ModalWrapper = React.forwardRef(
  (
    {
      modalPosition = "center",
      onBackgroundTouch,
      onRequestClose,
      animationType = "fade",
      overlayColor = "#0009",
      accessibilityLabel = "recipient type modal wrapper",
      visible = true,
      style,
      children,
      ...otherProps
    }: ModalWrapperProps,
    ref: ForwardedRef<Modal>
  ) => {
    // calculate where to place modal based on supplied position
    // result will be used by both overlaying `View`, and the `View` directly housing `props.children`
    const finalModalPosition =
      modalPosition === "top"
        ? "flex-start"
        : modalPosition === "bottom"
        ? "flex-end"
        : "center";
    return (
      <Modal
        visible={visible}
        ref={ref}
        transparent={true}
        animationType={animationType}
        style={tw`h-full w-full`}
        accessibilityViewIsModal={true}
        accessibilityLabel={accessibilityLabel}
        onRequestClose={onRequestClose}
        {...otherProps}
      >
        <View
          style={[
            {
              height: "100%",
              width: "100%",
              backgroundColor: overlayColor,
              justifyContent: finalModalPosition,
              padding: 20,
            },
            style,
          ]}
          onTouchStart={onBackgroundTouch}
          accessibilityLabel="dark modal overlay"
        >
          {/* We wrap children in another View to setup onTouchStart handler that will prevent touches
            generated within children from propagating to parent View which has a touch event setup also
        */}
          <View
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              justifyContent: finalModalPosition,
              backgroundColor:"transparent"
            }}
          >
            {children}
          </View>
        </View>
      </Modal>
    );
  }
);

export default React.memo(ModalWrapper);
