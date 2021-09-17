import React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import tw from '../lib/tailwind';


const CircleButton = ({onPress,gradient = ['#037d2e',tw.color('primary')],...rest}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient 
                colors={gradient} 
                start={{x:0.4,y:0.2}} end={{x:1,y:0.2}} 
                style={tw`rounded-full drop-shadow`}
            >
                <IconButton 
                    {...rest}
                    animated={true}
                />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CircleButton