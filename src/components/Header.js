import React from 'react';
import {View} from 'react-native';
import ProfileAvatar from './ProfileAvatar';
import WalletCard from './WalletCard';
import tw from '../lib/tailwind';
import {Ionicons as Icon} from '@expo/vector-icons';
import FadeInView from './FadeInView';
import { TouchableRipple } from 'react-native-paper';

// fallback function
const fallback = () => null;

const Header = (props) => {

    //destrcuture passed props
    const {
        onMenuPress = fallback,
        onNotificationPress = fallback,
        onAvatarPress = fallback,
        onAddCallback = fallback,
        avatarText = "Hello Welcome",
        avatarImgUrl = false,
        walletBalance = "#0",
        walletTotalCards = 0
    } = props;

    return (
        <View style={tw.style('bg-primary p-3 h-48 rounded-b-xl',{zIndex:9999})}>
            <View style={tw`flex-row justify-between mb-2`}>
                <Icon name="menu" onPress={onMenuPress} size={40} color={tw.color('accent')} accessibilityLabel="menu-icon" accessibilityRole="button"/>
                <Icon 
                    name="notifications" 
                    color={tw.color('accent')} 
                    size={32} 
                    accessibilityLabel="notification-icon" 
                    accessibilityRole="button"
                    onPress={onNotificationPress}
                />
            </View>
            
            <TouchableRipple onPress={onAvatarPress} accessibilityLabel="profile-icon">
                <ProfileAvatar 
                    textStyle={tw`text-gray-light font-nunitobold`} 
                    text={avatarText}
                    imageUrl={avatarImgUrl}
                />
            </TouchableRipple>

            <FadeInView slideUp={true} style={tw`w-full mt-2`}>
                <WalletCard 
                    balance={walletBalance} 
                    totalCards={walletTotalCards} 
                    onAddCallback={onAddCallback}
                />
            </FadeInView>
        </View>
    )
}

export default Header