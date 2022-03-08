import { StyleSheet, Platform } from "react-native";
import tw from "./tailwind";

export default StyleSheet.create({
  boxShadow:
    Platform.OS == "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }
      : {
          elevation: 8,
        },
  boxShadowSmall:
    Platform.OS == "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }
      : {
          elevation: 2,
        },
});

export const typeStyle = StyleSheet.create({
  heading: tw.style(`font-comfortaa-bold text-xl leading-6`, {
    letterSpacing: 0.1,
  }),
  title: tw.style(`font-comfortaa-bold text-lg leading-6`, {
    letterSpacing: 0.15,
  }),
  subTitle: tw.style(`font-comfortaa text-base`, { letterSpacing: 0.15 }),
  subTitle2: tw.style(`font-comfortaa-medium leading-6 text-sm`, {
    letterSpacing: 0.15,
  }),
  body: tw.style(`text-base font-rubik`, { letterSpacing: 0.5 }),
  body2: tw.style(`text-sm font-rubik`, { letterSpacing: 0.25 }),
  caption: tw.style(`text-xs font-rubik`, { letterSpacing: 0.4 }),
  overline: tw.style(`text-xs font-rubik-medium uppercase`, {
    letterSpacing: 1.5,
  }),
  button: tw.style(`text-sm leading-4 font-rubik-medium uppercase`, {
    letterSpacing: 1.1,
  }),
})