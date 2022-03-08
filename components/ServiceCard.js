import React from "react";
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  GestureResponderEvent,
} from "react-native";
import Text from "./Type";
import { TouchableRipple } from "react-native-paper";
import tw from "../lib/tailwind";
import FlashView from "./FlashView";
import PropTypes from "prop-types";
import defaultIconImg from "../assets/images/service_icons/airtime.png";
import BoxShadowView from "./BoxShadowView";

/**
 * @typedef {Object} ServiceCardProps
 * @property {string} [accessibilityLabel] Custom accessibility label for component
 * @property {ViewStyle} [containerStyle] Style for parent `FlashView` component
 * @property {ImageSourcePropType} iconSrc The image source for service icon (either a remote URL or a local file resource).
 * This prop can also contain several remote URLs, specified together with their width and height and potentially
 * with scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the image container. A cache property can be added to control how networked request interacts with the local cache.
 * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
 * @property {string} title Service text label
 * @property {boolean} animate Determines whether animation is enabled or not
 * @property {number} animationDelay Number of `milliseconds` to delay the animation
 * @property {ViewStyle} imgWrapperStyle Style for the `View` component wrapping service image
 * @property {TextStyle} serviceTextStyle Style for service title `Text` component
 * @property {(event: GestureResponderEvent) => void} onPress Callback to be invoked when service card is pressed
 */

/**
 * Renders a pressable ui card representing an app service e.g airtime
 * @example <ServiceCard title="Buy Airtime" />
 * @param {ServiceCardProps} props
 */
const ServiceCard = (props) => {
  return (
    <FlashView
      delay={props.animationDelay}
      bounciness={15}
      animate={props.animate}
      containerStyle={tw.style(
        `rounded-xl w-32 max-w-xs max-h-36 mx-2`,
        props.containerStyle
      )}
    >
      <BoxShadowView
        containerStyle={tw`rounded-xl`}
        accessibilityLabel={props.accessibilityLabel}
      >
        <TouchableRipple
          style={tw`w-full items-center justify-around rounded-xl`}
          accessibilityRole="button"
          onPress={props.onPress}
          rippleColor={"#0004"}
        >
          <>
            <View style={tw.style("w-14 h-14 my-2", props.imgWrapperStyle)}>
              <Image
                accessibilityRole="imagebutton"
                accessibilityLabel={props.title}
                testID="service-image"
                source={props.iconSrc}
                style={tw.style("rounded-none w-full h-full")}
                resizeMode="contain"
              />
            </View>
            <View style={tw`p-1.5 w-full rounded-b-xl bg-blue-100`}>
              <Text
                accessibilityRole="text"
                testID="service-title"
                style={tw.style(
                  "text-primary text-sm font-sans-semibold",
                  props.serviceTextStyle
                )}
              >
                {props.title}
              </Text>
            </View>
          </>
        </TouchableRipple>
      </BoxShadowView>
    </FlashView>
  );
};

ServiceCard.propTypes = {
  accessibilityLabel: PropTypes.string,
  containerStyle: PropTypes.object,
  iconSrc: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  animate: PropTypes.bool.isRequired,
  animationDelay: PropTypes.number,
  imgWrapperStyle: PropTypes.object,
  serviceTextStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

ServiceCard.defaultProps = {
  accessibilityLabel: "service card",
  iconSrc: defaultIconImg,
  title: "EasyVtu",
  animate: true,
  animationDelay: 0,
};

export default React.memo(ServiceCard);
