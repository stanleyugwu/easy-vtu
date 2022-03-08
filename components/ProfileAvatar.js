import React from "react";
import {
  View,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
} from "react-native";
import tw from "../lib/tailwind";
import { Avatar } from "react-native-paper";
import Text from "./Type";
import PropTypes from "prop-types";

/**
 * @typedef {Object} ProfileAvatarProps
 * @property {string} [accessibilityLabel] Custom Accessibility label for parent `View` wrapper
 * @property {ViewStyle} [wrapperStyle] Style for parent `View` wrapper
 * @property {ImageSourcePropType} imageUrl Image to display for the Avatar. It accepts a standard
 * React Native Image source prop Or a function that returns an Image.
 * @property {ImageStyle} [avatarStyle] Style for avatar `Image` or `Icon` component.
 * `Icon` will be rendered when `imageUrl` is not passed
 * @property {string} label Text to show right to avatar image
 * @property {TextStyle} textStyle Style for the `Text` right to avatar image
 */

/**
 * Renders a pressable, circular avatar image with custom text right to it
 * @param {ProfileAvatarProps} props
 */
const ProfileAvatar = (props) => {
  const resolvedSrc =
    typeof props.imageUrl === "number"
      ? props.imageUrl
      : { uri: props.imageUrl };

  return (
    <View
      accessibilityLabel={props.accessibilityLabel}
      style={tw.style(
        "flex-row justify-start items-center ml-4 mb-2",
        props.wrapperStyle
      )}
    >
      {props.imageUrl ? (
        <Avatar.Image
          accessibilityHint="calls a function to navigate to profile screen"
          source={resolvedSrc}
          style={props.avatarStyle}
          size={45}
          accessibilityRole="imagebutton"
          accessibilityLabel="avatar-image"
        />
      ) : (
        <Avatar.Icon
          icon="account"
          color={tw.color("primary")}
          style={tw.style("bg-gray-light", props.avatarStyle)}
          accessibilityRole="imagebutton"
          accessibilityLabel="avatar-image"
          size={45}
        />
      )}
      <Text
        accessibilityRole="text"
        style={tw.style("ml-3 text-lg", props.textStyle)}
      >
        {props.label}
      </Text>
    </View>
  );
};

ProfileAvatar.propTypes = {
  accessibilityLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatarStyle: PropTypes.object,
  label: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
};

ProfileAvatar.defaultProps = {
  accessibilityLabel: "profile avatar",
  label: "👋 Hi There",
};

export default React.memo(ProfileAvatar);
