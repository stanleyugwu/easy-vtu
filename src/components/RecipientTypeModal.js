import React from "react";
import { View, Image, TouchableOpacity, ColorValue } from "react-native";
import tw from "../lib/tailwind";
import PressResizerView from "./PressResizerView";
import BoxShadowView from "./BoxShadowView";
import Text, { Title } from "./Type";
import ModalWrapper from "./ModalWrapper";
import PropTypes from "prop-types";
import selfImg from "../../assets/self_img.png";
import othersImg from "../../assets/others_img.png";

/**
 * Renders a modal dialog for selecting the type of recipient a top-up is for
 *
 * @typedef {Object} RecipientTypeModalProps
 * @property {(string: "Others" | "My Self") => void} onSelect Function to be called when either of the
 * recipient type button is pressed.\
 * This function will be passed on of below strings to denote the `type` selected or button pressed
 * - **My Self**
 * - **Others**
 * @property {() => void} [onRequestClose] The onRequestClose prop allows passing a function that will be called
 *  once the modal has been dismissed. On the Android platform, this is a required function.
 * @property {() => void} [onBackgroundTouch] Function to call when the area around the modal is touched
 * @property {0 | 1 | 2} [activeIndex] The index of the currently selected/active button
 * - `0` none
 * - `1` for **my self** button
 * - `2` for **others** button
 * @property {ColorValue} overlayColor Color for the background of modal overlay
 * @property {string} [customTitle] Custom title to show in modal
 */

/** @param {RecipientTypeModalProps} props */
const RecipientTypeModal = (props) => {
  const onSelfSelect = React.useCallback(() => {
    props.onSelect("My Self");
  });

  const onOthersSelect = React.useCallback(() => {
    props.onSelect("Others");
  });

  return (
    <ModalWrapper
      visible={true}
      accessibilityLabel="recipient type modal"
      overlayColor={props.overlayColor}
      onBackgroundTouch={props.onBackgroundTouch}
      onRequestClose={props.onRequestClose}
    >
      <View
        accessibilityLabel="recipient type modal"
        style={tw.style(`p-6 bg-gray-light max-w-md rounded-lg`,{zIndex:99999})}
      >
        <Title
          style={tw`text-lg`}
          accessibilityLabel="recipient type modal title"
        >
          {props.customTitle}
        </Title>
        <View style={tw`flex-row justify-between my-7`} onStartShouldSetResponder={() => true}>
          <TouchableOpacity
            style={tw.style(
              `rounded-md`,
              props.activeIndex == 1 && "border border-primary"
            )}
            activeOpacity={0.9}
            onPress={onSelfSelect}
          >
            <PressResizerView
              accessibilityLabel="self recipient type button"
              accessibilityRole="button"
            >
              <BoxShadowView containerStyle={tw`py-3 rounded-md px-6`}>
                <Image
                  source={selfImg}
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                  accessibilityLabel="myself image illustration"
                />
                <Text
                  style={{ paddingTop: 10 }}
                  accessibilityLabel="my self text"
                >
                  My Self
                </Text>
              </BoxShadowView>
            </PressResizerView>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw.style(
              `rounded-md`,
              props.activeIndex == 2 && "border border-primary"
            )}
            activeOpacity={0.9}
            onPress={onOthersSelect}
          >
            <PressResizerView
              accessibilityLabel="others recipient type button"
              accessibilityRole="button"
            >
              <BoxShadowView containerStyle={tw`py-3 rounded-md px-6`}>
                <Image
                  source={othersImg}
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                  accessibilityLabel="others image illustration"
                />
                <Text
                  style={{ paddingTop: 10 }}
                  accessibilityLabel="others text"
                >
                  Others
                </Text>
              </BoxShadowView>
            </PressResizerView>
          </TouchableOpacity>
        </View>
      </View>
    </ModalWrapper>
  );
};

RecipientTypeModal.propTypes = {
  customTitle: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  activeIndex: PropTypes.oneOf([1, 2]),
};

RecipientTypeModal.defaultProps = {
  customTitle: "Who Are You Topping Up For?",
  activeIndex: 0,
};

export default React.memo(RecipientTypeModal);
