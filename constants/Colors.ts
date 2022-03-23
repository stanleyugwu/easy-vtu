import tw from "../lib/tailwind";

const tintColorLight = tw.color('primary');
const tintColorDark = tw.color('secondary');

export default {
  light: {
    text: tw.color('on-background'),
    background: tw.color('background'),
    tint: tintColorLight,
    tabIconDefault: '#999',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: tw.color('on-dark'),
    background: tw.color('on-background'),
    tint: '#00C4B4',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
