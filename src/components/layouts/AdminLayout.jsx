import React from 'react'
import { AdminHeader, AdminSidebar } from '../ui/admin'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-admin-bg">
            <AdminSidebar />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
                <AdminHeader />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
