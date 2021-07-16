import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AluraKutCommons'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
   
  body {
    //background-color: #D9E6F6;
    //background-image: url("https://i.imgur.com/7gV6lQ7.jpg");
    //background-size: cover;
    background: linear-gradient(to left, #6717cd, #2871fa);
    background-size: 500% 100%;
    animation-name: degrade;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  @keyframes degrade{
    0%{
        background-position-x: 0%;
    }
    100%{
        background-position-x: 100%;
    }
}
  //*****
  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
