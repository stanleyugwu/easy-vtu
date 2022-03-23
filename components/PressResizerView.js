import React, { useState, ReactChild } from "react";
import PropTypes from "prop-types";
import { View, ViewStyle } from "react-native";

/**
 * @typedef {Object} PressResizerViewProp
 * @property {string} accessibilityLabel Custom accessibility label for parent `View`
 * @property {ViewStyle} containerStyle Styles for wrapper `View` element
 * @property {ReactChild} children React Child to render with effect applied
 */

/**
 * Reduces the scale size of its children when pressed,
 * creating a visual effect of reduction in size.
 *
 * Note: this component destructures extra passed props, and passes it to its wrapper `View` element.
 * Avoid attaching `touch` event handlers to this component.
 */
const PressResizerView = (
  /** @type {PressResizerViewProp} */ {
    accessibilityLabel,
    containerStyle,
    children,
    ...restOfProps
  }
) => {
  const [scale, setScale] = useState(1); //scale factor

  const onTouchStartCb = React.useCallback(() => {
    setScale(0.965);
  });

  const onTouchEndCb = React.useCallback(() => {
    setScale(1);
  });

  return (
    <View
      {...restOfProps}
      style={[containerStyle, { transform: [{ scale }] }]}
      onTouchStart={onTouchStartCb}
      onTouchEnd={onTouchEndCb}
      onTouchCancel={onTouchEndCb}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

PressResizerView.propTypes = {
  accessibilityLabel: PropTypes.string,
  containerStyle: PropTypes.object,
  children: PropTypes.element.isRequired,
};

PressResizerView.defaultProps = {
  accessibilityLabel: "PressResizerView wrapper",
};

PressResizerView.displayName = "PressResizerView";

export default React.memo(PressResizerView);
