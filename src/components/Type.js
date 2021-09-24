import React from 'react';
import {Text} from 'react-native';
import tw from '../lib/tailwind';

export default CustomText = ({children,style,...rest}) => {
    return <Text style={[tw`text-center text-base text-black font-nunitomed`,style]} {...rest}>{children}</Text>
}

export const Title = ({children,style,...rest}) => {
    return <Text style={[tw`text-center text-black font-nunitobold text-1.5xl`,style]} {...rest}>{children}</Text>
}
