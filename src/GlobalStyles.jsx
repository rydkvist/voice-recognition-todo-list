import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html {
  height: -webkit-fill-available;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #71c9ce; 
}

body {
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  margin: 0;
}

button {
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
