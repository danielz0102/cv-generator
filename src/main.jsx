// Supports weights 100-900
import '@fontsource-variable/inter'
// Supports weights 400-700
import '@fontsource-variable/stix-two-text'
import '@/styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
