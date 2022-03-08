import React from "react";
import { Image, View } from "react-native";
import Text from "./Type";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import BoxShadowView from "./BoxShadowView";
import { ViewStyle } from "react-native";
import PropTypes from "prop-types";

/**
 * @typedef {Object} Prop `WalletCard` component props
 * @property {string} [accessibilityLabel] Custom accessibility label for parent `View`
 * @property {ViewStyle} [wrapperStyle] Style for parent `View`
 * @property {number} balance Amount to display as balance
 * @property {number} totalCards Number to display as number of saved debit card
 * @property {function} onAddCallback Function to invoke when add button is pressed
 */

/**
 * Renders a ui card having user's wallet information
 * @param {Prop} props
 */
const WalletCard = React.forwardRef((/** @type {Prop} */ props, ref) => {
  return (
    <BoxShadowView
      containerStyle={tw.style(
        "w-80 max-w-md mx-auto rounded-3xl bg-white p-3",
        props.wrapperStyle
      )}
    >
      <View
        style={tw`flex-row justify-between`}
        accessibilityLabel={props.accessibilityLabel}
        ref={ref}
      >
        <View style={tw`flex-col justify-between pl-2`}>
          <View style={tw`flex-row`} accessibilityRole="tab">
            <Image
              source={require("../assets/images/wallet_img.png")}
              style={tw`w-5 h-5`}
            />
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
            {props.balance}
          </Text>

          <View style={tw`flex-row`}>
            <Image
              source={require("../assets/images/card_img.png")}
              style={tw`w-5 h-5`}
            />
            <Text
              accessibilityLabel="cards-added"
              style={tw`ml-1 items-center text-sm font-sans-semibold`}
            >
              {props.totalCards + " Card(s)"}
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
          onPress={props.onAddCallback}
        />
      </View>
    </BoxShadowView>
  );
});

WalletCard.propTypes = {
  accessibilityLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  balance: PropTypes.number.isRequired,
  totalCards: PropTypes.number.isRequired,
  onAddCallback: PropTypes.func.isRequired,
};

WalletCard.defaultProps = {
  accessibilityLabel: "wallet card",
  balance: 0,
  totalCards: 0,
};

export default React.memo(WalletCard);
