import React from "react";
import { View } from "react-native";
import BoxShadowView from "./BoxShadowView";
import { TouchableRipple } from "react-native-paper";
import Text, { Title } from "./Type";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";

/**
 * @typedef {Object} Contact
 * @property {string} name Fullname of selected contact
 * @property {string} phoneNumber Phone number of selected contact
 */

/**
 * @typedef {Object} ContactProps
 * @property {string} name Name of contact
 * @property {string} phoneNumber Contact phone number
 * @property {(contactInfo:Contact) => void} onSelectCb Callback to be called with contact info when contact is pressed
 */

/** Generates random color hex */
let colors = ["#f55", "#5f5", "#55f", "#ff5", "#5ff", "#f5f"];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

/**
 * Renders individual, pressable contact
 * @param {ContactProps} props
 */
const Contact = (props) => {
  const contactIconColor = React.useRef(randomColor());

  return (
    <BoxShadowView
      containerStyle={tw`justify-center m-2`}
      accessibilityLabel="contact container"
    >
      <TouchableRipple
        rippleColor="#0009"
        style={tw`flex-row items-center p-3 `}
        accessibilityLabel="select contact button"
        accessibilityRole="button"
        onPress={() =>
          props.onSelectCb({ name: props.name, phoneNumber: props.phoneNumber })
        }
      >
        <>
          <View
            style={tw.style(`rounded-full p-3`, {
              backgroundColor: contactIconColor.current,
            })}
            accessibilityLabel="contact icon"
            accessibilityRole="image"
          >
            <Icon name="person" size={22} />
          </View>
          <View style={tw`flex-col ml-4`}>
            <Title
              style={tw`text-base text-gray-600 text-left font-sans-bold`}
              accessibilityLabel="contact name"
            >
              {props.name}
            </Title>
            <Text
              style={tw`text-left`}
              accessibilityLabel="contact phone number"
            >
              {props.phoneNumber}
            </Text>
          </View>
        </>
      </TouchableRipple>
    </BoxShadowView>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onSelectCb: PropTypes.func.isRequired,
};

export default React.memo(Contact);
