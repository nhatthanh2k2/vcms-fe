import React from 'react'
import { Outlet } from 'react-router-dom'
import { BackToTopButton, CustomerHeader, CustomerFooter } from '../ui'

export const CustomerLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <CustomerHeader />
            <div className="flex-1 mb-5">
                <Outlet />
            </div>
            <CustomerFooter />
            <BackToTopButton />
        </div>
    )
}
