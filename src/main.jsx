import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from './contexts/SocketContext.jsx';
import { CurrentSectionProvider } from './contexts/CurrentSectionContext';
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> 
      <CurrentSectionProvider> 
        <SocketContextProvider> 
          <BrowserRouter> 
            <App />
          </BrowserRouter>
        </SocketContextProvider>
      </CurrentSectionProvider>
    </AuthProvider>
  </React.StrictMode>
);
