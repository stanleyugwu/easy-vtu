import React from "react";
import tw from "../lib/tailwind";
import Text from "./Themed";
export type ErrorTextProps = {
  /** Error text. This determines whether the component will render or ot */
  error: string | undefined;
  /** Color of the error text */
  color?: string;
};

/**
 * Dispays error messages in style
 */
const ErrorText = ({ error, color = tw.color("red-700") }: ErrorTextProps) =>
  typeof error != "string" || !error.trim() ? null : (
    <Text
      style={tw.style(`pl-1 text-left font-sans-semibold`, {
        fontSize: 13,
        color,
      })}
    >
      &gt; {error}
    </Text>
  );

export default ErrorText;
