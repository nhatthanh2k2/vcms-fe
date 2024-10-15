import { useEffect, useState } from 'react'

import './App.css'
import { router } from './routes'
import { useRoutes } from 'react-router-dom'
import { refreshToken } from './services'
import { jwtDecode } from 'jwt-decode'

function App() {
    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = sessionStorage.getItem('token')
            if (!token) return
            const decodedToken = jwtDecode(token)
            const expirationTime = decodedToken.exp * 1000
            const currentTime = Date.now()
            const timeLeft = expirationTime - currentTime
            if (timeLeft < 5 * 60 * 1000) {
                refreshToken()
            }
        }
        const intervalId = setInterval(checkTokenExpiration, 60 * 1000)
        return () => clearInterval(intervalId)
    }, [])

    return <div>{useRoutes(router)}</div>
}

export default App
