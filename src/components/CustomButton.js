import React from 'react';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity, View,} from 'react-native';
import tw from '../lib/tailwind';

const CustomButton = (props) => {
    const {
        text,
        onPress,
        viewProps,
        left,
        shadow = true,
        right,
        containerProps,
        gradients = [tw.color('primary'),tw.color('primary')],
        ...rest
    } = props;

    return (
        <TouchableOpacity onPress={onPress} {...containerProps} {...rest}>
            <LinearGradient colors={gradients} start={{x:0.4,y:0.2}} end={{x:1,y:0.2}} style={tw.style('rounded-3xl p-2',shadow ? styles.boxShadow : null)}>
                <View 
                    style={tw`p-2 mx-auto`}
                    children={
                        props.children ? 
                        props.children : 
                        <View style={tw`flex-row justify-center content-center items-center`}>
                            {left && left}
                            <Text style={tw`text-accent text-btn font-nunitobold uppercase ${left && 'ml-2'} ${right && 'mr-2'}`}>{text}</Text>
                            {right && right}
                        </View>
                    }
                    {...viewProps}
                />
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boxShadow: Platform.OS == 'ios' ? {
        shadowColor: '#171717',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    } : {
        elevation:5,
        shadowColor:'#52006a'
    }
})

/**
 * OLD BUTTON
 */
// const CustomButton = ({text,onPress,buttonStyle,textStyle,children,...rest}) => {
//     return (
//         <TouchableOpacity onPress={onPress} {...rest}>
//             <LinearGradient 
//                 colors={['#037d2e',tw.color('primary')]} 
//                 start={{x:0.4,y:0.2}} end={{x:1,y:0.2}} 
//                 style={tw`rounded-3xl p-1`}
//             >
//                 <Button mode="text" style={buttonStyle}>
//                     {
//                         children ? children : <Text style={tw.style('text-white font-nunitobold',{...textStyle})}>{text}</Text>
//                     }
//                 </Button>
//             </LinearGradient>
//         </TouchableOpacity>
//     )
// }

export default CustomButton