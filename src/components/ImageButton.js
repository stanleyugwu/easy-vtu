import React from "react";
import Text from "./Type";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Image, TouchableOpacity, ViewStyle, View, ColorValue, ImageSourcePropType, GestureResponderEvent } from "react-native";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";
import defaultImg from "../../assets/image_placeholder.png";
import BoxShadowView from "./BoxShadowView";
import PressResizerView from "./PressResizerView";

/**
 * @typedef {Object} ImageButtonProps
 * @property {string} label Button label text
 * @property {ColorValue} labelColor Color for text label
 * @property {ImageSourcePropType} imgSrc The image source (either a remote URL or a local file resource).\
 * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments. The native side will then choose the best uri to display based on the measured size of the image container. A cache property can be added to control how networked request interacts with the local cache.
 * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
 * @property {string} rightIconName Name of icon to render to the right of button
 * @property {(event: GestureResponderEvent) => void} onPress Callback to be called when button is pressed
 * @property {ViewStyle} containerStyle Styles for `View` parent container
 */

/**
 * Renders a pressable ui card having an image to the left, a text label, and an icon to the right.
 * @param {ImageButtonProps} props
 */
const ImageButton = (props) => {
  const resolvedSrc =
    typeof props.imgSrc === "number" ? props.imgSrc : { uri: props.imgSrc };

  return (
    <PressResizerView>
      <BoxShadowView containerStyle={tw.style("rounded-md mt-5 max-w-md")}>
        <TouchableOpacity
          activeOpacity={0.9}
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
            <View style={tw`bg-accent p-3 w-3/12 rounded-l-md rounded-r-3xl`}>
              <Image
                source={resolvedSrc}
                style={tw`w-11 h-11`}
                resizeMode="contain"
                defaultSource={defaultImg}
                accessibilityRole="imagebutton"
              />
            </View>

            {/* label wrapper */}
            <View
              style={tw`flex-row items-center justify-end w-9/12 px-6`}
              accessibilityLabel={"label text wrapper"}
            >
              <Text
                style={tw.style("pr-10 font-sans-semibold", { color: props.labelColor })}
                accessibilityLabel="label text"
              >
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
        </TouchableOpacity>
      </BoxShadowView>
    </PressResizerView>
  );
};

ImageButton.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  imgSrc: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string]),
  rightIconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
};

ImageButton.displayName = "ImageButton";

ImageButton.defaultProps = {
  label: "EasyVtu",
  labelColor: tw.color("light"),
  imgSrc: defaultImg,
  rightIconName: "chevron-forward-sharp",
};

export default React.memo(ImageButton);
