import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import './index.css'
import { ContactProvider } from './store/ContactContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ContactProvider>
  </React.StrictMode>,
)