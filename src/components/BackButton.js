import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "./Type";
import { Entypo as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import PropTypes from 'prop-types';

/**
 * Back button component
 */
const BackButton = (props) => {
  return (
    <TouchableOpacity
      style={tw.style("p-2 flex-row", props.wrapperStyle)}
      onPress={props.onPress}
      accessibilityLabel="back-button"
    >
      <Icon name="chevron-thin-left" size={25} style={props.iconStyle} />
      <Text style={props.textStyle} accessibilityRole="text" accessibilityLabel={"button label"}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  /** text label for button */
  buttonText:PropTypes.string.isRequired,
  /** callback that is called when button is pressed */
  onPress:PropTypes.func,
  /** style for label wrapper `Text` component */
  textStyle:PropTypes.object,
  /** Style for `Icon` */
  iconStyle: PropTypes.object,
  /** style for `TouchableOpacity` wrapper component */
  wrapperStyle:PropTypes.object,
}

BackButton.defaultProps = {
  buttonText:"Back",
}

export default React.memo(BackButton);
