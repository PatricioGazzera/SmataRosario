import { StrictMode } from 'react'
import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from "@vercel/speed-insights"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

inject();
injectSpeedInsights();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
