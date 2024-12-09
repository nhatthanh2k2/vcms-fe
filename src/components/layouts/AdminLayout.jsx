import React from 'react'
import { useState } from 'react'
import { AdminSidebar, AdminHeader } from '../ui'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark bg-admin">
            <div className="flex h-screen overflow-hidden">
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
