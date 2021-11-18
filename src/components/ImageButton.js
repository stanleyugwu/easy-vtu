import React from "react";
import { TouchableRipple } from "react-native-paper";
import Text from "./Type";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Image, View } from "react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";
import defaultImg from "../../assets/image_placeholder.png";
import BoxShadowView from "./BoxShadowView";
import PressResizerView from "./PressResizerView";

/**
 * renders a pressable ui card having an image to the left, a text label,
 *
 * and an icon to the right.
 */
const ImageButton = (props) => {
  const resolvedSrc =
    typeof props.imgSrc === "number" 
    ? props.imgSrc 
    : { uri: props.imgSrc };

  return (
    <PressResizerView>
      <BoxShadowView containerStyle={tw.style('rounded-md mt-8 max-w-md')}>
        <TouchableRipple 
          onPress={props.onPress} 
          rippleColor={props.labelColor} 
          borderless={true} 
          accessibilityRole="button"
        >
          <View
            style={tw.style(
              "bg-primary flex-row rounded-md",
              props.containerStyle
            )}
            testID={"inner view wrapper"}
          >
            {/* image wrapper */}
            <View style={tw`bg-white p-4 w-3/12 rounded-l-md rounded-r-3xl`}>
              <Image
                source={resolvedSrc}
                style={tw`w-11 h-11`}
                resizeMode="contain"
                defaultSource={defaultImg}
                accessibilityRole="imagebutton"
              />
            </View>

            {/* label wrapper */}
            <View style={tw`flex-row items-center justify-end w-9/12 px-6`} accessibilityLabel={"label text wrapper"}>
              <Text style={tw.style("pr-6", { color: props.labelColor })} accessibilityLabel="label text">
                {props.label}
              </Text>
              <Icon
                name={props.rightIconName}
                size={25}
                color={props.labelColor}
                testID={"right icon"}
                accessibilityLabel={"button icon"}
              />
            </View>
          </View>
        </TouchableRipple>
      </BoxShadowView>
    </PressResizerView>
  );
};

ImageButton.propTypes = {
  /** card label text */
  label: PropTypes.string.isRequired,

  /** color for text label */
  labelColor: PropTypes.string,

  /** source for image rendered at the left of card.
   *
   * it can be a resource ID (i.e return value of `require`) for local image,
   *
   * a local path to image, or an http address string for online image.
   */
  imgSrc: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string]),

  /** name of icon to render to the right of card */
  rightIconName: PropTypes.string.isRequired,

  /** callback called when card is pressed */
  onPress: PropTypes.func.isRequired,

  /** styles for `View` parent container */
  containerStyle: PropTypes.object,
};

ImageButton.displayName = "ImageButton";

ImageButton.defaultProps = {
  label: "EasyVtu",
  labelColor: tw.color("accent"),
  imgSrc: defaultImg,
  rightIconName: "chevron-forward-sharp",
  containerStyle: null,
};

export default React.memo(ImageButton);
