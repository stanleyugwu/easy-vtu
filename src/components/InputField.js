import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import IoniconsJson from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json";
import Text from "./Type";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import { TextInput } from "react-native-paper";
import { View, Pressable } from "react-native";
import BoxShadowView from "./BoxShadowView";
import PressResizerView from "./PressResizerView";
import {
  ViewStyle,
  TextInputProps,
  PressableProps,
  GestureResponderEvent,
} from "react-native";


/**
 * @typedef {Object} InputFieldProp - props for `formInputField`
 * @property {string} [accessibilityLabel] - Custom accessibility label for component wrapper `View`
 * @property {ViewStyle} [containerStyle] - Style for component wrapper
 * @property {string} fieldLabel - Text label for input field. Should describe expected user's action
 * @property {boolean} fieldRequired - Determines whether to add red asterik `*` beside `fieldLabel` to denote a required field
 * @property {string} [fieldLabelIcon] - Name of icon to be displayed beside `fieldLabel` as maybe a visual description
 * @property {string} [fieldLabelSubtitle] - Text to be displayed below `fieldLabel` as subtitle
 * @property {("input" | "button")} fieldType - Determines the type of input field to display `<TextInput/>` or `<Pressable/>`
 * 
 * Value should be either **input** for `TextInput` or **button** for `Touchable`
 * @property {(string | number)} value - Text value of choosen **fieldType**, `<TextInput/>` or `<Pressable/>`.
 * 
 * This will be the `value` prop for `TextInput` or label text rendered inside `Pressable`.
 *
 * @property {(event:GestureResponderEvent) => void} [onButtonPress] - When `fieldType` is **button**, callback to be called when the button is pressed
 * @property {ViewStyle} [inputFieldStyle] - Style to apply to `<TextInput/>` element
 * @property {ViewStyle} [buttonStyle] - Style to apply to `<Pressable/>` element
 * @property {TextInputProps} [extraInputProps] - Extra props for input field element `<TextInput`
 * @property {PressableProps} [extraButtonProps] - Extra props for input field element `<Pressable/>`
 * @property {number} [inputLines] - When `fieldType` is **input**, number of lines the `<TextInput/>` should have
 * @property {(text:string) => void} [onChangeText] - When `fieldType` is **input**, callback to be called when `<TextInput/>` text changes.
    
   Note: callback will be called with the changed text as argument.
   @property {string} [placeholder] - placeholder for `<TextInput/>`
   @property {string} [rightInputIcon] - Name of `Ionicons` icon to display at the right of the chosen input element
   @property {ReactNode} rightInputNode - React node to render at the right of the chosen input element. This will be used in place of `rihtInputIcon`
   @property {string} leftInputIcon - Name of `Ionicons` icon to display at the left of the chosen input element
   @property {ReactNode} leftInputNode - React node to render at the left of the chosen input element.

 */
/**
 * renders a form field having label text, and either a button or text input
 */
