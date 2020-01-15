import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

html, body, #root {
  background-color: #222d32;
  min-height: 100%;
}

button, a {
  cursor: pointer;
}

`;
