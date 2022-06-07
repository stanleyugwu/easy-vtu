import React from "react";
import {
  View as _View,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";
import { useSelector } from "react-redux";
import Text, { View, ViewProps } from "./Themed";
import tw from "../lib/tailwind";
import PressResizerView from "./PressResizerView";
import RippleButton, { RippleButtonProps } from "./RippleButton";
import remoteConfig from "@react-native-firebase/remote-config";

import type { RemoteConfig, RootState } from "../types";

//Images
//@ts-ignore
import defaultPaymentMethodImage from "../assets/images/wallet_img.png";
//@ts-ignore
import cardImg from "../assets/images/card_img.png";
import appStyles from "../lib/appStyles";
import ReactNativeModal, { ModalProps } from "react-native-modal";
import Layout from "../constants/Layout";

export type PaymentMethods = "wallet" | "card" | "transfer" | "bitcoin";

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
      <RippleButton rippleColor={tw.color("secondary")} onPress={onPress}>
        <View
          style={tw`py-2 px-4 flex-row items-center rounded-md bg-transparent`}
        >
          <Image source={imageSource} style={tw`h-10 w-10`} />
          <Text
            type="button"
            style={[tw`pl-6 text-primary`]}
            textBreakStrategy="highQuality"
            lineBreakMode="middle"
          >
            {label}
          </Text>
        </View>
      </RippleButton>
    </PressResizerView>
  );
};

export type PaymentMethodPicker = {
  isVisible: boolean;
  /**
   * Function to be called when Android back button is pressed
   */
  onBackButtonPress?: () => void;
  /** Function to call when the area around the modal is touched */
  onBackdropPress?: () => void;
  /** Function to call when a method is selected.
   * This method will be called with `wallet` or `card` or `transfer`representing the method selected
   */
  onMethodSelect: (selectedMethod: PaymentMethods) => void;
} & ViewProps;

/**
 * Renders a modal for choosing the payment method for a service
 */
const PaymentMethodPicker = ({
  onMethodSelect,
  isVisible = false,
  onBackdropPress,
  onBackButtonPress,
  ...otherProps
}: PaymentMethodPicker) => {
  if (!isVisible) return null;
  const isSignedIn = useSelector((state: RootState) => state.user?.isSignedIn);

  // Remote config params
  const activePaymentMethods = JSON.parse(
    remoteConfig().getValue("activePaymentMethods").asString()
  ) as RemoteConfig.ActivePaymentMethods;

  const handleWalletSelect = React.useCallback(() => {
    onMethodSelect("wallet");
  }, [onMethodSelect]);
  const handleCardSelect = React.useCallback(() => {
    onMethodSelect("card");
  }, [onMethodSelect]);
  const handleBankSelect = React.useCallback(() => {
    onMethodSelect("transfer");
  }, [onMethodSelect]);
  const handleBtcSelect = React.useCallback(() => {
    onMethodSelect("bitcoin");
  }, [onMethodSelect]);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      animationInTiming={500}
      animationOutTiming={500}
      deviceHeight={Layout.screen.height}
      deviceWidth={Layout.screen.width}
      backdropTransitionInTiming={800}
      supportedOrientations={["portrait", "landscape"]}
      backdropTransitionOutTiming={500}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View style={tw`p-4 rounded-t-2xl bg-secondary`} {...otherProps}>
        <View
          style={{
            margin: "auto",
            alignSelf: "center",
            height: 4,
            width: 50,
            borderRadius: 9999,
            backgroundColor: tw.color("on-surface"),
          }}
        />
        <Text
          type="title"
          style={tw`self-center my-auto text-lg text-on-surface my-8`}
        >
          How Do You Want To Pay?
        </Text>
        {isSignedIn && activePaymentMethods.wallet ? (
          <PaymentMethodButton
            label="Pay From Wallet"
            imageSource={defaultPaymentMethodImage}
            onPress={handleWalletSelect}
          />
        ) : null}

        {activePaymentMethods.debitCard ? (
          <PaymentMethodButton
            label="Pay With Debit Card"
            imageSource={cardImg}
            onPress={handleCardSelect}
          />
        ) : null}
        {activePaymentMethods.bankTransfer ? (
          <PaymentMethodButton
            label="Pay Through Bank Transfer"
            imageSource={cardImg}
            onPress={handleBankSelect}
          />
        ) : null}

        {activePaymentMethods.BTCTransfer ? (
          <PaymentMethodButton
            label="Pay Through Bitcoin"
            imageSource={cardImg}
            onPress={handleBtcSelect}
          />
        ) : null}
      </View>
    </ReactNativeModal>
  );
};

export default React.memo(
  PaymentMethodPicker,
  (prev, next) => prev.isVisible === next.isVisible
);

export { PaymentMethodButton };
