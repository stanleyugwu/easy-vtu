import React from 'react';
import { IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import tw from '../lib/tailwind';
import PropTypes from 'prop-types';
import PressResizerView from './PressResizerView';

/**
 * renders a circle shaped button with gradient support
 */
const RoundButton = ({onPress,icon,gradient,accessibilityLabel,iconColor,...restOfProps}) => {
    return (
        <PressResizerView>
            <Pressable onPress={onPress} accessibilityLabel={accessibilityLabel}>
                <LinearGradient 
                    colors={gradient} 
                    start={{x:0.4,y:0.2}} end={{x:1,y:0.2}} 
                    style={tw`rounded-full drop-shadow w-16 h-16 justify-center items-center`}
                    testID={"gradient-wrapper"}
                >
                    <IconButton
                        testID={"icon-button"}
                        icon={icon}
                        color={iconColor}
                        animated={true}
                        {...restOfProps}
                    />
                </LinearGradient>
            </Pressable>
        </PressResizerView>
    )
}

RoundButton.propTypes = {
    /** accessibility label for button */
    accessibilityLabel: PropTypes.string,

    /** name of icon to display in button*/
    icon: PropTypes.string.isRequired,
    
    /** 
     * an array of color strings representing stops in the gradient to be applied to button
     * @example <RoundButton gradient={['red','blue']} />
    */
    gradient:(props, propName)=>{
        let array = props[propName]
        if(!(array instanceof Array) || array.length < 2 || array.some(color => typeof color != 'string')){
            return new Error('gradient must be an array of at least two color strings')
        }
    },

    /** button icon color */
    iconColor: PropTypes.string,

    /** callback to be called when button is pressed */
    onPress:PropTypes.func.isRequired,
}

RoundButton.defaultProps = {
    accessibilityLabel: "round button",
    icon:"arrow-right",
    gradient: [tw.color('primary'),tw.color('primary')],
    iconColor: tw.color('accent'),
    onPress: () => null
}



export default React.memo(RoundButton)