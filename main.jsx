import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/scss/all.scss';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>

    </HashRouter>
  </React.StrictMode>,
)
