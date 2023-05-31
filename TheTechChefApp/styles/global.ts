import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    list-style: none;
    text-decoration: none;
    
    font-family: 'Roboto', sans-serif;

    color: var(--primary-font-color);
  }

  button {
    background: none;
		cursor: pointer;
    border: none;
  }

  :root {
    --primary-color: #D1107A;
    --third-color: #e67402;

    --primary-background: #0D0E12;
    --second-background: #16171C;

    --primary-font-color: #fff;

    --shadow-black-color: #e67402;

  }

  body, html, #root {
    width: 100%;
    height: 100%;
    position: relative;

  
  }
`;