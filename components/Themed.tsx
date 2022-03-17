/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import React from 'react';
 import { Text as DefaultText, View as DefaultView } from 'react-native';

 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 import {typeStyle} from '../lib/appStyles';
import tw from '../lib/tailwind';
 
 export function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
 ) {
   const theme = useColorScheme();
   const colorFromProps = props[theme];
 
   if (colorFromProps) {
     return colorFromProps;
   } else {
     // theme is set to "light", we're not doing dark mode yet
     return Colors["light"][colorName];
   }
 }
 
 /** Type of text to render whether titled text, body text, etc */
 type textType = keyof typeof typeStyle
 
type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
 };
 
 export type TextProps = ThemeProps & DefaultText['props'] & {type?:textType};
 export type ViewProps = ThemeProps & DefaultView['props'];
 
 export default function Text(props: TextProps) {
   const { style, lightColor, darkColor, type = "body", ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
 
   return <DefaultText style={[{ color },typeStyle[type], style]} {...otherProps} />;
 }
 
 const View = React.forwardRef(function View(props: ViewProps, ref:React.ForwardedRef<DefaultView>) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
 
   return <DefaultView style={[{ backgroundColor }, style]} ref={ref} {...otherProps} />;
 })

 export {View}
 