import React from 'react';
import {View} from 'react-native';
import { Text } from './Type';
import tw from '../lib/tailwind';
import { TextInput, TouchableRipple } from 'react-native-paper';
import {Ionicons as Icon} from '@expo/vector-icons';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} containerStyle component wrapper element style
 * @param {Object} containerProps component wrapper element props
 * @param {String} fieldTitle title label to show as input field label
 * @param {String} fieldSubTitle sub title to show under fieldTitle 
 * @param {Boolean} renderInput determines whether to render TextInput or Touchable
 * @param {Object} textInputRef ref object to assign TextInput ref to
 * @param {Object} textInputStyle style to apply to TextInput
 * @param {Object} textInputProps extra props for TextInput 
 * @param @callback onTextInputChange callback to invoke with text value as argument, when TextInput value changes 
 * 
 * @param {Object} btnStyle style for input field wrapper button
 * @param @callback onBtnPress callback to invoke when input field wrapper button is presses
 * @param @function leftItem a function that'll be called to return a React Node to be rendered left of wrapper button
 * @param {String} btnLabel text to show inside wrapper button
 * @param {String} rightIconName name of icon to be rendered at the right of wrapper button
 * @returns 
 */
const InputField = (props) => {

    return (
        <View 
            style={tw.style('border-l-2 border-primary pl-2 p-2 pr-0 mt-8',props.containerStyle)}
            {...props.containerProps}
        >
            <Text style={tw`text-left font-nunitobold text-black mb-1.5`}>
                {props.fieldTitle}
            </Text>
            
            <Text style={tw`text-sm text-left text-gray-lighter pb-1`}>
                {props.fieldSubTitle}
            </Text>

            {
                props.renderInput ? 
                (
                    <TextInput
                        ref={props.textInputRef}
                        mode="outlined"
                        style={tw.style('bg-gray-light',props.textInputStyle)}
                        outlineColor={tw.color("gray-lighter")}
                        onChangeText={(v) => props.onTextInputChange(v)}
                        {...props.textInputProps}
                    />
                ) : 
                (
                    <TouchableRipple
                        rippleColor="#000e"
                        centered={false}
                        style={tw.style('bg-gray-light flex-row w-full py-3 px-2.5 justify-between items-center border border-gray-400 mt-1',props.btnStyle)}
                        onPress={props.onBtnPress}
                    >
                        <>
                            {props.leftItem()}
                            <Text style={tw`font-nunitobold text-base`}>
                                {props.btnLabel}
                            </Text>
                            
                            {
                                props.rightIconName ? (
                                    <Icon
                                        name={props.rightIconName}
                                        size={20}
                                        style={tw`justify-end`}
                                    />
                                ) : null
                            }
                        </>
                    </TouchableRipple>
                )
            }
        </View>
    )
}

InputField.propTypes = {
    containerStyle:PropTypes.object,
    containerProps:PropTypes.object,
    fieldTitle:PropTypes.string.isRequired,
    fieldSubTitle:PropTypes.string,
    renderInput:PropTypes.bool.isRequired,
    textInputRef:PropTypes.exact({
        current:PropTypes.any
    }),
    textInputStyle:PropTypes.object,
    textInputProps:PropTypes.object,
    onTextInputChange:PropTypes.func.isRequired,
    btnStyle:PropTypes.object,
    onBtnPress:PropTypes.func,
    leftItem:PropTypes.func,
    btnLabel:PropTypes.string,
    rightIconName:PropTypes.oneOfType([Boolean,String])
}

const defaultFn = () => null

InputField.defaultProps = {
    containerStyle:null,
    containerProps:{},
    fieldTitle:"NONE",
    renderInput:true,
    textInputProps:{},
    onTextInputChange:defaultFn,
    onBtnPress:defaultFn,
    leftItem:defaultFn,
    btnLabel:"Button",
    rightIconName:false
}

export default InputField