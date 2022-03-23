import React from "react";
import { GestureResponderEvent, View as _View } from "react-native";
import ProfileAvatar from "./ProfileAvatar";
import WalletCard from "./WalletCard";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import FadeInView from "./FadeInView";
import RippleButton from "./RippleButton";
import { useSelector } from "react-redux";
import { View, ViewProps } from "./Themed";

export type HeaderProps = {
  /** Callback to invoke when `menu` icon in the header top bar is pressed */
  onMenuPress: (event: GestureResponderEvent) => void;

  /** Callback to be invoked when `notification` icon  in the header top bar is pressed */
  onNotificationPress: (event: GestureResponderEvent) => void;

  /** Callback to be invoked when the profile avatar image is pressed */
  onAvatarPress: (event: GestureResponderEvent) => void;

  /** Callback to invoke when the plus "+" button in wallet card is pressed */
  onWalletAddCb: (event: GestureResponderEvent) => void;
} & ViewProps;

/**
 * Protected Header Component That Wraps WalletCard and ProfileAvatar Components
 * @param {HeaderProps} props
 */
const Header = React.forwardRef(
  (
    {
      accessibilityLabel = "app header",
      style,
      onMenuPress,
      onAvatarPress,
      onNotificationPress,
      onWalletAddCb,
      ...otherProps
    }: HeaderProps,
    ref: React.ForwardedRef<_View>
  ) => {
    // State selectors
    const profile = useSelector((state) => state.user.profile);
    const wallet = useSelector((state) => state.wallet);

    return (
      <View
        accessibilityLabel={accessibilityLabel}
        style={[tw`h-44 p-3 bg-transparent`, style]}
        ref={ref}
        {...otherProps}
      >
        <View
          style={tw`flex-row justify-between mb-2 bg-transparent`}
          accessibilityLabel="header top-bar"
        >
          <Icon
            name="menu"
            onPress={onMenuPress}
            size={37}
            color={tw.color("secondary")}
            accessibilityLabel="header top-bar menu-icon"
            accessibilityRole="button"
          />
          <Icon
            name="notifications"
            color={tw.color("secondary")}
            size={28}
            style={tw`pt-1`}
            accessibilityLabel="header top-bar notification-icon"
            accessibilityRole="button"
            onPress={onNotificationPress}
          />
        </View>

        <RippleButton onPress={onAvatarPress} accessibilityLabel="profile-icon">
          <ProfileAvatar
            accessibilityLabel="header profile avatar"
            textStyle={tw`text-gray-light font-sans-semibold`}
            label={"👋 Hello " + profile.username}
            imageUrl={profile.image}
          />
        </RippleButton>

        <FadeInView slideUp={false} style={tw`w-full mt-2`}>
          <WalletCard
            balance={wallet.balance}
            totalCards={wallet.cards.length}
            onAddCallback={onWalletAddCb}
          />
        </FadeInView>
      </View>
    );
  }
);

export default React.memo(Header);
