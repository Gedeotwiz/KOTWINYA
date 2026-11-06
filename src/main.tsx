import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeLiveChat } from './lib/liveChat';
import '../styles.css';
import './chat.css';
import './mobile.css';

initializeLiveChat(import.meta.env.VITE_TAWK_PROPERTY_ID, import.meta.env.VITE_TAWK_WIDGET_ID);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
