import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const FadeInView = (props) => {
    const {duration = 700, delay = 0, slideUp = false} = props;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        return Animated.parallel([
            Animated.timing(
                fadeAnim,
                {toValue:1,duration,delay,useNativeDriver:true}
            ),
            slideUp && Animated.timing(
                translateAnim,
                {toValue:0,duration,delay,useNativeDriver:true}
            )
        ]).start()
    },[fadeAnim,translateAnim])

    return (
        <Animated.View
            style={{...props.style,opacity:fadeAnim,transform:[{translateY:slideUp ? translateAnim : 0}]}}
        >
            {props.children}
        </Animated.View>
    )
}

export default FadeInView