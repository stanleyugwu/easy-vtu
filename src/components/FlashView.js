import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import ShadowView from './ShadowView';
import tw from '../lib/tailwind';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Boolean} animate prop to enable or disable animation 
 * @param {Number} delay number of milliseconds to delay animation
 * @param {Number} bounciness bounciness of element when animating
 * @param {Object} containerStyle style objct for Animated.View component
 * @param {Object} containerProps props object to apply to Animated.View
 * @returns
 */
const FlashView = (props) => {

    //store animated value
    const flasAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        return props.animate && Animated.spring(
            flasAnim,
            {
                toValue:1,
                useNativeDriver:true,
                delay:props.delay,
                bounciness:props.bounciness,
                speed:20
            }
        ).start()
    }, [flasAnim])

    return (
        <ShadowView
            style={
                tw.style(
                    'rounded-lg w-5/12 p-0 max-w-xs bg-white my-3',
                    props.containerStyle
                )
            }
        >
            <Animated.View 
                style={{transform:[{scale:flasAnim}]}}
                {...props.containerProps}
            >
                {props.children}
            </Animated.View>
        </ShadowView>
    )
}

FlashView.defaultProps = {
    animate:true,
    delay:20,
    bounciness:20,
    containerStyle:null,
    containerProps:null
}

FlashView.PropTypes = {
    animate:PropTypes.bool,
    delay:PropTypes.number,
    bounciness:PropTypes.number,
    containerStyle:PropTypes.object,
    containerProps:PropTypes.object
}

export default FlashView