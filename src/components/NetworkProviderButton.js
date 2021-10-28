import React from "react";
import { TouchableRipple, Avatar } from "react-native-paper";
import { Text } from "./Type";
import tw from '../lib/tailwind';

const NetworkProviderButton = ({onPress,networkImageSrc,networkName,buttonStyle,...rest}) => (
  <TouchableRipple
    accessibilityRole="button"
    borderless={false}
    rippleColor="#000e"
    centered={false}
    onPress={onPress}
    style={tw.style('flex-row w-full p-2 justify-start items-center border border-gray-200 mt-4',buttonStyle)}
    {...rest}
  >
    <>
      <Avatar.Image source={networkImageSrc || require('../../assets/service-icons/default_network.png')} size={38} accessibilityLabel="provider-image" accessibilityRole="image-button"/>
      <Text style={tw`font-nunitobold text-base pl-4`} accessibilityRole="text">{networkName || 'UNKNOWN NETWORK'}</Text>
    </>
  </TouchableRipple>
);

export default NetworkProviderButton