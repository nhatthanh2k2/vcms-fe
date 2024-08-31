import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toast } from './components/ui/toast/Toast.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <BrowserRouter>
        <App />
        <Toast />
    </BrowserRouter>
)
