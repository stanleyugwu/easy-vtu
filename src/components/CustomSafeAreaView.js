import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../lib/tailwind";

export default ({children,containerStyle,...rest}) => (
    <SafeAreaView style={tw.style('bg-white h-full',{...containerStyle})} {...rest}>
        {children}
    </SafeAreaView>
)