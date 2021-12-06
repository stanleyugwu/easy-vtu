import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Text, View } from "react-native";

/**
 * reduces the scale size of its children when pressed,
 * creating a visual effect of reduction in size.
 * 
 * Note: this component destructures extra props in its wrapper `View` element.
 * but its not advised to attach event handlers to it
 */
const PressResizerView = ({containerStyle, children, ...restOfProps}) => {

    const [scale, setScale] = useState(1);//scale factor

    const onTouchStartCb = React.useCallback(() => {
        setScale(0.95);
    });

    const onTouchEndCb = React.useCallback(() => {
        setScale(1);
    });

    return (
        <View 
            style={[containerStyle,{transform:[{scale}]}]} 
            onTouchStart={onTouchStartCb} 
            onTouchEnd={onTouchEndCb}
            accessibilityLabel={"PressResizerView wrapper"}
            {...restOfProps}
        >
            {children}
        </View>
    )
}

PressResizerView.propTypes = {
    /** styles for wrapper `View` element */
    containerStyle: PropTypes.object,

    /** children to render */
    children: PropTypes.element.isRequired
}

PressResizerView.defaultProps = {
    containerStyle: null,
    children: <Text/>
}

PressResizerView.displayName = "PressResizerView";

export default React.memo(PressResizerView);
