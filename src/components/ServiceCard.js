import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native';
import {Avatar, Text, Title} from 'react-native-paper';
import tw from '../lib/tailwind';
import FadeInView from './FadeInView';

const ServiceCard = (props) => {
    const {source, title, iconWrapperProps, titleProps, wrapperProps, wrapperStyle, onPress} = props;
    return (
        <FadeInView {...wrapperProps} style={tw.style(
                'rounded-lg w-5/12 p-0 max-w-xs',
                {backgroundColor:'white'},
                styles.boxShadow,
                wrapperStyle
            )}
        >
           <TouchableOpacity style={tw`w-full p-3 items-center justify-around`} onPress={onPress}>
            <>
                <View {...iconWrapperProps} style={tw`w-10 h-10`}>
                    <Image source={source || require('../../assets/service-icons/airtime.png')} style={tw.style('rounded-none h-full w-full')} resizeMode="contain"/>
                </View>
                <Text {...titleProps} style={tw`text-base font-nunitobold text-center mt-2`}>{title}</Text>
            </>
           </TouchableOpacity>
        </FadeInView>
    )
}

const styles = StyleSheet.create({
    boxShadow: Platform.OS == 'ios' ? {
        shadowColor: '#171717',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    } : {
        elevation:10,
        shadowColor:'#52006a'
    }
})

export default ServiceCard