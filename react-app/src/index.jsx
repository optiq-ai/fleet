import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n'; // Import i18next configuration
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Roboto', 'Segoe UI', 'Arial', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    background-color: #f5f7fa;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
