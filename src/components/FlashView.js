import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import tw from '../lib/tailwind';
import PropTypes from 'prop-types';

/**
 * adds flash animation effect to its children
 * @param {Boolean} animate prop to enable or disable animation 
 * @param {Number} delay number of milliseconds to delay animation
 * @param {Number} bounciness bounciness of element when animating
 * @param {Object} containerStyle style objct for Animated.View component
 */
const FlashView = React.forwardRef((props,ref) => {

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
        <Animated.View 
            style={tw.style('rounded-lg w-32 p-0 max-w-xs bg-white my-3',{transform:[{scale:flasAnim}]})}
            ref={ref}
        >
            {props.children}
        </Animated.View>
    )
})

FlashView.defaultProps = {
    animate:true,
    delay:20,
    bounciness:15,
    containerStyle:null,
}

FlashView.propTypes = {
    /** determines whether animation is enabled or not */
    animate:PropTypes.bool,
    /** delay for animation */
    delay:PropTypes.number,
    /** bounciness of animation */
    bounciness:PropTypes.number,
    /** styles for `BoxShadowView` wrapper component */
    containerStyle:PropTypes.object,
}

export default React.memo(FlashView)