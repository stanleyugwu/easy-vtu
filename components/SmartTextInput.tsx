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
import Layout from "../constants/Layout";

export type SmartTextInputProps = {
  /** Text label for input field. Should describe expected user's action */
  fieldLabel?: string;
  /** Determines the type of input field to display `<TextInput/>` or `<Pressable/>`
   * Value should be either **input** for `TextInput` or **button** for `Touchable`
   */
  fieldType?: "input" | "button";
  /**
   * Determines wehether input field is disabled
   */
  disabled?: boolean;
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
  /**
   * Whether to show red border indicating field error
   */
  error?: boolean;
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
  /** Function to be called when right input icon is pressed */
  onRightInputIconPress?: (evt: GestureResponderEvent) => void;
  /** React node to render at the right of the chosen input element. This will be used in place of `rihtInputIcon` */
  rightInputNode?: ReactNode;
  /** Name of `Ionicons` icon to display at the left of the chosen input element */
  leftInputIcon?: IconNames.Ionicon;
  /** Function to be called when left input icon is pressed */
  onlLeftInputIconPress?: (evt: GestureResponderEvent) => void;
  /** React node to render at the left of the chosen input element. */
  leftInputNode?: ReactNode;
  /**
   * function to be called when the text node at the left of input field is pressed.
   * The text node houses text passed as leftInputNode
   */
  onLeftInputTextNodePress?: (evt: GestureResponderEvent) => void;
  /**
   * function to be called when the text node at the right of input field is pressed.
   * The text node houses text passed as rightInputNode
   */
  onRightInputTextNodePress?: (evt: GestureResponderEvent) => void;
} & ViewProps;

/**
 * Smart TextInput or Button component
 * renders a form field having label text, and either a button or text input
 */
