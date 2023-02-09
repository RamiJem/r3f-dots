import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>DV-r3f</title>
        <meta name='description' content='Data visualisation with r3f.' />
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <App /> 
    </HelmetProvider>
  </React.StrictMode>,
)
