import React from 'react'
import { createRoot } from 'react-dom/client'
import App, { ToastProvider } from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
