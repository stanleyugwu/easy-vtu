import React from "react";
import {
  View as _View,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";
import { useSelector } from "react-redux";
import Text, { View } from "./Themed";
import tw from "../lib/tailwind";
import ModalWrapper, { ModalWrapperProps } from "./ModalWrapper";
import PressResizerView from "./PressResizerView";
import RippleButton, { RippleButtonProps } from "./RippleButton";

//Images
//@ts-ignore
import defaultPaymentMethodImage from "../assets/images/wallet_img.png";
//@ts-ignore
import cardImg from "../assets/images/card_img.png";
import appStyles from "../lib/appStyles";

export type PaymentMethodButtonProps = {
  /** Button text label */
  label: string;

  /** The image source (either a remote URL or a local file resource).
   * This prop can also contain several remote URLs, specified together with their width and height and potentially with
   * scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the
   * image container. A cache property can be added to control how networked request interacts with the local cache.
   * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
   */
  imageSource?: ImageSourcePropType;
  /** Function to call when button is pressed */
  onPress: (event: GestureResponderEvent) => void;
} & RippleButtonProps;

const PaymentMethodButton = ({
  imageSource = defaultPaymentMethodImage,
  onPress,
  label = "Pay Now",
}: PaymentMethodButtonProps) => {
  return (
    <PressResizerView
      style={[tw`my-2 rounded-md bg-surface`, appStyles.boxShadow]}
    >
      <RippleButton rippleColor="#fff9" onPress={onPress}>
        <View style={tw`py-2 px-9 flex-row items-center rounded-md bg-surface`}>
          <Image source={imageSource} style={tw`h-10 w-10`} />
          <Text style={tw`pl-6 font-sans-semibold text-primary`}>{label}</Text>
        </View>
      </RippleButton>
    </PressResizerView>
  );
};

export type PaymentMethodPicker = {
  /** Function to call when a method is selected.
   * This method will be called with `wallet` or `card` or `transfer`representing the method selected
   */
  onMethodSelect: (selectedMethod: "wallet" | "card" | "transfer") => void;
} & ModalWrapperProps;

/**
 * Renders a modal for choosing the payment method for a service
 */
const PaymentMethodPicker = ({
  onMethodSelect,
  onRequestClose,
  onBackgroundTouch,
}: PaymentMethodPicker) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const handleWalletSelect = React.useCallback(() => {
    onMethodSelect("wallet");
  }, []);
  const handleCardSelect = React.useCallback(() => {
    onMethodSelect("card");
  }, []);
  const handleBankSelect = React.useCallback(() => {
    onMethodSelect("transfer");
  }, []);

  return (
    <ModalWrapper
      visible={true}
      modalPosition="bottom"
      style={tw`p-0`}
      onRequestClose={onRequestClose}
      onBackgroundTouch={onBackgroundTouch}
    >
      <View style={tw`bg-gray-light p-4 rounded-t-2xl bg-accent`} ref={ref}>
        <Text
          type="title"
          style={tw`self-center my-auto text-lg my-8 text-black`}
        >
          How Do You Want To Pay?
        </Text>
        {isSignedIn ? (
          <PaymentMethodButton
            label="Pay From Wallet"
            imageSource={defaultPaymentMethodImage}
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
};

export { PaymentMethodPicker as default, PaymentMethodButton };
