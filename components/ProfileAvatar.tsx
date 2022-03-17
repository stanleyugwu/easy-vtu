import React from "react";
import { View, ImageSourcePropType, ImageStyle, TextStyle } from "react-native";
import tw from "../lib/tailwind";
import { Avatar } from "react-native-paper";
import Text from "./Themed";
import { ViewProps } from "./Themed";

// Images
// @ts-ignore
import defaultAvatarImage from '../assets/images/profile.png';

export type ProfileAvatarProps = {
  /** Image to display for the Avatar. It accepts a standard
   * React Native Image source prop Or a function that returns an Image.
   */
  imageUrl: ImageSourcePropType;
  /** Style for avatar `Image` or `Icon` component.
   * `Icon` will be rendered when `imageUrl` is not passed
   */
  avatarStyle?: ImageStyle;
  /** Text to show right to avatar image */
  label: string;
  /** Style for the `Text` right to avatar image */
  textStyle: TextStyle;
} & ViewProps;

/**
 * Renders a pressable, circular avatar image with custom text right to it
 * @param {ProfileAvatarProps} props
 */
const ProfileAvatar = ({
  imageUrl = defaultAvatarImage,
  label = "👋 Hi There",
  avatarStyle,
  textStyle,
  accessibilityLabel = "profile avatar",
  style,
}: ProfileAvatarProps) => {
  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={tw.style("flex-row justify-start items-center ml-4 mb-2", style)}
    >
      {imageUrl ? (
        <Avatar.Image
          accessibilityHint="calls a function to navigate to profile screen"
          source={imageUrl}
          style={avatarStyle}
          size={45}
          accessibilityRole="imagebutton"
          accessibilityLabel="avatar-image"
        />
      ) : (
        <Avatar.Icon
          icon="account"
          color={tw.color("primary")}
          style={tw.style("bg-gray-light", avatarStyle)}
          accessibilityRole="imagebutton"
          accessibilityLabel="avatar-image"
          size={45}
        />
      )}
      <Text
        accessibilityRole="text"
        style={tw.style("ml-3 text-lg", textStyle)}
      >
        {label}
      </Text>
    </View>
  );
};

export default React.memo(ProfileAvatar);
