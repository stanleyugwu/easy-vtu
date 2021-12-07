import React from "react";
import { TouchableRipple } from "react-native-paper";
import {
  View,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Text, { Title } from "./Type";
import tw from "../lib/tailwind";
import ModalWrapper from "./ModalWrapper";
import walletImg from "../../assets/wallet_img.png";
import cardImg from "../../assets/card_img.png";
import BoxShadowView from "./BoxShadowView";
import PressResizerView from "./PressResizerView";

/**
 * Renders a button representing payment method
 * @typedef {Object} PaymentMethodButtonProp
 * @property {string} label Button text label
 * @property {ImageSourcePropType} imageSource The image source (either a remote URL or a local file resource).
 * This prop can also contain several remote URLs, specified together with their width and height and potentially with
 * scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the
 * image container. A cache property can be added to control how networked request interacts with the local cache.
 * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
 * @property {(event: GestureResponderEvent) => void} onPress Function to call when button is pressed
 */
const PaymentMethodButton = React.forwardRef(
  (/** @type {PaymentMethodButtonProp} */ props, ref) => {
    const resolvedSrc =
      typeof props.imageSource === "number"
        ? props.imageSource
        : { uri: props.imageSource };

    return (
      <PressResizerView containerStyle={tw`my-2 rounded-md`}>
        <TouchableRipple rippleColor="#fff9"onPress={props.onPress} ref={ref}>
          <BoxShadowView
            containerStyle={tw`py-2 px-9 flex-row items-center rounded-md bg-white`}
          >
            <Image source={resolvedSrc} style={tw`h-10 w-10`} />
            <Text style={tw`pl-6 font-sans-semibold text-primary`}>
              {props.label}
            </Text>
          </BoxShadowView>
        </TouchableRipple>
      </PressResizerView>
    );
  }
);

PaymentMethodButton.propTypes = {
  label: PropTypes.string.isRequired,
  imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPress: PropTypes.func,
};

PaymentMethodButton.defaultProps = {
  label: "Unknown Payment Method",
  imageSource: walletImg,
};

/**
 * @typedef {Object} PaymentMethodPickerProps
 * @property {(selectedMethod:"wallet" | "card" | "transfer") => void} onMethodSelect Function to call when a method is selected.
 * This method will be called with `wallet` or `card` or `transfer`representing the method selected
 * @property {() => void} [onRequestClose] The onRequestClose prop allows passing a function that will be called
 *  once the modal has been dismissed. On the Android platform, this is a required function.
 * @property {() => void} [onBackgroundTouch] Function to call when the area around the modal is touched
 */

/**
 * Renders a modal for choosing the payment method for a service
 */
const PaymentMethodPicker = React.forwardRef((/** @type {PaymentMethodPickerProps} */props, ref) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const handleWalletSelect = React.useCallback(() => {
    props.onMethodSelect("wallet");
  });
  const handleCardSelect = React.useCallback(() => {
    props.onMethodSelect("card");
  });
  const handleBankSelect = React.useCallback(() => {
    props.onMethodSelect("transfer");
  });

  return (
    <ModalWrapper
      visible={true}
      modalPosition="bottom"
      overlayStyle={tw`p-0`}
      onRequestClose={props.onRequestClose}
      onBackgroundTouch={props.onBackgroundTouch}
    >
      <View style={tw`bg-gray-light p-4 rounded-t-2xl bg-accent`} ref={ref}>
        <Title style={tw`self-center my-auto text-lg my-8 text-black`}>
          How Do You Want To Pay?
        </Title>
        {isSignedIn ? (
          <PaymentMethodButton
            label="Pay From Wallet"
            imageSource={walletImg}
            onPress={handleWalletSelect}
          />
        ) : null}
        <PaymentMethodButton
          label="Pay With Debit Card"
          imageSource={cardImg}
          onPress={handleCardSelect}
        />
        <PaymentMethodButton
          label="Pay Through Bank Transfer"
          imageSource={cardImg}
          onPress={handleBankSelect}
        />
      </View>
    </ModalWrapper>
  );
});

PaymentMethodPicker.propTypes = {
  onMethodSelect: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func,
  onBackgroundTouch: PropTypes.func,
};

export { PaymentMethodPicker as default, PaymentMethodButton };
