import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';
import { TravelProvider } from './state/TravelContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TravelProvider>
        <App />
      </TravelProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
