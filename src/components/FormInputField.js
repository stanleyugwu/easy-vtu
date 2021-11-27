import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import IoniconsJson from "@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json";
import Text  from "./Type";
import { Ionicons as Icon,  } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import { TextInput } from "react-native-paper";
import { View, Pressable } from "react-native";
import BoxShadowView from "./BoxShadowView";
import PressResizerView from "./PressResizerView";
import {ViewStyle, TextInputProps, PressableProps} from 'react-native';

/**
 * @typedef {Object} FormInputFieldProp - props for `formInputField`
 * @property {string} [accessibilityLabel] - Custom accessibility label for component wrapper `View`
 * @property {string} fieldLabel - Text label for input field. Should describe expected user's action
 * @property {string} [fieldLabelIcon] - Name of icon to be displayed beside `fieldLabel` as maybe a visual description
 * @property {string} [fieldLabelSubtitle] - Text to be displayed below `fieldLabel` as subtitle
 * @property {("input" | "button")} fieldType - Determines the type of input field to display `<TextInput/>` or `<Pressable/>`
 * 
 * Value should be either **input** for `TextInput` or **button** for `Touchable`
 * @property {(string | number)} fieldValue - Text value to display inside the choosen **fieldType**; `<TextInput/>` or `<Pressable/>`.
 * 
 * Note: the text will be passed as **value** prop to `<TextInput/>`, and a regular text to `<Pressable/>.
 * 
 * @property {function(Event)} onButtonPress - When `fieldType` is **button**, callback to be called when the button is pressed
 * @property {ViewStyle} inputFieldStyle - Style to apply to input field element `<TextInput/>` or `<Pressable/>`
 * @property {(TextInputProps | PressableProps)} extraFieldProps - Extra props for input field element `<TextInput` or `<Pressable/>`
 * @property {number} inputLines - When `fieldType` is **input**, the number of lines the input should have
 * @property {function(string)} onChangetext - When `fieldType` is **input**, callback to be called when <TextInput/> text changes.
    
   Note: callback will be called with the changed text.
   @property {string} placeholder - placeholder for text input
   @property {string} rightInputIcon - Name of `Ionicons` icon to display at the right of the chosen input element
   @property {ReactNode} leftInputNode - React node to render at the left of the chosen input element.
   @property {ReactNode} rightInputNode - React node to render at the right of the chosen input element. This will be used in place of `rihtInputIcon`
 */

/**
 * renders a form field having label text, and either a button or text input
 * 
 * @param {FormInputFieldProp} props 
 */
const FormInputField = (props) => {
  const ComposerWrapper = (props) => (
    <PressResizerView>
      <BoxShadowView containerStyle={tw`rounded-sm`}>{props.children}</BoxShadowView>
    </PressResizerView>
  );

  //pre determine element to be rendered to the right
  let rightElement = null;
  if (props.rightInputNode) {
    rightElement = props.rightInputNode;
  } else if (props.rightInputIcon) {
    rightElement = (
      <Icon name={props.rightInputIcon} size={24} color={tw.color("black")} testID={"right input icon"} />
    );
  }

  return (
    <View
      style={tw`flex-col max-w-md my-2`}
      accessibilityLabel={"form input field wrapper"}
    >
      <View style={tw`flex-row items-center mb-2`} testID={"label wrapper"}>
        <Icon
          accessibilityLabel={"field label icon"}
          name={props.fieldLabelIcon}
          size={20}
          color={tw.color("black")}
        />
        <View style={tw`flex-col ml-2`}>
          <Text accessibilityLabel={"field label"}>{props.fieldLabel}</Text>
          {props.fieldLabelSubtitle ? (
            <Text
              accessibilityLabel={"field label subtitle"}
              style={tw`text-sm text-left`}
            >
              {props.fieldLabelSubtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View>
        {props.fieldType === "input" ? (
          <BoxShadowView containerStyle={tw`rounded-sm`}>
            <TextInput
              multiline={props.inputLines ? true : false}
              numberOfLines={props.inputLines ? props.inputLines : 1}
              onChangeText={props.onChangeText}
              value={props.fieldValue}
              outlineColor={tw.color('white')}
              left={props.leftInputNode}
              placeholder={props.placeholder}
              underlineColor={tw.color('white')}
              underlineColorAndroid={tw.color('white')}
              mode="flat"
              theme={{colors:{error:tw.color('red-700'),primary:tw.color('primary'),text:tw.color('black')}}}

              // passing a node directly to right doesn't work, but TextInput.Affix works.
              // so we render rightElement inside TextInput.Affix. Just that it wont recieve events
              right={rightElement == null ? null : <TextInput.Affix text={rightElement} testID="textinput affix"/>}
              activeUnderlineColor={tw.color('primary')}
              accessibilityLabel={"input field text"}
              selectionColor="#aaa"
              style={tw.style(`h-14 max-h-20 max-w-md border-0 text-black font-semibold bg-white text-base rounded-sm`,props.inputFieldStyle)}
              {...props.extraFieldProps}
            />
          </BoxShadowView>
        ) : (
          <ComposerWrapper>
            <Pressable
              onPress={props.onButtonPress}
              accessibilityLabel={"input field button"}
              style={tw.style(`flex-row justify-between items-center h-14 p-3.5 max-h-20`,props.inputFieldStyle)}
              {...props.extraFieldProps}
            >
              <>
                {props.leftInputNode ? props.leftInputNode : null}
                <Text>{props.fieldValue}</Text>
                {rightElement}
              </>
            </Pressable>
          </ComposerWrapper>
        )}
      </View>
    </View>
  );
};

FormInputField.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  fieldLabelIcon: PropTypes.oneOf(Object.keys(IoniconsJson)),
  fieldLabelSubtitle: PropTypes.string,
  fieldType: PropTypes.oneOf(["input", "button"]).isRequired,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onButtonPress: PropTypes.func,
  inputFieldStyle: PropTypes.object,
  extraFieldProps: PropTypes.object,
  inputLines: PropTypes.number,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  rightInputIcon: PropTypes.oneOf(Object.keys(IoniconsJson)),
  rightInputNode: PropTypes.node,
};

FormInputField.displayName = "FormInputField";
 
FormInputField.defaultProps = {
  fieldLabel: "Input Field",
  fieldType: "input",
  fieldValue: "PRESS ME",
  inputLines: 0,
  leftInputNode:null
};

export default React.memo(FormInputField);
