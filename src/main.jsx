import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './contexts/SocketContext.jsx'
import { CurrentSectionProvider } from './contexts/CurrentSectionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentSectionProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </CurrentSectionProvider>
  </React.StrictMode>,
)
