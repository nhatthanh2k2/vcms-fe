import React from 'react'
import { Header, Footer } from '../ui/customer'
import { Outlet } from 'react-router-dom'

export const CustomerLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 mb-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
