import React from 'react';
import {Text as EText} from 'react-native';
import tw from '../lib/tailwind';

const Text = ({children,style,...rest}) => {
    return <EText style={tw.style('text-center text-base text-black font-sans',style,)} {...rest}>{children}</EText>
}

const Title = ({children,style,...rest}) => {
    return <EText style={[tw`text-center text-black font-sans-bold text-lg`,style]} {...rest}>{children}</EText>
}

export {Text as default, Title}
