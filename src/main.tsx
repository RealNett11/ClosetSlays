import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Add global error handler for module loading errors
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes("Cannot find module './en'")) {
    console.warn('Module loading error detected. This is a non-critical error.');
    event.preventDefault();
  }
});

// Add global error handler for fetch errors (like Stripe)
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('Failed to fetch') || 
       event.reason.message.includes('ERR_BLOCKED_BY_CLIENT'))) {
    console.warn('Network request blocked. This might be caused by an ad blocker or privacy extension.');
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
