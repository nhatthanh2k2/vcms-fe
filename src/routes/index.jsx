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
    VaccineDetailPage,
    VaccineListPage,
    PageNotFound,
    VaccinationHistoryPage,
} from '@/pages'
import { PATH } from '@/constant'
import { Navigate } from 'react-router-dom'

export const router = [
    {
        path: '*',
        element: <PageNotFound />,
    },
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
            {
                path: PATH.vaccineList,
                element: <VaccineListPage />,
            },
            {
                path: 'thong-tin-vac-xin/:vaccineCode',
                element: <VaccineDetailPage />,
            },
            {
                path: PATH.vaccinationHistory,
                element: <VaccinationHistoryPage />,
            },
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
        element: <ReceptionPage />,
    },
]
