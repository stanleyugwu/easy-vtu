import React from "react";
import { View, GestureResponderEvent } from "react-native";
import ProfileAvatar from "./ProfileAvatar";
import WalletCard from "./WalletCard";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import FadeInView from "./FadeInView";
import { TouchableRipple } from "react-native-paper";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ViewStyle } from "react-native";

/**
 * @typedef {Object} HeaderProps Header component props
 * @property {string} [accessibilityLabel] Custom accessibility label
 * @property {ViewStyle} [wrapperStyle] Custom style for wrapper `View`
 * @property {(event: GestureResponderEvent) => void} onMenuPress Callback to invoke when `menu` icon in the header top bar is pressed
 * @property {(event: GestureResponderEvent) => void} onNotificationPress Callback to be invoked when `notification` icon  in the header top b ar is pressed
 * @property {(event: GestureResponderEvent) => void} onAvatarPress Callback to be invoked when the avatar image is pressed
 * @property {(event: GestureResponderEvent) => void} onWalletAddCb Callback to invoke when the plus "+" button in wallet card is pressed
 */

/**
 * Protected Header Component That Wraps WalletCard and ProfileAvatar Components
 * @param {HeaderProps} props
 */
const Header = React.forwardRef((/** @type {HeaderProps} */ props, ref) => {
  const profile = useSelector((state) => state.user.profile);
  const wallet = useSelector((state) => state.wallet);

  return (
    <View
      accessibilityLabel={props.accessibilityLabel}
      style={tw.style("h-44 p-3", props.wrapperStyle)}
      ref={ref}
    >
      <View
        style={tw`flex-row justify-between mb-2`}
        accessibilityLabel="header top-bar"
      >
        <Icon
          name="menu"
          onPress={props.onMenuPress}
          size={37}
          color={tw.color("accent")}
          accessibilityLabel="header top-bar menu-icon"
          accessibilityRole="button"
        />
        <Icon
          name="notifications"
          color={tw.color("accent")}
          size={28}
          style={tw`pt-1`}
          accessibilityLabel="header top-bar notification-icon"
          accessibilityRole="button"
          onPress={props.onNotificationPress}
        />
      </View>

      <TouchableRipple
        onPress={props.onAvatarPress}
        accessibilityLabel="profile-icon"
      >
        <ProfileAvatar
          accessibilityLabel="header profile avatar"
          textStyle={tw`text-gray-light font-sans-semibold`}
          label={"👋 Hello " + profile.username}
          imageUrl={profile.image}
        />
      </TouchableRipple>

      <FadeInView slideUp={false} containerStyle={tw`w-full mt-2`}>
        <WalletCard
          balance={wallet.balance}
          totalCards={wallet.cards.length}
          onAddCallback={props.onWalletAddCb}
        />
      </FadeInView>
    </View>
  );
});

Header.propTypes = {
  accessibilityLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  onMenuPress: PropTypes.func.isRequired,
  onNotificationPress: PropTypes.func.isRequired,
  onAvatarPress: PropTypes.func.isRequired,
  onWalletAddCb: PropTypes.func.isRequired,
};

Header.defaultProps = {
  accessibilityLabel: "app header",
};

export default React.memo(Header);
