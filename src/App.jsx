import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { router } from './routes'
import { useRoutes } from 'react-router-dom'

function App() {
    return <div>{useRoutes(router)}</div>
}

export default App
