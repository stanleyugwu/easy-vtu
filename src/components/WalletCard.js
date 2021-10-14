import React from 'react';
import {View} from 'react-native';
import { Text } from './Type';
import tw from '../lib/tailwind';
import {Ionicons as Icon} from '@expo/vector-icons'
import ShadowView from './ShadowView';

const WalletCard = ({balance = '#0',totalCards = 0,onAddCallback = () => null}) => {
    return (
        <ShadowView 
            style={
                tw.style(
                    'w-80 max-w-md mx-auto rounded-bl-md rounded-tr-md bg-white p-3',
                    {borderTopLeftRadius:35,borderBottomRightRadius:35}
                )
            }
        >
            <View style={tw`flex-row justify-between`}>
                <View style={tw`flex-col justify-between pl-2`}>
                    <View style={tw`flex-row`} accessibilityRole="tab">
                        <Icon name="wallet-sharp" color={tw.color(`gray`)} size={20}/>
                        <Text accessibilityLabel="wallet-label" style={tw`ml-1 text-gray`}>Wallet</Text>
                    </View>

                    <Text accessibilityLabel="wallet-balance" style={tw`text-3xl ml-3 my-2`}>{balance}</Text>
                    
                    <View style={tw`flex-row`}>
                        <Icon name="card-outline" size={20} color={tw.color('black')}/>
                        <Text accessibilityLabel="cards-added" style={tw`ml-1 items-center`}>{totalCards} Card(s)</Text>
                    </View>
                </View>
                <Icon 
                    name="add-circle" 
                    style={tw`p-0 m-0 self-center`} 
                    accessibilityRole="button" 
                    ellipsizeMode="middle" 
                    size={75} 
                    color={tw.color('primary')} 
                    onPress={onAddCallback}
                />
            </View>
        </ShadowView>
    )
}

export default WalletCard