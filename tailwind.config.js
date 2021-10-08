
module.exports = {
    purge:['./src/**/*.{js,jsx,ts,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors:{
          primary:'#2d3e61',
          accent:'#f7b902',
          black:'#343434',
          white:'#fafafa',
          gray:{
            DEFAULT:'#888888',
            light:'#e5e5e5'
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