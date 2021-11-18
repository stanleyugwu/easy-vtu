const colors = require('tailwindcss/colors');

module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors:{
          primary:'#192F5E',// initial color -> #2d3e61 
          accent:'#f7b902',
          black:'#343434',
          white:'#ffffff',
          gray:{
            DEFAULT:'#888888',
            light:'#e5e5e5',
            lighter:colors.gray[500]
          }
        },
        fontFamily:{
          nunitomed:['Nunito-Medium','sans-serif'],
          nunitobold:['Nunito-Bold','sans-serif'],
          sans:['Nunito','sans-serif'],
          serif:['serif']
        },
        fontSize:{
          'btn':15,
          '1.5xl':22
        }
      },
    },
  }