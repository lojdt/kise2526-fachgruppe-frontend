import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Note: mock backend is initialized in App.tsx (initializeMockBackend).
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
