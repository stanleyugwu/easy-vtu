import { TailwindConfig, TailwindThemeFontSizes } from "tailwindcss/tailwind-config";

 export type AppThemeColors = keyof typeof themeColors
 export type AppThemeFontSizes = keyof typeof themeFontSizes

 export const themeFontSizes:TailwindThemeFontSizes = {
  'heading':'24',
  'title':'20',
  'subTitle':'16',
  'subTitle-2':'14',
  'body':'15',
  'body-2':'14',
  'caption':'12',
  'overline':'10',
  'button':'14',
}

 export const themeColors = {
  primary: "#2d3e61",
  "primary-dark": "#242E48",
  "on-primary": "#EEEEDF",

  secondary: "#f7b902",
  "secondary-dark": "#F66900",
  "on-secondary": "#ffffff",

  background: "#F8F8F8",
  "on-background": "#444444",

  surface: "#ffffff",
  "on-surface": "#444444",

  error:'#B00020',
  outline:"#e0e0e0",
  'on-dark':'#E3E3E3',

  gray: '#888888'
}

const config:TailwindConfig = {
  purge: ["**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: themeColors,
      fontFamily:{
        sans:['open-sans','sans-serif'],
        'sans-semibold':['open-sans-semibold','sans-serif'],
        'sans-bold':['open-sans-bold','sans-serif'],
        mono:['serif']
      },
      fontSize:themeFontSizes
    },
  },
};

 module.exports = config
  