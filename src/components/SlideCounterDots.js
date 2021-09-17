import React from 'react';
import {View} from 'react-native';
import tw from '../lib/tailwind';

const SlideCounterDots = ({activeDot}) => {
    return (
        <View style={tw`flex-row w-5`}>
            <View style={tw.style('w-2 h-2 rounded-full', activeDot == 1 ? 'bg-primary' : 'bg-gray-light')} />
            <View style={tw.style('w-2 h-2 rounded-full mx-2', activeDot == 2 ? 'bg-primary' : 'bg-gray-light')} />
            <View style={tw.style('w-2 h-2 rounded-full', activeDot == 3 ? 'bg-primary' : 'bg-gray-light')} />
        </View>
    )
}

export default SlideCounterDots