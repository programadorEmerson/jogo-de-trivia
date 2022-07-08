import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from './App';
import store from "./redux/store";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/Theme';

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <ToastContainer />
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
);
