import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toast } from './components/index.js'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toast />
        </BrowserRouter>
    </Provider>
)
