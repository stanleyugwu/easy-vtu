
module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      colors:{
        black:'#151b2c',
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
          primary:'#1FC157',
          accent:'#fcc12d'
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