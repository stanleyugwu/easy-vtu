import React from 'react';
import {View} from 'react-native';
import tw from '../lib/tailwind';
import {Avatar} from 'react-native-paper';
import Text from '../components/Type';

const ProfileAvatar = ({imageUrl,text = 'Hello, Welcome',textStyle,...rest}) => {
    return (
        <View style={tw`flex-row justify-start items-center ml-4 mb-2`} {...rest}>
            {
                imageUrl ? (
                    <Avatar.Image source={{uri:imageUrl}} size={47} accessibilityRole="imagebutton" accessibilityLabel="avatar-image"/>
                ) : (
                <Avatar.Icon icon="account" color={tw.color('primary')} style={tw`bg-gray-light`} accessibilityRole="imagebutton" accessibilityLabel="avatar-image" size={47}/>
                )
            } 
            <Text accessibilityRole="text" style={[tw.style('ml-3 text-lg'),textStyle]}>{text}</Text>
        </View>
    )
}

export default ProfileAvatar