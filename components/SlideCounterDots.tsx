import React from "react";
import { View } from "./Themed";
import tw from "../lib/tailwind";

export type SlideCounterDotsProps = {
  /** Index of the active dot */
  activeDot: 1 | 2 | 3;
};

const SlideCounterDots = ({ activeDot = 1 }: SlideCounterDotsProps) => {
  return (
    <View style={tw`flex-row w-5 bg-transparent`}>
      <View
        style={tw.style(
          "w-2 h-2 rounded-full",
          activeDot == 1 ? "bg-secondary" : "bg-surface"
        )}
      />
      <View
        style={tw.style(
          "w-2 h-2 rounded-full mx-2",
          activeDot == 2 ? "bg-secondary" : "bg-surface"
        )}
      />
      <View
        style={tw.style(
          "w-2 h-2 rounded-full",
          activeDot == 3 ? "bg-secondary" : "bg-surface"
        )}
      />
    </View>
  );
};

export default React.memo(SlideCounterDots);
