import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ShadowView = ({children,style,gradient,...rest}) => {
    return (gradient && (gradient instanceof Array)) ? (
        <LinearGradient colors={gradient} start={{x:0.4,y:0.2}} end={{x:1,y:0.2}} style={{...styles.boxShadow,...style}} {...rest}>
            {children}
        </LinearGradient>
    ) : (
        <View style={{...styles.boxShadow,...style}} {...rest}>
            {children}
        </View>
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

export default ShadowView