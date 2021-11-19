import React from "react";
import { TouchableRipple, Avatar } from "react-native-paper";
import Text from "./Type";
import tw from '../lib/tailwind';

const NetworkProviderButton = ({onPress,networkImageSrc,networkName,buttonStyle,...rest}) => (
  <TouchableRipple
    accessibilityLabel="network provider button"
    accessibilityRole="button"
    borderless={false}
    rippleColor="#000e"
    centered={false}
    onPress={onPress}
    style={tw.style('flex-row bg-primary justify-between rounded-full w-full p-2 items-center mt-4',buttonStyle)}
    {...rest}
  >
    <>
      <Text style={tw`font-nunitobold text-base pl-4 text-accent`} accessibilityRole="text">{networkName || 'UNKNOWN NETWORK'}</Text>
      <Avatar.Image source={networkImageSrc || require('../../assets/service-icons/default_network.png')} size={38} accessibilityLabel="provider-image" accessibilityRole="imagebutton"/>
    </>
  </TouchableRipple>
);

export default NetworkProviderButton