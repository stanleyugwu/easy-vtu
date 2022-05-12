import React, { ForwardedRef, ReactNode } from "react";
import Text, { View, ViewProps } from "./Themed";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../lib/tailwind";
import { TextInput } from "react-native-paper";
import {
  Pressable,
  TextInput as _TextInput,
  TextStyle,
  View as _View,
} from "react-native";
import PressResizerView from "./PressResizerView";
import { ViewStyle, PressableProps, GestureResponderEvent } from "react-native";
import appStyles from "../lib/appStyles";

// TYPES
import { IconNames } from "../types";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

export type InputFieldProps = {
  /** Text label for input field. Should describe expected user's action */
  fieldLabel: string;
  /** Determines whether to add red asterik `*` beside `fieldLabel` to denote a required field */
  fieldRequired?: boolean;
  /** Name of icon to be displayed beside `fieldLabel` as maybe a visual description */
  fieldLabelIcon?: IconNames.Ionicon;
  /** Text to be displayed below `fieldLabel` as subtitle */
  fieldLabelSubtitle?: string;
  /** Determines the type of input field to display `<TextInput/>` or `<Pressable/>`
   * Value should be either **input** for `TextInput` or **button** for `Touchable`
   */
  fieldType: "input" | "button";
  /** Text value of choosen **fieldType**, `<TextInput/>` or `<Pressable/>`.
   * This will be the `value` prop for `TextInput` or label text rendered inside `Pressable`
   */
  value?: string;
  /** When `fieldType` is **button**, callback to be called when the button is pressed */
  onButtonPress?: (event: GestureResponderEvent) => void;
  /** Style to apply to `<TextInput/>` element */
  textInputStyle?: TextStyle;
  /** Style to apply to `<Pressable/>` element */
  buttonStyle?: ViewStyle;
  /** Extra props for input field element `<TextInput` */
  extraInputProps?: Partial<TextInputProps>;
  /** Extra props for input field element `<Pressable/>` */
  extraButtonProps?: PressableProps;
  /** When `fieldType` is **input**, number of lines the `<TextInput/>` should have */
  inputLines?: number;
  /** When `fieldType` is **input**, callback to be called when `<TextInput/>` text changes.
   * Note: callback will be called with the changed text as argument.
   */
  onChangeText?: (text: string) => void;
  /** placeholder for `<TextInput/>` */
  placeholder?: string;
  /** Name of `Ionicons` icon to display at the right of the chosen input element */
  rightInputIcon?: IconNames.Ionicon;
  /** React node to render at the right of the chosen input element. This will be used in place of `rihtInputIcon` */
  rightInputNode?: ReactNode;
  /** Name of `Ionicons` icon to display at the left of the chosen input element */
  leftInputIcon?: IconNames.Ionicon;
  /** React node to render at the left of the chosen input element. */
  leftInputNode?: ReactNode;
} & ViewProps;

/**
 * renders a form field having label text, and either a button or text input
 */
