import { Image } from "react-native";
import Text, { View } from "./Themed";
import React from "react";
import tw from "../lib/tailwind";
import ReactNativeModal from "react-native-modal";
import { GestureResponderEvent } from "react-native";

const emptyWallet = require("../assets/images/empty_wallet.png");

export type InsufficientFundProps = {
  isVisible: boolean;
  /**
   * Function to call when user presses the "Top up my wallet" button
   */
  onTopUp?: (evt: GestureResponderEvent) => void;
  /**
   * Function to be called when the user presses "OKAY" button to close the modal
   */
  onClose?: (evt: GestureResponderEvent) => void;
};

const InsufficientFund = ({
  isVisible = false,
  onTopUp,
  onClose,
}: InsufficientFundProps) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut={"zoomOut"}
    >
      <View style={tw`bg-surface p-1.5 justify-center items-center rounded-xl`}>
        <Image
          source={emptyWallet}
          width={120}
          height={120}
          style={{ width: 120, height: 120 }}
        />
        <Text type="title">Your balance is too low</Text>
        <Text style={tw`text-center`}>
          You don't have enough funds to complete this transaction
        </Text>
        <Text
          type="subTitle2"
          style={tw`text-primary mt-2.5 text-secondary uppercase`}
          onPress={onTopUp}
        >
          Add more funds
        </Text>
        <Text
          type="subTitle"
          style={tw`self-end m-4 text-primary`}
          onPress={onClose}
        >
          OKAY
        </Text>
      </View>
    </ReactNativeModal>
  );
};

export default InsufficientFund;
