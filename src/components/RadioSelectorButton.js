import React from 'react';
import {TouchableRipple, RadioButton} from 'react-native-paper';
import tw from '../lib/tailwind';
import {Text} from './Type';
import PropTypes from 'prop-types';

/**
 * @description Renders a pressable button, having a label text, and a radio button 
 * 
 * @param {*} props 
 * @param {Object} buttonStyle style to apply to wrapper button wrapper component
 * @param @callback onPress callback to invoke on wrapper button press
 * @param {Object} restOfProps props to be applied to button wrapper component
 * @param {String} label text to show in selector button
 * @param {Boolean} checked determine whether radio is checked or uncheckes
 * @returns 
 */

const RadioSelectorButton = (props) => {
    return (
        <TouchableRipple
            style={tw.style(
                'flex-row items-center justify-between border border-gray-300 w-full p-2 my-2',
                props.buttonStyle
            )}
            onPress={props.onPress}
            {...props.restOfProps}
        >
            <>
                <Text style={tw`font-nunitobold pl-5`}>
                    {props.label}
                </Text>
                <RadioButton
                value="SELF"
                status={props.checked ? 'checked' : 'unchecked'}
                onPress={props.onPress}
                />
            </>
        </TouchableRipple>
    )
}

let pt = PropTypes;
RadioSelectorButton.propTypes = {
    buttonStyle:pt.object,
    onPress:pt.func,
    restOfProps:pt.object,
    label:pt.string.isRequired,
    checked:pt.bool.isRequired
}

RadioSelectorButton.defaultProps = {
    buttonStyle:null,
    restOfProps:{},
    label:"SELECT RADIO",
    checked:false,
}

export default RadioSelectorButton