const InputField = React.forwardRef(
  (
    {
      fieldLabel = "input field",
      fieldType = "input",
      value = "PRESS ME",
      buttonStyle,
      extraButtonProps,
      extraInputProps,
      fieldLabelIcon,
      fieldRequired = true,
      style,
      accessibilityLabel = "form input field wrapper",
      fieldLabelSubtitle,
      inputLines,
      leftInputIcon,
      leftInputNode,
      onButtonPress,
      onChangeText,
      placeholder,
      rightInputIcon,
      rightInputNode,
      textInputStyle,
      children,
      ...otherProps
    }: InputFieldProps,
    ref: ForwardedRef<_View>
  ) => {
    /** pre-determined element to render left to input field */
    let leftElement: ReactNode;

    if (leftInputNode && React.isValidElement(leftInputNode)) {
      if (typeof leftInputNode === "string") {
        leftElement = (
          <Text accessibilityLabel="input field left text">
            {leftInputNode}
          </Text>
        );
      } else leftElement = leftInputNode;
    } else if (leftInputIcon) {
      leftElement = (
        <Icon
          name={leftInputIcon}
          size={24}
          color={tw.color("gray")}
          testID={"right input icon"}
        />
      );
    }

    /** pre-determined element to render right to input field */
    let rightElement: ReactNode;
    if (rightInputNode && React.isValidElement(rightInputNode)) {
      if (typeof rightInputNode === "string") {
        rightElement = (
          <Text accessibilityLabel="input field right text">
            {rightInputNode}
          </Text>
        );
      } else rightElement = rightInputNode;
    } else if (rightInputIcon) {
      rightElement = (
        <Icon
          name={rightInputIcon}
          size={24}
          color={tw.color("black")}
          testID={"right input icon"}
        />
      );
    }

    /** input field button */
    const Button = React.useMemo(
      () => (
        <PressResizerView style={tw`mt-3 bg-transparent`}>
          <Pressable
            onPress={onButtonPress}
            accessibilityLabel={"button input field"}
            style={[
              tw.style(
                `flex-row border-b border-primary justify-between items-center h-12 p-1 max-h-14`
              ),
              buttonStyle,
            ]}
            ref={ref}
            {...extraButtonProps}
          >
            <>
              <View style={tw`flex-row items-center justify-between bg-transparent`}>
                <View accessibilityLabel="button-input-field left element" style={{backgroundColor:'transparent'}}>
                  {leftElement}
                </View>
                <Text
                  style={tw`pl-3`}
                  accessibilityLabel="button-input-field value"
                >
                  {value}
                </Text>
              </View>
              <View accessibilityLabel="button-input-field right element" style={{backgroundColor:'transparent'}}>
                {rightElement}
              </View>
            </>
          </Pressable>
        </PressResizerView>
      ),
      [
        onButtonPress,
        buttonStyle,
        extraButtonProps,
        value,
        leftElement,
        rightElement,
      ]
    );

    /** input field TextInput */
    const textInput = (
      <View
        style={tw`pl-1.5 border-b border-primary bg-transparent mt-2 items-center flex-row`}
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
          autoCompleteType="off"
          multiline={inputLines ? true : false}
          onChangeText={onChangeText}
          value={value}
          outlineColor={tw.color("surface")}
          placeholder={placeholder}
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          mode="flat"
          ref={ref as ForwardedRef<_TextInput>}
          theme={{
            colors: {
              error: tw.color("error"),
              primary: tw.color("primary"),
              text: tw.color("on-background"),
              surface: tw.color("surface"),
              onSurface: tw.color("on-surface"),
            },
          }}
          accessibilityLabel="text input field"
          selectionColor="#aaa"
          style={tw.style(
            ["h-10 max-h-12 max-w-md border-0 bg-white text-base font-sans"],
            { flex: 1, paddingVertical: 7, paddingHorizontal: 6 },
            textInputStyle
          )}
          {...extraInputProps}
        />

        {rightElement ? (
          <View
            style={{
              backgroundColor: "transparent",
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
      <View
        style={tw.style(
          ["max-w-md my-2 p-3.5 rounded-lg bg-surface"],
          appStyles.boxShadowSmall,
          style
        )}
        accessibilityLabel={accessibilityLabel}
        {...otherProps}
      >
        <View
          style={tw`flex-row items-center mb-1.5 bg-transparent`}
          testID={"label wrapper"}
        >
          <Icon
            accessibilityLabel={"field label icon"}
            name={fieldLabelIcon}
            size={16}
            color="#666"
          />
          <View style={tw`flex-col ml-2 items-start bg-transparent`}>
            <Text
              accessibilityLabel={"field label"}
              style={{ fontWeight: "700", color: "#666", fontSize: 14 }}
            >
              {fieldLabel}
              {fieldRequired ? <Text style={tw`text-red-400`}> *</Text> : null}
            </Text>
            {fieldLabelSubtitle ? (
              <Text
                accessibilityLabel={"field label subtitle"}
                style={tw`text-sm`}
              >
                {fieldLabelSubtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={tw`px-1 bg-transparent`}
          accessibilityLabel="input field wrapper"
        >
          {children ? children : fieldType === "input" ? textInput : Button}
        </View>
      </View>
    );
  }
);

export default React.memo(InputField);
