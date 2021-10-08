import React from 'react';
import {Text as EText} from 'react-native';
import tw from '../lib/tailwind';

export const Text = ({children,style,...rest}) => {
    return <EText style={[tw`text-center text-base text-black font-nunitomed`,style]} {...rest}>{children}</EText>
}

export const Title = ({children,style,...rest}) => {
    return <EText style={[tw`text-center text-black font-nunitobold text-1.5xl`,style]} {...rest}>{children}</EText>
}

const Type = {
    Text,
    Title
}

export default Type
