import React from 'react'
import { AdminLayout, CustomerLayout, EmployeeLayout } from '@/components/layouts'
import { CustomerHome, CenterIntroduction, OrderPage } from '@/pages'
import { PATH } from '@/constant'
import { Login } from '@/components/ui'
import { Appointment } from '@/pages/customer/Appointment'
import { Navigate } from 'react-router-dom'

export const router = [
    {
        path: '/',
        element: <Navigate to="/trang-chu" replace />,
    },
    {
        path: '/gioi-thieu',
        element: <Navigate to="/gioi-thieu/trung-tam" replace />,
    },
    {
        path: '/goi-tiem',
        element: <Navigate to="/goi-tiem/goi-tiem-tre-em" replace />,
    },
    {
        path: '/cam-nang',
        element: <Navigate to="/cam-nang/luu-y-truoc-tiem" replace />,
    },
    {
        path: '/trang-chu',
        element: <CustomerLayout />,
        children: [
            {
                index: true,
                element: <CustomerHome />,
            },
            {
                path: PATH.appointment,
                element: <Appointment />,
            },
            {
                path: PATH.order,
                element: <OrderPage />,
            },
        ],
    },
    {
        path: '/gioi-thieu',
        element: <CustomerLayout />,
        children: [
            {
                path: PATH.introduction,
                element: <CenterIntroduction />,
            },
            {
                path: PATH.medicalTeam,
                element: <CenterIntroduction />,
            },
        ],
    },
    {
        path: '/goi-tiem',
        element: <CustomerLayout />,
        children: [
            {
                path: PATH.listVaccineForChildren,
                element: <CenterIntroduction />,
            },
            {
                path: PATH.listVaccineForAdults,
                element: <CenterIntroduction />,
            },
        ],
    },
    {
        path: '/cam-nang',
        element: <CustomerLayout />,
        children: [
            // {
            //     path: PATH.preVaccination,
            //     element: <Introduction />,
            // },
            // {
            //     path: PATH.postVaccination,
            //     element: <Introduction />,
            // },
            // {
            //     path: PATH.vaccineInformation,
            //     element: <Introduction />,
            // },
            // {
            //     path: PATH.vaccinationHistory,
            //     element: <Introduction />,
            // },
        ],
    },
    {
        path: PATH.login,
        element: <Login />,
    },
    {
        path: '/nhan-vien',
        element: <EmployeeLayout />,
        children: [
            {
                path: PATH.home,
                element: <Login />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [],
    },
]
