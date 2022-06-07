import React from "react";
import tw from "../lib/tailwind";
import Text from "./Themed";
export type ErrorTextProps = {
  error: string | undefined;
};

/**
 * Dispays error messages in style
 */
const ErrorText = ({ error }: ErrorTextProps) =>
  typeof error != "string" || !error.trim() ? null : (
    <Text
      style={tw.style(`text-red-700 pl-1 text-left font-sans-semibold`, {
        fontSize: 13,
      })}
    >
      &gt; {error}
    </Text>
  );

export default ErrorText;
