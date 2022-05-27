import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, serif',
    fontSize: 12,
  },
  palette: {
    primary: {
      light: '#444',
      main: '#232323',
      dark: '#111',
      contrastText: '#fff',
    },
    secondary: {
      light: '#00e676',
      main: '#00e676',
      dark: '#00a152',
      contrastText: '#000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
     </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