const InputField = React.forwardRef(
  (/** @type {InputFieldProp} */ props, ref) => {
    /** @type {(ReactNode| string)} pre-determined element to render left to input field */
    let leftElement = null;
    if (props.leftInputNode) {
      if (typeof props.leftInputNode === "string") {
        leftElement = (
          <Text accessibilityLabel="input field left text">
            {props.leftInputNode}
          </Text>
        );
      } else leftElement = props.leftInputNode;
    } else if (props.leftInputIcon) {
      leftElement = (
        <Icon
          name={props.leftInputIcon}
          size={24}
          color={tw.color("gray-lighter")}
          testID={"right input icon"}
        />
      );
    }

    /** @type {(ReactNode| string)} pre-determined element to render right to input field */
    let rightElement = null;
    if (props.rightInputNode) {
      if (typeof props.rightInputNode === "string") {
        rightElement = (
          <Text accessibilityLabel="input field right text">
            {props.rightInputNode}
          </Text>
        );
      } else rightElement = props.rightInputNode;
    } else if (props.rightInputIcon) {
      rightElement = (
        <Icon
          name={props.rightInputIcon}
          size={24}
          color={tw.color("black")}
          testID={"right input icon"}
        />
      );
    }
    /** input field button */
    const Button = React.useMemo(
      () => (
        <PressResizerView containerStyle={tw`mt-3`}>
          <Pressable
            onPress={props.onButtonPress}
            accessibilityLabel={"button input field"}
            style={tw.style(
              `flex-row border-b border-primary justify-between items-center h-12 p-1 max-h-14`,
              props.buttonStyle
            )}
            ref={ref}
            {...props.extraButtonProps}
          >
            <>
              <View style={tw`flex-row items-center justify-between`}>
                <View accessibilityLabel="button-input-field left element">
                  {leftElement}
                </View>
                <Text
                  style={tw`pl-3`}
                  accessibilityLabel="button-input-field value"
                >
                  {props.value}
                </Text>
              </View>
              <View accessibilityLabel="button-input-field right element">
                {rightElement}
              </View>
            </>
          </Pressable>
        </PressResizerView>
      ),
      [
        props.onButtonPress,
        props.buttonStyle,
        props.extraButtonProps,
        props.value,
        leftElement,
        rightElement,
      ]
    );

    /** input field TextInput */
    const textInput = (
      <View
        style={tw`pl-1.5 border-b border-primary mt-2 items-center flex-row`}
      >
        {leftElement ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 5,
            }}
            accessibilityLabel="text-input-field left element"
          >
            {leftElement}
          </View>
        ) : null}
        <TextInput
          multiline={props.inputLines ? true : false}
          numberOfLines={props.inputLines ? props.inputLines : 1}
          onChangeText={props.onChangeText}
          value={props.value}
          outlineColor={tw.color("white")}
          placeholder={props.placeholder}
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          mode="flat"
          ref={ref}
          theme={{
            colors: {
              error: tw.color("red-700"),
              primary: "transparent",
              text: tw.color("black"),
            },
          }}
          activeUnderlineColor={tw.color("primary")}
          accessibilityLabel={"text input field"}
          selectionColor="#aaa"
          style={tw.style(
            `h-10 max-h-12 max-w-md border-0 bg-white text-base font-sans`,
            { flex: 1, paddingVertical: 7, paddingHorizontal: 6 },
            props.inputFieldStyle
          )}
          {...props.extraInputProps}
        />
        {rightElement ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 5,
            }}
            accessibilityLabel="text-input-field right element"
          >
            {rightElement}
          </View>
        ) : null}
      </View>
    );

    return (
      <BoxShadowView
        containerStyle={tw.style(`max-w-md my-2 p-4 rounded-lg`,props.containerStyle)}
        accessibilityLabel={props.accessibilityLabel}
      >
        <View style={tw`flex-row items-center mb-1.5`} testID={"label wrapper"}>
          <Icon
            accessibilityLabel={"field label icon"}
            name={props.fieldLabelIcon}
            size={16}
            color="#666"
          />
          <View style={tw`flex-col ml-2 items-start`}>
            <Text accessibilityLabel={"field label"} style={{fontWeight:"700",color:'#666',fontSize:14}}>
              {props.fieldLabel}
              {props.fieldRequired ? (
                <Text style={tw`text-red-400`}> *</Text>
              ) : null}
            </Text>
            {props.fieldLabelSubtitle ? (
              <Text
                accessibilityLabel={"field label subtitle"}
                style={tw`text-sm`}
              >
                {props.fieldLabelSubtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={tw`px-1`} accessibilityLabel="input field wrapper">
          {props.children
            ? props.children
            : props.fieldType === "input"
            ? textInput
            : Button}
        </View>
      </BoxShadowView>
    );
  }
);
<InputField fieldLabe />;

InputField.propTypes = {
  accessibilityLabel: PropTypes.string,
  containerStyle: PropTypes.object,
  fieldLabel: PropTypes.string.isRequired,
  fieldRequired: PropTypes.bool.isRequired,
  fieldLabelIcon: PropTypes.oneOf(Object.keys(IoniconsJson)),
  fieldLabelSubtitle: PropTypes.string,
  fieldType: PropTypes.oneOf(["input", "button"]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  inputFieldStyle: PropTypes.object,
  buttonStyle: PropTypes.object,

  onButtonPress: PropTypes.func,

  extraInputProps: PropTypes.object,
  extraButtonProps: PropTypes.object,

  inputLines: PropTypes.number,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,

  rightInputIcon: PropTypes.oneOf(Object.keys(IoniconsJson)),
  rightInputNode: PropTypes.node,

  leftInputIcon: PropTypes.oneOf(Object.keys(IoniconsJson)),
  leftInputNode: PropTypes.node,
};

InputField.displayName = "InputField";

InputField.defaultProps = {
  accessibilityLabel: "form input field wrapper",
  fieldLabel: "Input Field",
  fieldRequired: true,
  fieldType: "input",
  fieldValue: "PRESS ME",
  inputLines: 0,
  leftInputNode: null,
};

export default React.memo(InputField);
