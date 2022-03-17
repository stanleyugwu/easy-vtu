import React from "react";
import { GestureResponderEvent, Image } from "react-native";
import Text, { View } from "./Themed";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import BoxShadowView from "./BoxShadowView";
import appStyles from "../lib/appStyles";

import type { ViewProps } from "./Themed";
// @ts-ignore
import walletImage from "../assets/images/wallet_img.png";
// @ts-ignore
import creditCardImage from "../assets/images/card_img.png";

export type WalletCardProps = {
  /** Amount to display as balance */
  balance: number;
  /** Number to display as number of saved debit card */
  totalCards: number;
  /** Function to invoke when "big plus" button is pressed */
  onAddCallback: (event: GestureResponderEvent) => void;
} & ViewProps;

/**
 * Renders a ui card having user's wallet information
 * @param {WalletCardProps} props
 */
const WalletCard = ({
  balance = 0,
  totalCards = 0,
  onAddCallback,
  style,
  accessibilityLabel = "wallet card",
}: WalletCardProps) => {
  return (
    <View
      style={[
        tw`flex-row justify-between w-80 max-w-md mx-auto rounded-3xl bg-surface p-3`,
        appStyles.boxShadow,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={tw`flex-col justify-between pl-2 bg-transparent`}>
        <View style={tw`flex-row bg-transparent`} accessibilityRole="tab">
          <Image source={walletImage} style={tw`w-5 h-5`} />
          <Text
            accessibilityLabel="wallet-label"
            style={tw`ml-1 text-gray text-sm`}
          >
            Wallet
          </Text>
        </View>

        <Text
          accessibilityLabel="wallet-balance"
          style={tw`text-3xl ml-4 my-2`}
        >
          {"\u20A6"}
          {balance}
        </Text>

        <View style={tw`flex-row bg-transparent`}>
          <Image source={creditCardImage} style={tw`w-5 h-5`} />
          <Text
            accessibilityLabel="cards-added"
            style={tw`ml-1 items-center text-sm font-sans-semibold`}
          >
            {totalCards + " Card(s)"}
          </Text>
        </View>
      </View>
      <Icon
        name="add-circle"
        style={tw`p-0 m-0 self-center`}
        accessibilityRole="button"
        ellipsizeMode="middle"
        size={75}
        color={tw.color("primary")}
        onPress={onAddCallback}
      />
    </View>
  );
};

export default React.memo(WalletCard);
