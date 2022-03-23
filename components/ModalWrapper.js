import React, { ReactNode } from "react";
import { Modal, View, ModalProps, ColorValue, ViewStyle } from "react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";

/**
 * @typedef {Object} ModalWrapperProps
 * @property {boolean} visible Determines whether modal is visible or not.
 * @property {"none" | "slide" | "fade"} [modalAnimationType] The `animationType` prop controls how the modal animates.
 * - `slide` slides in from the bottom
 * - `fade` fades into view
 * - `none` appears without an animation
 * @property {string} [accessibilityLabel] Custom accessibility label for parent `Modal`
 * @property {ModalProps} [extraModalProps] Extra props for parent `Modal`
 * @property {ColorValue} [overlayColor] Background color of the modal overlay.\
 * The overlay is the transparent and dark area around the actual modal.
 * @property {() => void} [onRequestClose] The onRequestClose prop allows passing a function that will be called
 *  once the modal has been dismissed. On the Android platform, this is a required function.
 * @property {() => void} [onBackgroundTouch] Function to call when the area around the modal is touched
 * @property {ViewStyle} [overlayStyle] Styles for the modal `overlay`
 * @property {"top" | "center" | "bottom"} modalPosition Where to position the modal dialog
 * @property {ReactNode} children React children to wrap the modal around. This is **uncontrolled**
 */

/**
 * A HOC that wraps passed component in a modal dialog
 */
const ModalWrapper = React.forwardRef(
  (/** @type {ModalWrapperProps} */ props, ref) => {
    // calculate where to place modal based on supplied position
    // result will be used by both overlaying `View`, and the `View` directly housing `props.children`
    const modalPosition =
      props.modalPosition === "top"
        ? "flex-start"
        : props.modalPosition === "bottom"
        ? "flex-end"
        : "center";
    return (
      <Modal
        visible={props.visible}
        ref={ref}
        transparent={true}
        animationType={props.modalAnimationType}
        style={tw`h-full w-full`}
        accessibilityViewIsModal={true}
        accessibilityLabel={props.accessibilityLabel}
        onRequestClose={props.onRequestClose}
        {...props.extraModalProps}
      >
        <View
          style={[
            {
              height: "100%",
              width: "100%",
              backgroundColor: props.overlayColor,
              justifyContent: modalPosition,
              padding: 20,
            },
            props.overlayStyle,
          ]}
          onTouchStart={props.onBackgroundTouch}
          accessibilityLabel="dark modal overlay"
        >
          {/* We wrap children in another View to setup onTouchStart handler that will prevent touches
            generated within children from propagating to parent View which has a touch event setup also
        */}
          <View
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              justifyContent: modalPosition,
            }}
          >
            {props.children}
          </View>
        </View>
      </Modal>
    );
  }
);

ModalWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  modalAnimationType: PropTypes.oneOf(["none", "slide", "fade"]),
  accessibilityLabel: PropTypes.string,
  extraModalProps: PropTypes.object,
  overlayColor: PropTypes.string,
  overlayStyle: PropTypes.object,
  onRequestClose: PropTypes.func,
  onBackgroundTouch: PropTypes.func,
  modalPosition: PropTypes.oneOf(["top", "center", "bottom"]),
  children: PropTypes.node.isRequired,
};

ModalWrapper.defaultProps = {
  visible: false,
  modalAnimationType: "fade",
  accessibilityLabel: "recipient type modal wrapper",
  overlayColor: "#0009",
  modalPosition: "center",
};

export default React.memo(ModalWrapper);
