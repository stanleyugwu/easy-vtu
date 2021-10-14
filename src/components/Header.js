import React from 'react';
import {View} from 'react-native';
import ProfileAvatar from './ProfileAvatar';
import WalletCard from './WalletCard';
import tw from '../lib/tailwind';
import {Ionicons as Icon} from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={tw`bg-primary p-3 h-48 rounded-b-xl`}>
            <View style={tw`flex-row justify-between mb-3`}>
                <Icon name="menu" size={40} color={tw.color('accent')} accessibilityLabel="menu-icon" accessibilityRole="button"/>
                <Icon name="notifications" color={tw.color('accent')} size={35} accessibilityLabel="notification-icon" accessibilityRole="button"/>
            </View>
            <ProfileAvatar textStyle={tw`text-gray-light font-nunitobold`}/>
            <View style={tw`w-full mt-3`}>
                <WalletCard balance={"#30000"} totalCards={4}/>
            </View>
        </View>
    )
}

export default Header