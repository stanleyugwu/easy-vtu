import React, { ReactNode } from "react";
import Text from "./Type";
import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableHighlight,
  View,
  ColorValue,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import BoxShadowView from "./BoxShadowView";
import tw from "../lib/tailwind";
import PropTypes from "prop-types";
import { Ionicons as Icon } from "@expo/vector-icons";
import PressResizerView from "./PressResizerView";

/**
 * @typedef {Object} ButtonProps
 * @property {string} label Button text label
 * @property {string} [leftIconName] Name of icon to show in the **left** side of the button.
 * this prop will be invalid when `leftNode` prop is given
 * @property {string} [rightIconName] Name of icon to show in the **right** side of the button.
 * this prop will be invalid when `rightNode` prop is given.
 * @property {ReactNode} [leftNode] React node to render at the **left** side of the button.
 * This will be rendered instead of `leftIconName`.
 * @property {ReactNode} [rightNode] React node to render at the **right** side of the button.
 * This will be rendered instead of `rightIconName`.
 * @property {Array<ColorValue>} [gradient] An array of at-least two color strings to be used to apply gradient to button.
 * each color represents a stop in the gradient.
 *
 * **Example:** `<Button gradient={['red','blue']} />`
 * @property {ColorValue} [bgColor] Background color of button
 * @property {ColorValue} [labelColor] Text color of label
 * @property {boolean} [disabled] If `true`, disables all interaction with button
 * @property {(event:GestureResponderEvent) => void} onPress Callback to be called when button is pressed
 * @property {ViewStyle} [containerStyle] Style for wrapper `<View/>` component
 * @property {ViewStyle} [touchableStyle] Style for `<TouchableHighlight/>`
 * @property {boolean} [dropShadow] Whether button shadow is shown or not
 */

/**
 * Renders a curved, pressable button
 * @example <Button label={"HELLO CURVY"} />
 * @param {ButtonProps} props
 */
const Button = (props) => {
  // compute element that'll sit left and right to text label
  const left = React.useMemo(
    () =>
      props.leftIconName && !props.leftNode ? (
        <Icon
          name={props.leftIconName}
          size={25}
          color={props.labelColor}
          accessibilityRole="image"
          testID="left icon"
        />
      ) : (
        props.leftNode
      ),
    [props.leftIconName, props.leftNode]
  );
  const right = React.useMemo(
    () =>
      props.rightIconName && !props.rightNode ? (
        <Icon
          name={props.rightIconName}
          size={25}
          color={props.labelColor}
          accessibilityRole="image"
          testID="right icon"
        />
      ) : (
        props.rightNode
      ),
    [props.rightIconName, props.rightNode]
  );

  /**
   *  Padding and margin applied from touchableStyle wont work as expected because they're added to
   * the wrapping `PressResizerView`.
   *
   * Below code will seperate padding and margin styles from other styles in props.touchableStyle.
   * the goal is to apply the margin and padding styles to `LinearGradient` component and others to
   * `TouchableHighlight` wrapper component
   */
  let stringifiedStyles =
    props.touchableStyle && Object.entries(props.touchableStyle).toString(); //stringify styles for easy comparison

  const styles = React.useMemo(() => {
    if (props.touchableStyle && props.touchableStyle instanceof Object) {
      //list of padding and margin style properties
      const spacingStyleNames = [
        "marginRight",
        "paddingRight",
        "marginLeft",
        "paddingLeft",
        "marginHorizontal",
        "paddingHorizontal",
        "marginVertical",
        "paddingVertical",
        "marginStart",
        "paddingStart",
        "marginEnd",
        "paddingEnd",
        "marginTop",
        "paddingTop",
        "marginBottom",
        "paddingBottom",
      ];

      const spacingStyles = {}; //will hold padding and margin styles
      const otherStyles = {}; //will hold other styles

      Object.entries(props.touchableStyle || {}).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];

        if (spacingStyleNames.includes(key)) {
          spacingStyles[key] = value;
        } else {
          otherStyles[key] = value;
        }
      });

      return {
        spacingStyles,
        otherStyles,
      };
    }
    return { spacingStyles: null, otherStyles: null };
  }, [stringifiedStyles]);

  const InnerView = (
    <View
      style={tw`self-center flex-row justify-center items-center`}
      testID={"inner view"}
    >
      {left}
      <Text
        style={tw.style("mx-6 font-sans-semibold", { color: props.labelColor })}
        accessibilityLabel={"button label"}
      >
        {props.label}
      </Text>
      {right}
    </View>
  );

  const Touchable = (
    <TouchableHighlight
      onPress={props.onPress}
      style={tw.style(styles.otherStyles, "rounded-lg")}
      accessibilityRole="button"
      accessibilityLabel="curved button"
      disabled={props.disabled}
    >
      <>
        <LinearGradient
          colors={
            props.gradient ? props.gradient : [props.bgColor, props.bgColor]
          }
          start={{ x: 0.4, y: 0.2 }}
          end={{ x: 1, y: 0.2 }}
          testID={"gradient wrapper"}
          style={tw.style(
            "rounded-lg justify-center w-full",
            { maxHeight: 60, minHeight: 46, height: 55 },
            styles.spacingStyles
          )}
        >
          {InnerView}
        </LinearGradient>
      </>
    </TouchableHighlight>
  );

  //conditionally apply drop shadow
  return (
    <PressResizerView
      containerStyle={tw.style(props.containerStyle, "rounded-lg")}
    >
      {props.dropShadow ? (
        <BoxShadowView containerStyle={tw`rounded-lg`}>
          {Touchable}
        </BoxShadowView>
      ) : (
        Touchable
      )}
    </PressResizerView>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  leftIconName: PropTypes.string,
  rightIconName: PropTypes.string,
  leftNode: PropTypes.node,
  rightNode: PropTypes.node,
  gradient: (props, propName, componentName) => {
    let array = props[propName];
    const error = new Error(`
        invalid gradient prop ${props[propName]} supplied to ${componentName}.
        gradient must be an array of at least two color strings
        `);

    if (array == undefined) return;
    if (!(array instanceof Array)) return error;
    if (array.length < 2 || array.some((color) => typeof color != "string")) {
      return error;
    }
  },
  bgColor: PropTypes.string,
  labelColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  touchableStyle: PropTypes.object,
  dropShadow: PropTypes.bool.isRequired,
};

Button.displayName = "Button";

Button.defaultProps = {
  label: "Click Me",
  disabled: false,
  bgColor: tw.color("primary"),
  labelColor: tw.color("light"),
  dropShadow: true,
};

export default React.memo(Button);
