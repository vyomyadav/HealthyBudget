import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalProvider } from './components/context/globalContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles/GlobalStyle';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet>
      <title>Healthy Budget</title>
    </Helmet>
    <GlobalStyle />
    <BrowserRouter >
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
