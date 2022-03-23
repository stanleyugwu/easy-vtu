import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import Text, { View } from "./Themed";
import tw from "../lib/tailwind";
import FlashView from "./FlashView";
import RippleButton, { RippleButtonProps } from "./RippleButton";
import appStyles from "../lib/appStyles";

// @ts-ignore
import defaultIconImg from "../assets/images/service_icons/airtime.png";
import { TextProps, ViewProps } from "./Themed";

export type ServiceCardProps = {
  /** The image source for service icon (either a remote URL or a local file resource).
   * This prop can also contain several remote URLs, specified together with their width and height and potentially
   * with scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the image container. A cache property can be added to control how networked request interacts with the local cache.
   * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
   */
  iconSrc: ImageSourcePropType;

  /** Service text label */
  title?: string;
  /** Determines whether animation is enabled or not */
  animate?: boolean;
  /** Number of `milliseconds` to delay the animation */
  animationDelay?: number;
  /** Style for the `View` component wrapping service image */
  imgWrapperStyle?: ViewProps["style"];
  /** Style for service title `Text` component */
  serviceTextStyle?: TextProps["style"];
} & RippleButtonProps;

/**
 * Renders a pressable ui card representing an app service e.g airtime
 * @example <ServiceCard title="Buy Airtime" />
 * @param {ServiceCardProps} props
 */
const ServiceCard = ({
  style,
  animate = true,
  animationDelay = 0,
  title = "EasyVtu",
  onPress,
  imgWrapperStyle,
  accessibilityLabel = "service card",
  iconSrc = defaultIconImg,
  serviceTextStyle,
}: ServiceCardProps) => {
  return (
    <FlashView
      delay={animationDelay}
      bounciness={15}
      animate={animate}
      accessibilityLabel={accessibilityLabel}
      style={tw.style(
        `rounded-xl bg-surface w-32 max-w-xs max-h-36 mx-2`,
        appStyles.boxShadow,
        style
      )}
    >
      <RippleButton
        style={tw`w-full items-center justify-around rounded-xl`}
        accessibilityRole="button"
        onPress={onPress}
        rippleColor={"#0004"}
      >
        <View
          style={tw`w-full items-center justify-around rounded-xl bg-transparent`}
        >
          <View
            style={tw.style("w-14 h-14 my-2 bg-transparent", imgWrapperStyle)}
          >
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={title}
              testID="service-image"
              source={iconSrc}
              style={tw.style("rounded-none w-full h-full")}
              resizeMode="contain"
            />
          </View>
          <View
            style={tw`p-1.5 w-full bg-transparent rounded-b-xl bg-blue-100`}
          >
            <Text
              type="body2"
              accessibilityRole="text"
              testID="service-title"
              style={tw.style(
                "text-primary font-sans-semibold text-center",
                serviceTextStyle
              )}
            >
              {title}
            </Text>
          </View>
        </View>
      </RippleButton>
    </FlashView>
  );
};

export default React.memo(ServiceCard);
