import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import {Entypo as Icon} from '@expo/vector-icons';
import tw from '../lib/tailwind';

const BackButton = ({onPress,style, ...rest}) => {
    return <TouchableOpacity style={tw.style('p-2 flex-row',style)} onPress={onPress} {...rest}>
        <Icon name="chevron-thin-left" size={25}/>
        <Text style={tw`text-base`}>Back</Text>
    </TouchableOpacity>
}

export default BackButton