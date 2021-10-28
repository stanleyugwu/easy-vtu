import React from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import {Text} from 'react-native-paper';
import { TouchableRipple } from 'react-native-paper';
import tw from '../lib/tailwind';
import FlashView from '../components/FlashView'

const ServiceCard = (props) => {
    const hexColors = ["#0000cc","#00cc00","#cc0000",tw.color('accent'),tw.color('primary')]
    const {
        source = require('../../assets/service-icons/airtime.png'), 
        title = 'MORE', 
        iconWrapperProps,
        animate = true, 
        animationDelay = 0,
        titleProps, 
        onPress = () => null
    } = props;

    const randomColorIndex = Math.floor(Math.random() * hexColors.length)
    
    return (
        <FlashView
            delay={animationDelay}
            bounciness={20}
            animate={animate}
            containerStyle={{
                borderBottomWidth:3,
                borderColor:hexColors[randomColorIndex]
            }}
        >
            <TouchableRipple 
                style={tw`w-full p-3 items-center justify-around`} 
                accessibilityRole="button" 
                onPress={onPress}
                rippleColor={"#0004"}
            >
                <>
                    <View {...iconWrapperProps} style={tw`w-10 h-10`}>
                        <Image accessibilityRole="imagebutton" accessibilityLabel={title} testID="service-image" source={source} style={tw.style('rounded-none w-full h-full')} resizeMode="contain"/>
                    </View>
                    <Text {...titleProps} accessibilityRole="text" testID="service-title" style={tw`text-gray-800 font-nunitobold text-center mt-2`}>{title}</Text>
                </>
            </TouchableRipple>
        </FlashView>
    )
}


export default ServiceCard