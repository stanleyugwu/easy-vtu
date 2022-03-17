import React, { useState } from "react";
import { View, ViewProps } from "./Themed";

/**
 * Reduces the scale size of its children when pressed,
 * creating a visual effect of reduction in size.
 *
 * Note: this component destructures extra passed props, and passes it to its wrapper `View` element.
 * Avoid attaching `touch` event handlers to this component.
 */
const PressResizerView = ({
  accessibilityLabel = "PressResizerView wrapper",
  style,
  children,
  ...otherProps
}: ViewProps) => {
  const [scale, setScale] = useState(1); //scale factor

  const onTouchStartCb = React.useCallback(() => {
    setScale(0.965);
  }, []);

  const onTouchEndCb = React.useCallback(() => {
    setScale(1);
  }, []);

  return (
    <View
      {...otherProps}
      style={[style, { transform: [{ scale }] }]}
      onTouchStart={onTouchStartCb}
      onTouchEnd={onTouchEndCb}
      onTouchCancel={onTouchEndCb}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

export default React.memo(PressResizerView);
