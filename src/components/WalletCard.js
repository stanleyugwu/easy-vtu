import React from 'react';
import {View} from 'react-native';
import { Text } from './Type';
import tw from '../lib/tailwind';
import {Ionicons as Icon} from '@expo/vector-icons'
import ShadowView from './ShadowView';

const WalletCard = ({balance = '#0',totalCards = 0,onAddCallback}) => {
    return (
        <ShadowView 
            style={
                tw.style(
                    'w-11/12 mx-auto rounded-bl-md rounded-tr-md bg-white p-3',
                    {borderTopLeftRadius:35,borderBottomRightRadius:35}
                )
            }
        >
            <View style={tw`flex-row justify-start ml-2`} accessibilityRole="tab">
                <Icon name="wallet-sharp" color={tw.color(`gray`)} size={20}/>
                <Text accessibilityLabel="wallet-label" style={tw`ml-1 text-gray`}>Wallet</Text>
            </View>

            <View style={tw`flex-row justify-between items-center`}>
                <Text accessibilityLabel="wallet-balance" style={tw`text-3xl ml-3`}>{balance}</Text>
                <Icon name="add-circle" style={tw`p-0 m-0`} accessibilityRole="button" ellipsizeMode="middle" size={70} color={tw.color('primary')} onPress={onAddCallback}/>
            </View>

            <View style={tw`flex-row justify-start`}>
                <Icon name="card-outline" size={20} color={tw.color('black')}/>
                <Text accessibilityLabel="cards-added">{totalCards} Card(s)</Text>
            </View>
        </ShadowView>
    )
}

export default WalletCard