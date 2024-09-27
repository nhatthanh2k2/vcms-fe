import React from 'react'
import { AdminLayout, CustomerLayout, EmployeeLayout } from '@/components/layouts'
import {
    OrderPage,
    AppointmentPage,
    CustomerHomePage,
    IntroductionPage,
    MedicalTeamPage,
    Login,
    ReceptionPage,
} from '@/pages'
import { PATH } from '@/constant'
import { Navigate } from 'react-router-dom'
import { VaccineListTemplate } from '@/components'

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
                element: <CustomerHomePage />,
            },
            {
                path: PATH.appointment,
                element: <AppointmentPage />,
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
                element: <IntroductionPage />,
            },
            {
                path: PATH.medicalTeam,
                element: <MedicalTeamPage />,
            },
        ],
    },
    {
        path: '/goi-tiem',
        element: <CustomerLayout />,
        children: [],
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
            {
                path: PATH.vaccineInformation,
                element: <VaccineListTemplate />,
            },
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
        path: '/admin',
        element: <AdminLayout />,
        children: [],
    },
    {
        path: '/nhan-vien/le-tan',
        element: <EmployeeLayout />,
    },
]
