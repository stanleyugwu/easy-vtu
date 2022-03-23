import React from "react";
import Text, { View } from "./Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import type { Contact } from "../types";
import appStyles from "../lib/appStyles";
import RippleButton from "./RippleButton";

export type ContactProps = Contact & {
  /** Callback to be called with contact info when contact is pressed */
  onContactSelect: (contactInfo: Contact) => void;
};

/** Generates random color hex */
let colors = ["#f55", "#5f5", "#55f", "#ff5", "#5ff", "#f5f"];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

/**
 * Renders individual, pressable contact
 * @param {ContactProps} props
 */
const ContactCard = ({ onContactSelect, name, phoneNumber }: ContactProps) => {
  // Random color for contact icon
  const contactIconColor = React.useRef(randomColor());

  return (
    <RippleButton
      rippleColor="#0009"
      accessibilityLabel="select contact button"
      accessibilityRole="button"
      onPress={() => onContactSelect({ name, phoneNumber })}
      style={[tw`m-2 rounded-xl bg-surface`, appStyles.boxShadowSmall]}
    >
      <View
        style={tw`flex-row rounded-xl bg-surface items-center p-3 justify-start`}
      >
        <View
          style={tw.style(`rounded-full p-3`, {
            backgroundColor: contactIconColor.current,
          })}
          accessibilityLabel="contact icon"
          accessibilityRole="image"
        >
          <Icon name="person" color={tw.color("on-surface")} size={23} />
        </View>
        <View style={tw`flex-col ml-4 bg-surface`}>
          <Text
            type="body"
            style={tw`text-left text-on-surface font-sans-semibold`}
            accessibilityLabel="contact name"
          >
            {name}
          </Text>
          <Text accessibilityLabel="contact phone number">{phoneNumber}</Text>
        </View>
      </View>
    </RippleButton>
  );
};

export default React.memo(ContactCard);
