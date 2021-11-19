import React from "react";
import { View, Image } from "react-native";
import Text  from "../components/Type";
import { TouchableRipple } from "react-native-paper";
import tw from "../lib/tailwind";
import FlashView from "./FlashView";
import PropTypes from "prop-types";
import defaultIconImg from "../../assets/service-icons/airtime.png";
import BoxShadowView from "./BoxShadowView";

/**
 * renders a pressable ui card representing an app service e.g airtime
 */

const ServiceCard = (props) => {
  return (
    <FlashView
      delay={props.animationDelay}
      bounciness={20}
      animate={props.animate}
      containerStyle={tw`rounded-xl w-32 max-w-xs max-h-36 mx-2`}
    >
      <BoxShadowView containerStyle={tw`rounded-xl`}>
        <TouchableRipple
          style={tw`w-full items-center justify-around rounded-xl`}
          accessibilityRole="button"
          onPress={props.onPress}
          rippleColor={"#0004"}
        >
          <>
            <View style={tw.style("w-10 h-10 my-3", props.imgWrapperStyle)}>
              <Image
                accessibilityRole="imagebutton"
                accessibilityLabel={props.title}
                testID="service-image"
                source={props.iconSrc}
                style={tw.style("rounded-none w-full h-full")}
                resizeMode="contain"
              />
            </View>
            <View style={tw`bg-primary p-1.5 w-full rounded-b-xl`}>
              <Text
                  accessibilityRole="text"
                  testID="service-title"
                  style={tw.style(
                  "text-accent",
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
  /** source for service image */
  iconSrc: PropTypes.number.isRequired,
  /** service text */
  title: PropTypes.string.isRequired,
  /** determines whether animation is enabled */
  animate: PropTypes.bool.isRequired,
  /** delay for the animation */
  animationDelay: PropTypes.number,
  /** style for image `View` wrapper component */
  imgWrapperStyle: PropTypes.object,
  /** style for service `Text` component */
  serviceTextStyle: PropTypes.object,
  /** callback to be invoked when card is pressed */
  onPress: PropTypes.func.isRequired,
};

ServiceCard.defaultProps = {
  iconSrc: defaultIconImg,
  title: "EasyVtu",
  animate: true,
  animationDelay: 0,
  imgWrapperStyle: null,
  serviceTextStyle: null,
  onPress: () => null,
};

export default React.memo(ServiceCard);
