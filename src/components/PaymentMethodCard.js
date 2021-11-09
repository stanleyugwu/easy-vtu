import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import {Ionicons as Icon} from '@expo/vector-icons';
import { Text } from './Type';
import tw from '../lib/tailwind';
import ShadowView from './ShadowView';

const PaymentMethodCard = ({label,iconName,onPress, containerStyle}) => {
    return (
        <ShadowView style={tw`rounded-full flex-row border border-gray-lighter justify-center items-center bg-primary my-2`}>
            <TouchableRipple
            rippleColor="#0004"
            borderless={true}
            onPress={onPress}
            style={
                tw.style(
                    'flex-row justify-between w-full p-3',
                    containerStyle
                )
            }
            accessibilityRole="button"
        >
            <>
                <Text style={tw`text-base text-btn font-nunitobold uppercase text-accent ml-3`} accessibilityLabel="payment-method-label">
                    {label || 'PAY FROM WALLET'}
                </Text>
                <Icon 
                    name={iconName || 'wallet-sharp'} 
                    accessibilityLabel="payment-method-icon" 
                    size={25}
                    color={tw.color('accent')}
                />
            </>
        </TouchableRipple>
       </ShadowView>
    )
}

export default PaymentMethodCard