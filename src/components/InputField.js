import React from 'react';
import {View} from 'react-native';
import { Text } from './Type';
import tw from '../lib/tailwind';
import { TextInput, TouchableRipple } from 'react-native-paper';
import {Ionicons as Icon} from '@expo/vector-icons';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @property {Object} props.containerStyle component wrapper element style
 * @property {String} props.accessibilityLabel A11Y label for wrapper element
 * @property {Object} props.containerProps component wrapper element props
 * @property {String} props.fieldTitle title label to show as input field label
 * @property {String} props.fieldSubTitle sub title to show under fieldTitle 
 * @property {Boolean} props.renderInput determines whether to render TextInput or Touchable
 * @property {Object} props.textInputStyle style to apply to TextInput
 * @property {Object} props.textInputProps extra props for TextInput 
 * @property @callback props.onTextInputChange callback to invoke with text value as argument, when TextInput value changes 
 * 
 * @property {Object} props.btnStyle style for input field wrapper button
 * @property @callback props.onBtnPress callback to invoke when input field wrapper button is presses
 * @property @function props.leftItem a function that'll be called to return a React Node to be rendered left of wrapper button
 * @property {String} props.btnLabel text to show inside wrapper button
 * @property {String} props.rightIconName name of icon to be rendered at the right of wrapper button
 * @returns 
 */

/**
 * formats words or sentence to title case
 * @param {String} str 
 * @returns titlecased version of the supplied string or sentence
 */
const titleCase = (str = "") => {
    return str.split(' ')
        .map(word => word[0].toUpperCase()+word.substr(1)
        .toLowerCase())
        .join(' ');
}

const InputField = React.forwardRef((props,ref) => {

    return (
        <View 
            style={tw.style('border-l-2 border-primary pl-2 p-2 pr-0 mt-8',props.containerStyle)}
            accessibilityLabel={props.accessibilityLabel}
            {...props.containerProps}
        >
            <Text style={tw`text-left font-nunitobold text-black mb-1.5`}>
                {props.fieldTitle}
            </Text>
            
           {
               props.fieldSubTitle 
               ? (
                    <Text style={tw`text-sm text-left text-gray-lighter pb-1`}>
                        {titleCase(props.fieldSubTitle)}
                    </Text>
               ) 
               : null
           }

            {
                props.renderInput ? 
                (
                    <TextInput
                        ref={ref}
                        mode="outlined"
                        style={tw.style('bg-blue-50',props.textInputStyle)}
                        outlineColor={tw.color("gray-400")}
                        onChangeText={(v) => props.onTextInputChange(v)}
                        {...props.textInputProps}
                    />
                ) : 
                (
                    <TouchableRipple
                        rippleColor="#000e"
                        centered={false}
                        ref={ref}
                        accessibilityLabel={props.accessibilityLabel+" button"}
                        style={tw.style('rounded-md bg-blue-50 flex-row w-full py-3 px-2.5 justify-between items-center border border-gray-400 mt-1',props.btnStyle)}
                        onPress={props.onBtnPress}
                    >
                        <>
                            {props.leftItem()}
                            <Text style={tw`font-nunitobold text-base text-gray-600`}>
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
});

InputField.propTypes = {
    /** style for component `View` wrapper */
    containerStyle:PropTypes.object,
    /** accessibility label for `View` wrapper element */
    accessibilityLabel:PropTypes.string.isRequired,
    /** props for component `View` wrapper */
    containerProps:PropTypes.object,
    /** title label to show as input field label */
    fieldTitle:PropTypes.string.isRequired,
    /** sub title to show under fieldTitle */
    fieldSubTitle:PropTypes.string,
    /** determines whether to render TextInput or Touchable */
    renderInput:PropTypes.bool.isRequired,
    /** style to apply to TextInput */
    textInputStyle:PropTypes.object,
    /** props for TextInput */
    textInputProps:PropTypes.object,
    /** callback to invoke with text value as argument, when TextInput value changes */
    onTextInputChange:PropTypes.func.isRequired,
    /** style for input field wrapper button */
    btnStyle:PropTypes.object,
    /** callback to invoke when input field wrapper button is presses */
    onBtnPress:PropTypes.func,
    /** a function that returns a React Node to be rendered left of wrapper button */
    leftItem:PropTypes.func,
    /** text to show inside wrapper button */
    btnLabel:PropTypes.string,
    /** name of icon to be rendered at the right of wrapper button */
    rightIconName:PropTypes.oneOfType([PropTypes.bool,PropTypes.string])
}

const defaultFn = () => null

InputField.defaultProps = {
    accessibilityLabel:"input field wrapper",
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