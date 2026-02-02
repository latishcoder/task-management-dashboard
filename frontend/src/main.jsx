import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
     <Toaster position="top-right" />
    <App />
    </ThemeProvider>
  </StrictMode>,
)
