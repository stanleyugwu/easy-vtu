import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import {Ionicons as Icon} from '@expo/vector-icons';
import { Text } from './Type';
import tw from '../lib/tailwind';
import ShadowView from './ShadowView';

const PaymentMethodCard = ({label,iconName,onPress, containerStyle}) => {
    return (
        <TouchableRipple
            rippleColor="#0004"
            borderless={false}
            onPress={onPress}
            style={
                tw.style(
                    'rounded-full flex-row justify-center bg-primary my-2 w-full border border-gray-lighter p-3',
                    containerStyle
                )
            }
            accessibilityRole="button"
        >
            <ShadowView style={tw`flex-row justify-center items-center bg-primary`}>
                <Icon 
                    name={iconName || 'wallet-sharp'} 
                    accessibilityLabel="payment-method-icon" 
                    size={25}
                    color={tw.color('accent')}
                />
                <Text style={tw`text-base text-btn font-nunitobold uppercase text-accent ml-3`} accessibilityLabel="payment-method-label">
                    {label || 'PAY FROM WALLET'}
                </Text>
            </ShadowView>
        </TouchableRipple>
    )
}

export default PaymentMethodCard