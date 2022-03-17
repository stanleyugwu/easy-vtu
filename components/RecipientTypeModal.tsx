import React from "react";
import { Image, ColorValue } from "react-native";
import tw from "../lib/tailwind";
import PressResizerView from "./PressResizerView";
import RippleButton from "./RippleButton";
import Text, { View } from "./Themed";
import ModalWrapper, { ModalWrapperProps } from "./ModalWrapper";
import appStyles from "../lib/appStyles";

// Images
// @ts-ignore
import selfImg from "../assets/images/self_img.png";
// @ts-ignore
import othersImg from "../assets/images/others_img.png";

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

export type RecipientTypeModalProps = {
  /** Function to be called when either of the
   * recipient type button is pressed.\
   * This function will be passed on of below strings to denote the `type` selected or button pressed
   * - **My Self**
   * - **Others**
   */
  onSelect: (selectedType: "Others" | "My Self") => void;

  /** The index of the currently selected/active button
   * - `0` none
   * - `1` for **my self** button
   * - `2` for **others** button
   */
  activeIndex?: 0 | 1 | 2;
  /** Color for the background of modal overlay */
  overlayColor?: ColorValue;
  /** Custom title to show in modal */
  customTitle?: string;
} & ModalWrapperProps;

const RecipientTypeModal = ({
  onSelect,
  activeIndex = 0,
  customTitle = "Who Are You Topping Up For?",
  overlayColor = "#0009",
  onBackgroundTouch,
  onRequestClose,
}: RecipientTypeModalProps) => {
  const onSelfSelect = React.useCallback(() => {
    onSelect("My Self");
  }, []);

  const onOthersSelect = React.useCallback(() => {
    onSelect("Others");
  }, []);

  return (
    <ModalWrapper
      visible={true}
      accessibilityLabel="recipient type modal"
      overlayColor={overlayColor}
      onBackgroundTouch={onBackgroundTouch}
      onRequestClose={onRequestClose}
    >
      <View
        accessibilityLabel="recipient type modal"
        style={tw.style(`p-6 bg-gray-light max-w-md rounded-lg`, {
          zIndex: 99999,
        })}
      >
        <Text
          type="title"
          style={tw`text-lg`}
          accessibilityLabel="recipient type modal title"
        >
          {customTitle}
        </Text>
        <View
          style={tw`flex-row justify-between my-7`}
          onStartShouldSetResponder={() => true}
        >
          <RippleButton
            style={tw.style(
              `rounded-md`,
              activeIndex == 1 && "border border-primary"
            )}
            onPress={onSelfSelect}
          >
            <PressResizerView
              accessibilityLabel="self recipient type button"
              accessibilityRole="button"
              style={[tw`py-3 rounded-md px-6`, appStyles.boxShadow]}
            >
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
            </PressResizerView>
          </RippleButton>

          <RippleButton
            style={tw.style(
              `rounded-md`,
              activeIndex == 2 && "border border-primary"
            )}
            onPress={onOthersSelect}
          >
            <PressResizerView
              accessibilityLabel="others recipient type button"
              accessibilityRole="button"
              style={tw`py-3 rounded-md px-6`}
            >
              <Image
                source={othersImg}
                style={{ width: 70, height: 70, resizeMode: "contain" }}
                accessibilityLabel="others image illustration"
              />
              <Text style={{ paddingTop: 10 }} accessibilityLabel="others text">
                Others
              </Text>
            </PressResizerView>
          </RippleButton>
        </View>
      </View>
    </ModalWrapper>
  );
};

export default React.memo(RecipientTypeModal);
