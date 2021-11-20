import React from 'react';
import Text from "./Type";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight, View, } from 'react-native';
import BoxShadowView from './BoxShadowView';
import tw from '../lib/tailwind';
import PropTypes from 'prop-types';
import {Ionicons as Icon} from '@expo/vector-icons';
import PressResizerView from './PressResizerView';

/**
 * renders a curved, pressable button
 * @example <CurvedButton label={"HELLO CURVY"} />
 */
const CurvedButton = (props) => {

    // compute element that'll sit left and right to text label
    const left = React.useMemo(() => (props.leftIconName && !props.leftNode) ? (<Icon name={props.leftIconName} size={25} color={props.labelColor} accessibilityRole="image" testID="left icon"/>) : props.leftNode, [props.leftIconName, props.leftNode]);
    const right = React.useMemo(() => (props.rightIconName && !props.rightNode) ? (<Icon name={props.rightIconName} size={25} color={props.labelColor} accessibilityRole="image" testID="right icon"/>) : props.rightNode, [props.rightIconName, props.rightNode]);
    
    /* Padding and margin applied from touchableStyle wont work as expected because they're added to
     * the wrapping `PressResizerView`.
     * 
     * Below code will seperate padding and margin styles from other styles in props.touchableStyle.
     * the goal is to apply the margin and padding styles to `LinearGradient` component and others to 
     * `TouchableHighlight` wrapper component
     */
    let stringifiedStyles = props.touchableStyle && Object.entries(props.touchableStyle).toString();//stringify styles for easy comparison

    const styles = React.useMemo(() => {
        if(props.touchableStyle && props.touchableStyle instanceof Object){
            //list of padding and margin style properties
            const spacingStyleNames = ['marginRight','paddingRight','marginLeft','paddingLeft','marginHorizontal','paddingHorizontal','marginVertical','paddingVertical','marginStart','paddingStart','marginEnd','paddingEnd','marginTop','paddingTop','marginBottom','paddingBottom'];
            
            const spacingStyles = {};//will hold padding and margin styles
            const otherStyles = {};//will hold other styles
    
            Object.entries(props.touchableStyle || {}).forEach(entry => {
                let key = entry[0];
                let value = entry[1];
    
                if(spacingStyleNames.includes(key)){
                    spacingStyles[key] = value;
                }else{
                    otherStyles[key] = value;
                }
            });

            return {
                spacingStyles,
                otherStyles
            }
        }
        return {spacingStyles:null,otherStyles:null}
    }, [stringifiedStyles]);
    
    const InnerView = (
        <View style={tw`self-center flex-row justify-center items-center`} testID={"inner view"}>
            {left}
            <Text style={tw.style('mx-6',{color:props.labelColor})} accessibilityLabel={"button label"}>{props.label}</Text>
            {right}
        </View>
    )

    const Touchable = (
        <TouchableHighlight 
            onPress={props.onPress} 
            style={tw.style(styles.otherStyles,'rounded-3xl')}
            accessibilityRole="button"
            accessibilityLabel="curved button"
            disabled={props.disabled}
        >
            <>
                <LinearGradient 
                    colors={props.gradient ? props.gradient : [props.bgColor,props.bgColor]} 
                    start={{x:0.4,y:0.2}} 
                    end={{x:1,y:0.2}}
                    testID={"gradient wrapper"}
                    style={tw.style('rounded-3xl justify-center w-full',{maxHeight:60,minHeight:46,height:52,},styles.spacingStyles)}
                >
                    {InnerView}
                </LinearGradient>
            </>
        </TouchableHighlight>
    )

    //conditionally apply drop shadow
    return props.dropShadow ? (
        <PressResizerView containerStyle={tw.style(props.containerStyle,'rounded-3xl')}>
            <BoxShadowView containerStyle={tw`rounded-3xl`}>
                {Touchable}
            </BoxShadowView>
        </PressResizerView>
    ) : (
        <PressResizerView containerStyle={tw.style(props.containerStyle,'rounded-3xl')}>
            {Touchable}
        </PressResizerView>
    )
}

CurvedButton.propTypes = {
    /** Button text label */
    label: PropTypes.string.isRequired,

    /** Name of icon to show in the **left** side of the button.
     * this prop will be invalid when `leftNode` prop is given
    */
    leftIconName: PropTypes.string,

    /** Name of icon to show in the **right** side of the button.
     * this prop will be invalid when `rightNode` prop is given
    */
    rightIconName: PropTypes.string,

    /** React node to render at the **left** side of the button.
     *  passing this prop will invalidate `leftIconName` prop
     */
    leftNode: PropTypes.node,

    /** React node to render at the **right** side of the button.
     *  passing this prop will invalidate `rightIconName` prop
     */
    rightNode: PropTypes.node,

    /** 
     * an array of at-least two color strings to be used to apply gradient to button.
     * each color represents a stop in the gradient
     * @example <CurvedButton gradient={['red','blue']} />
    */
    gradient:(props, propName, componentName)=>{
        let array = props[propName];
        const error = new Error(`
        invalid gradient prop ${props[propName]} supplied to ${componentName}.
        gradient must be an array of at least two color strings
        `)

        if(array == undefined) return
        if(!(array instanceof Array)) return error
        if(array.length < 2 || array.some(color => typeof color != 'string')){
            return error
        }
    },

    /** background color of button.
     */
    bgColor: PropTypes.string,

    /** text color of label */
    labelColor: PropTypes.string.isRequired,

    /** if true, disables all interaction with button */
    disabled: PropTypes.bool,

    /** callback to be called when button is pressed */
    onPress: PropTypes.func.isRequired,

    /** style for wrapper `<View/>` component */
    containerStyle: PropTypes.object,

    /** style for `<TouchableHighlight/>` */
    touchableStyle: PropTypes.object,

    /** whether button shadow is shown or not */
    dropShadow: PropTypes.bool.isRequired
}

CurvedButton.displayName = "CurvedButton";

CurvedButton.defaultProps = {
    label: 'Click Me',
    leftIconName: '',
    rightIconName: '',
    leftNode: null,
    rightNode: null,
    gradient:null,
    disabled: false,
    bgColor:tw.color('primary'),
    labelColor:tw.color('accent'),
    onPress: () => null,
    containerStyle: null,
    touchableStyle: null,
    dropShadow: true
}


export default React.memo(CurvedButton)