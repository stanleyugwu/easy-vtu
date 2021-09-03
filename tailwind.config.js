
module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      colors:{
        black:'#333333',
        white:'#f8f8f8',
        gray:{
          DEFAULT:'#888888',
          light:'#e5e5e5'
        }
      },
      fontFamily:{
        sans:['Roboto','sans-serif'],
        serif:['Roboto','serif']
      },
      extend: {
        colors:{
          primary:'#A10072',
          accent:'#F8143C'
        },
        fontFamily:{
          robold:['Roboto-Medium','sans-serif']
        }
      },
    },
  }