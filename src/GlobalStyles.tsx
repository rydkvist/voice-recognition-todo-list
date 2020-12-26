import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html, body {
  margin: 0;
  padding: 0;
  background-color: #71c9ce; 
  font-family: 'Open Sans', sans-serif;
}

button, input {
  background: none;
  appearance: none;
  color: inherit;
  font: inherit;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  outline: none;
}

p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}
`;
