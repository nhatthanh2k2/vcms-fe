import React from 'react'
import { CustomerHeader, CustomerFooter } from '../ui/customer'
import { Outlet } from 'react-router-dom'

export const CustomerLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <CustomerHeader />
            <div className="flex-1 mb-5">
                <Outlet />
            </div>
            <CustomerFooter />
        </div>
    )
}
