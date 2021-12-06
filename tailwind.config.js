const colors = require('tailwindcss/colors');

module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors:{
          primary:'#2d3e61',//#192F5E
          accent:'#f7b902',
          black:'#555',
          white:'#fff',
          light:'#efe',
          gray:{
            DEFAULT:'#888888',
            light:'#e5e5e5',
            lighter:colors.gray[500]
          }
        },
        fontFamily:{
          'sans-bold':['fira-sans-semibold','fira-sans'],
          sans:['fira-sans','sans-serif'],
          serif:['serif']
        },
        fontSize:{
          'btn':15,
          '1.5xl':22
        }
      },
    },
  }