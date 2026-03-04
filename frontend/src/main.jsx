import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'material-symbols/outlined.css';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </StrictMode>,
);
