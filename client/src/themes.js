import {createGlobalStyle} from 'styled-components';

export const lightTheme = {
  body: '#FFFAFA',
  fontColor: '#000',
}

export const darkTheme = {
  body: '#36393E',
  fontColor: '#fff',
}

export const GlobalStyle = createGlobalStyle`

  body {
    background-color: ${(props) => props.theme.body}
  }

`;