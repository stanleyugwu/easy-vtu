import React from "react";
import Text, { View, ViewProps } from "./Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  Image,
  ColorValue,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";
import tw from "../lib/tailwind";
import PressResizerView from "./PressResizerView";
import RippleButton from "./RippleButton";

// @ts-ignore
import defaultImg from "../assets/images/image_placeholder.png";
import appStyles from "../lib/appStyles";

export type ImageButtonProps = {
  /** Button label text */
  label: string;

  /** Color for text label */
  labelColor?: ColorValue;

  /** The image source (either a remote URL or a local file resource).\
   * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the image container. A cache property can be added to control how networked request interacts with the local cache.
   * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
   */
  imgSrc: ImageSourcePropType;

  /** Name of icon to render to the right of button */
  rightIconName?: keyof typeof Icon.glyphMap;
  /** Callback to be called when button is pressed */
  onPress?: (event: GestureResponderEvent) => void;
} & ViewProps;

/**
 * Renders a pressable ui card having an image to the left, a text label, and an icon to the right.
 * @param {ImageButtonProps} props
 */
const ImageButton = ({
  imgSrc = defaultImg,
  onPress,
  labelColor = tw.color("on-surface"),
  style,
  label = "Easy Vtu",
  rightIconName = "chevron-forward-sharp",
  ...otherProps
}: ImageButtonProps) => {
  return (
    <PressResizerView style={[tw`rounded-md max-w-md mt-5 bg-surface`,appStyles.boxShadow, style]}>
      <RippleButton
        onPress={onPress}
        rippleColor={labelColor}
        accessibilityRole="button"
        {...otherProps}
      >
        <View
          style={[
            tw`
              bg-transparent flex-row rounded-md`,
          ]}
          testID={"inner view wrapper"}
        >
          {/* image wrapper */}
          <View style={tw`bg-primary p-3 w-3/12 rounded-l-md rounded-r-3xl`}>
            <Image
              source={imgSrc}
              style={tw`w-11 h-11`}
              resizeMode="contain"
              defaultSource={defaultImg}
              accessibilityRole="imagebutton"
            />
          </View>

          {/* label wrapper */}
          <View
            style={tw`flex-row items-center bg-transparent justify-end w-9/12 px-6`}
            accessibilityLabel={"label text wrapper"}
          >
            <Text
              style={[
                tw.style("pr-10 font-sans-semibold"),
                {
                  color: labelColor,
                },
              ]}
              accessibilityLabel="label text"
            >
              {label}
            </Text>
            <Icon
              name={rightIconName}
              size={25}
              color={labelColor}
              testID={"right icon"}
              accessibilityLabel={"button icon"}
            />
          </View>
        </View>
      </RippleButton>
    </PressResizerView>
  );
};

export default React.memo(ImageButton);