const SmartTextInput = React.forwardRef(
  (
    {
      fieldLabel,
      fieldType = "input",
      value = "PRESS ME",
      buttonStyle,
      disabled = false,
      onlLeftInputIconPress,
      onRightInputIconPress,
      error = false,
      extraButtonProps,
      extraInputProps,
      style,
      accessibilityLabel = "form input field wrapper",
      inputLines,
      leftInputIcon,
      onLeftInputTextNodePress,
      onRightInputTextNodePress,
      leftInputNode,
      onButtonPress,
      onChangeText,
      placeholder,
      rightInputIcon,
      rightInputNode,
      textInputStyle,
      children,
      ...otherProps
    }: SmartTextInputProps,
    ref: ForwardedRef<_View>
  ) => {
    /** pre-determined element to render left to input field */
    let leftElement: ReactNode;

    if (
      leftInputNode &&
      (React.isValidElement(leftInputNode) || typeof leftInputNode === "string")
    ) {
      if (typeof leftInputNode === "string") {
        leftElement = (
          <Text
            type="subTitle2"
            onPress={onLeftInputTextNodePress}
            style={tw`text-secondary-dark absolute w-24 bottom-3 text-right`}
            accessibilityLabel="input field left text"
          >
            {leftInputNode}
          </Text>
        );
      } else leftElement = leftInputNode;
    } else if (leftInputIcon) {
      leftElement = (
        <View
          style={tw.style(`flex-1 justify-center items-center rounded-md`, {
            backgroundColor: "#eee9",
            borderWidth: 0.5,
            borderColor: error ? tw.color("error") : "#ccc",
          })}
        >
          <Icon
            name={leftInputIcon}
            size={22}
            onPress={onlLeftInputIconPress}
            style={tw`m-1.5 w-full`}
            color={tw.color("blue-400")}
            testID={"right input icon"}
          />
        </View>
      );
    }

    /** pre-determined element to render right to input field */
    let rightElement: ReactNode;
    if (
      rightInputNode &&
      (React.isValidElement(rightInputNode) ||
        typeof rightInputNode === "string")
    ) {
      if (typeof rightInputNode === "string") {
        rightElement = (
          <Text
            type="subTitle2"
            onPress={onRightInputTextNodePress}
            style={tw`absolute text-secondary-dark w-24 bottom-3 text-right`}
            accessibilityLabel="input field right text"
          >
            {rightInputNode}
          </Text>
        );
      } else rightElement = rightInputNode;
    } else if (rightInputIcon) {
      rightElement = (
        <View
          style={tw.style(`justify-center items-center rounded-md`, {
            backgroundColor: "#eee9",
            borderWidth: 0.5,
            borderColor: "#ccc",
          })}
        >
          <Icon
            name={rightInputIcon}
            size={23}
            color={tw.color("blue-400")}
            onPress={onRightInputIconPress}
            style={tw`m-1.5 w-full`}
            testID={"right input icon"}
          />
        </View>
      );
    }

    /** input field button */
    const Button = React.useMemo(
      () => (
        <PressResizerView style={tw`bg-transparent`}>
          <Pressable
            disabled={disabled}
            onPress={onButtonPress}
            accessibilityLabel={"button input field"}
            style={[
              tw.style(`flex-row justify-start items-center`),
              buttonStyle,
            ]}
            ref={ref}
            {...extraButtonProps}
          >
            <>
              <View
                style={tw`flex-row items-center justify-center bg-transparent`}
              >
                <Text accessibilityLabel="button-input-field value">
                  {value}
                </Text>
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
        style={tw.style(`w-full bg-transparent items-center flex-row`, {
          zIndex: -9999,
        })}
      >
        <TextInput
          autoCompleteType="off"
          disabled={disabled}
          multiline={inputLines ? true : false}
          onChangeText={onChangeText}
          numberOfLines={inputLines}
          value={value}
          error={false}
          disableFullscreenUI
          placeholderTextColor={"#aaa"}
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
          selectionColor="#999"
          style={tw.style(
            !!!inputLines && "h-8 max-h-12",
            ["w-full border-0 bg-transparent font-sans"],
            { flex: 1, paddingVertical: 2, paddingHorizontal: 2 },
            textInputStyle
          )}
          {...extraInputProps}
        />
      </View>
    );

    return (
      <View
        style={tw.style(
          Layout.window.width > 780 ? "p-4" : "p-3",
          "mt-2 w-full self-center flex-row rounded-lg bg-surface",
          error && "border border-error",
          appStyles.boxShadowSmall,
          style
        )}
        accessibilityLabel={accessibilityLabel}
        {...otherProps}
      >
        <View style={tw`flex-row flex-1 justify-between bg-transparent`}>
          {leftElement ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                flex: 0.15,
                marginRight: 10,
              }}
              accessibilityLabel="text-input-field left element"
            >
              {leftElement}
            </View>
          ) : null}
          <View
            style={tw.style(
              `flex-1 bg-transparent justify-center`,
              !fieldLabel && "pt-1.5",
              fieldType == "button" && "p-1.5",
              fieldType == "input" &&
                !disabled && {
                  borderBottomWidth: 0.8,
                  borderBottomColor: tw.color("gray"),
                }
            )}
          >
            {fieldLabel ? (
              <View style={tw`flex-col items-start bg-transparent mb-2`}>
                <Text
                  type="subTitle2"
                  accessibilityLabel={"field label"}
                  style={{
                    color: error ? tw.color("error") : "#777",
                    fontWeight: "700",
                    letterSpacing: 0.5,
                  }}
                >
                  {fieldLabel}
                </Text>
              </View>
            ) : null}
            {children ? children : fieldType === "input" ? textInput : Button}
          </View>
          {rightElement ? (
            <View
              style={{
                backgroundColor: "transparent",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginLeft: 10,
                paddingBottom: fieldType == "input" && fieldLabel ? 8 : 0,
                flex: 0.15,
                zIndex: 99999,
              }}
              accessibilityLabel="text-input-field right element"
            >
              {rightElement}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
);

export default React.memo(SmartTextInput);
