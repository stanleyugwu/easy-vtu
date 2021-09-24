
module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      colors:{
        black:'#343434',
        white:'#fafafa',
        gray:{
          DEFAULT:'#888888',
          light:'#e5e5e5'
        }
      },
      fontFamily:{
        sans:['Nunito','sans-serif'],
        serif:['serif']
      },
      extend: {
        colors:{
          primary:'#2d3e61',
          accent:'#f7b902'
        },
        fontFamily:{
          nunitobold:['Nunito-Medium','sans-serif']
        },
        fontSize:{
          'btn':15
        }
      },
    },
  }