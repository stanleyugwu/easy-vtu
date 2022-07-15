import React from "react";
import { GestureResponderEvent, Image, Platform } from "react-native";
import Text, { View } from "./Themed";
import tw from "../lib/tailwind";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import appStyles from "../lib/appStyles";

import type { ViewProps } from "./Themed";
// @ts-ignore
import walletImage from "../assets/images/wallet_img.png";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import formatAmt from "../utils/formatAmt";

export type WalletCardProps = {
  /** Amount to display as balance */
  balance: number;
  /** Function to invoke when "big plus" button is pressed */
  onAddCallback: (event: GestureResponderEvent) => void;
} & ViewProps;

/**
 * Renders a ui card having user's wallet information
 * @param {WalletCardProps} props
 */
const WalletCard = ({
  balance = 0,
  onAddCallback,
  style,
  accessibilityLabel = "wallet card",
}: WalletCardProps) => {
  return (
    <View
      style={[
        tw`flex-row justify-between border border-white items-center w-5/6 max-w-xl mx-auto rounded-3xl bg-primary p-3`,
        Platform.OS == "ios"
          ? {
              shadowColor: tw.color("secondary"),
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }
          : {
              elevation: 4,
            },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
    >
      <ScrollView
        horizontal
        contentContainerStyle={tw`flex-col justify-between pl-2 bg-transparent justify-center border w-3/4`}
      >
        <View
          style={tw`flex-row bg-transparent items-center`}
          accessibilityRole="tab"
        >
          <Image source={walletImage} style={tw`w-5 h-5`} />
          <Text
            type="body2"
            accessibilityLabel="wallet-label"
            style={tw`ml-1 text-on-primary`}
          >
            Wallet
          </Text>
        </View>

        <Text
          accessibilityLabel="wallet-balance"
          style={[
            tw`text-3xl font-sans-semibold text-on-dark my-2`,
            { overflow: "scroll" },
          ]}
        >
          {"\u20A6"}
          {formatAmt(balance)}
        </Text>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          tw`p-2 text-center rounded-xl justify-center border border-blue-100 bg-secondary items-center`,
          appStyles.boxShadow,
        ]}
        onPress={
          onAddCallback as ((event: GestureResponderEvent) => void) &
            (() => void)
        }
      >
        <Icon
          name="wallet-plus"
          style={[tw`p-0 m-0 self-center mx-auto text-center justify-center`]}
          accessibilityRole="button"
          size={40}
          color={tw.color("primary")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(WalletCard);
