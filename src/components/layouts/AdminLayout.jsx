import React from 'react'
import { useState } from 'react'
import { AdminHeader, AdminSidebar } from '../ui/admin'
import { Outlet } from 'react-router-dom'

// export const AdminLayout = () => {
//     return (
//         <div className="flex h-screen overflow-hidden bg-admin-bg">
//             <AdminSidebar />

//             <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
//                 <AdminHeader />
//                 <main>
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     )
// }

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark bg-admin">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <AdminSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <AdminHeader
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    )
}
