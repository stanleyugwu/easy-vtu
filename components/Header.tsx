import React from "react";
import { GestureResponderEvent, View as _View } from "react-native";
import tw from "../lib/tailwind";
import { Ionicons as Icon } from "@expo/vector-icons";
import RippleButton from "./RippleButton";
import { useSelector } from "react-redux";
import Text, { View, ViewProps } from "./Themed";
import { RootState } from "../types";
import { Avatar } from "react-native-paper";
import { useNetInfo } from "@react-native-community/netinfo";

export type HeaderProps = {
  /** Callback to invoke when `menu` icon in the header top bar is pressed */
  onMenuPress: (event: GestureResponderEvent) => void;

  /** Callback to be invoked when the profile avatar image is pressed */
  onAvatarPress: (event: GestureResponderEvent) => void;
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
      ...otherProps
    }: HeaderProps,
    ref: React.ForwardedRef<_View>
  ) => {
    // State selectors
    const profile = useSelector((state: RootState) => state.user?.profile);
    const netinfo = useNetInfo();

    if (!profile) return null;

    return (
      <View
        accessibilityLabel={accessibilityLabel}
        style={[
          tw`bg-transparent justify-between`,
          style,
        ]}
        ref={ref}
        {...otherProps}
      >
        {
          !netinfo.isInternetReachable ? (
            <Text type="body2" style={tw`text-center px-2 font-sans-semibold text-red-700`}>No Internet!, Data May be out of sync</Text>
          ) : null
        }
        <View style={tw`p-3 px-6 bg-transparent flex-row justify-between items-center`}>
        <View
          style={tw`flex-row justify-between items-center mb-2 bg-transparent`}
          accessibilityLabel="header top-bar"
        >
          <View
            style={tw`bg-blue-100 border border-gray rounded-full p-1`}
          >
            <RippleButton onPress={onAvatarPress}>
              {!!profile.image ? (
                <Avatar.Image
                  accessibilityHint="calls a function to navigate to profile screen"
                  source={{uri:profile.image}}
                  size={48}
                  accessibilityRole="imagebutton"
                  accessibilityLabel="avatar-image"
                />
              ) : (
                <Avatar.Icon
                  icon="account"
                  color={tw.color("primary")}
                  style={tw.style("bg-white")}
                  accessibilityRole="imagebutton"
                  accessibilityLabel="avatar-image"
                  size={48}
                />
              )}
            </RippleButton>
          </View>

          <View style={tw`bg-transparent ml-2`}>
            <Text type="body2" style={tw`text-on-background`}>
              Welcome Back,
            </Text>
            <Text
              type="title"
              style={{ lineHeight: 22, color: tw.color("on-background") }}
            >
              {profile.username}
            </Text>
          </View>
        </View>

        <View>
          <Icon
            name="menu"
            onPress={onMenuPress}
            size={40}
            color={tw.color("primary")}
            accessibilityLabel="header top-bar menu-icon"
            accessibilityRole="button"
          />
        </View>
        </View>
      </View>
    );
  }
);

export default React.memo(Header);
