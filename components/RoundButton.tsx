import React from "react";
import { IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../lib/tailwind";
import PressResizerView from "./PressResizerView";
import RippleButton, { RippleButtonProps } from "./RippleButton";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type RoundButtonProps = {
  /** Optional gradient color to apply to button */
  gradient?: string[];
  /** Name of the icon to display */
  icon?: IconSource;
  /** Color of the icon insdide the button */
  iconColor?: string;
  /** Size of the icon */
  size?: number;
} & RippleButtonProps;

/**
 * Renders a circle shaped button with gradient support
 */
const RoundButton = ({
  onPress,
  icon = "arrow-right",
  gradient = [tw.color("primary"), tw.color("primary")] as string[],
  accessibilityLabel = "round button",
  size = 20,
  iconColor = tw.color("on-primary"),
  ...otherProps
}: RoundButtonProps) => {
  return (
    <PressResizerView style={{backgroundColor:"transparent"}}>
      <RippleButton
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        {...otherProps}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0.4, y: 0.2 }}
          end={{ x: 1, y: 0.2 }}
          style={tw`rounded-full drop-shadow w-16 h-16 justify-center items-center`}
          testID={"gradient-wrapper"}
        >
          <IconButton
            hasTVPreferredFocus={false}
            tvParallaxProperties={null}
            testID={"icon-button"}
            icon={icon}
            size={size}
            color={iconColor}
            animated={true}
          />
        </LinearGradient>
      </RippleButton>
    </PressResizerView>
  );
};

export default React.memo(RoundButton);
