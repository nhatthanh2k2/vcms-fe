import React from 'react'
import { AdminLayout, CustomerLayout } from '@/components/layouts'
import {
    OrderPage,
    AppointmentPage,
    CustomerHomePage,
    IntroductionPage,
    MedicalTeamPage,
    Login,
    VaccineDetailPage,
    VaccineListPage,
    PageNotFound,
    VaccinationHistoryPage,
    EmplyeeHomePage,
    AdminHomePage,
    HRManagementPage,
    VaccineManagementPage,
    VaccinePackageManagementPage,
    VaccineBatchManagementPage,
    AddVaccinePage,
} from '@/pages'
import { ADMIN_PATH, PATH } from '@/constant'
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
        children: [
            {
                index: true,
                element: <AdminHomePage />,
            },
            {
                path: ADMIN_PATH.hrManagement,
                element: <HRManagementPage />,
            },
            {
                path: ADMIN_PATH.vaccineMangement,
                element: <VaccineManagementPage />,
            },
            {
                path: ADMIN_PATH.packageManagement,
                element: <VaccinePackageManagementPage />,
            },
            {
                path: ADMIN_PATH.batchManagement,
                element: <VaccineBatchManagementPage />,
            },
            {
                path: ADMIN_PATH.addVaccine,
                element: <AddVaccinePage />,
            },
        ],
    },
    {
        path: '/nhan-vien',
        element: <EmplyeeHomePage />,
    },
]
