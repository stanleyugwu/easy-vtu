import React from 'react';
import {TouchableRipple, RadioButton} from 'react-native-paper';
import tw from '../lib/tailwind';
import Text from './Type';
import PropTypes from 'prop-types';

/**
 * @description Renders a pressable button, having a label text, and a radio button 
 * 
 * @param {*} props 
 * @property {Object} buttonStyle style to apply to wrapper button wrapper component
 * @property @callback onPress callback to invoke on wrapper button press
 * @property {Object} restOfProps props to be applied to button wrapper component
 * @property {String} label text to show in selector button
 * @property {Boolean} checked determine whether radio is checked or uncheckes
 * @returns 
 */

const RadioSelectorButton = (props) => {
    return (
        <TouchableRipple
            style={tw.style(
                'flex-row rounded-full items-center justify-between border border-gray-300 w-full p-2 my-2 bg-primary',
                props.buttonStyle
            )}
            onPress={props.onPress}
            {...props.restOfProps}
        >
            <>
                <Text style={tw`font-nunitobold pl-5 text-accent`} accessibilityLabel="button text">
                    {props.label}
                </Text>
                <RadioButton
                value="SELF"
                accessibilityLabel="radio input"
                color={tw.color("accent")}
                uncheckedColor={tw.color('accent')}
                status={props.checked ? 'checked' : 'unchecked'}
                onPress={props.onPress}
                />
            </>
        </TouchableRipple>
    )
}

let pt = PropTypes;
RadioSelectorButton.propTypes = {
    /** style for wrapper button */
    buttonStyle:pt.object,
    /** callback that's called when button is pressed */
    onPress:pt.func,
    /** extra props for wrapper button*/
    restOfProps:pt.object,
    /** label text for the button */
    label:pt.string.isRequired,
    /** Determines whether the radio input for the button is checked or not */
    checked:pt.bool.isRequired
}

RadioSelectorButton.defaultProps = {
    buttonStyle:null,
    restOfProps:{},
    label:"SELECT RADIO",
    checked:false,
}

export default RadioSelectorButton
