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
    ChildPackagePage,
    AdultPackagePage,
    AdolescentPackagePage,
    AddVaccinePackagePage,
    VaccinePricingPage,
    CustomerManagementPage,
    RevenuePage,
    DoseCountPage,
    EditVaccinePackagePage,
    EditVaccinePage,
    CanceledAppointmentPage,
    DiseaseManagementPage,
    VaccinePriceManagementPage,
} from '@/pages'
import { ADMIN_PATH, EMPLOYEE_PATH, PATH } from '@/constant'
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
        children: [
            {
                path: PATH.childPackage,
                element: <ChildPackagePage />,
            },
            {
                path: PATH.adultPackage,
                element: <AdultPackagePage />,
            },
            {
                path: PATH.adolescentPackage,
                element: <AdolescentPackagePage />,
            },
        ],
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
                path: `${PATH.vaccineList}/:vaccineCode`,
                element: <VaccineDetailPage />,
            },
            {
                path: PATH.vaccinationHistory,
                element: <VaccinationHistoryPage />,
            },
            {
                path: PATH.VaccinePricing,
                element: <VaccinePricingPage />,
            },
        ],
    },
    {
        path: EMPLOYEE_PATH.login,
        element: <Login />,
    },
    {
        path: ADMIN_PATH.admin,
        element: <AdminLayout />,
        children: [
            {
                path: ADMIN_PATH.home,
                element: <AdminHomePage />,
            },
            {
                path: ADMIN_PATH.management,
                children: [
                    {
                        path: ADMIN_PATH.hrManagement,
                        element: <HRManagementPage />,
                    },
                    {
                        path: ADMIN_PATH.diseaseManagement,
                        element: <DiseaseManagementPage />,
                    },
                    {
                        path: ADMIN_PATH.priceTable,
                        element: <VaccinePriceManagementPage />,
                    },
                    {
                        path: ADMIN_PATH.vaccineMangement,
                        children: [
                            {
                                path: ADMIN_PATH.catalog,
                                element: <VaccineManagementPage />,
                            },
                            {
                                path: ADMIN_PATH.addVaccine,
                                element: <AddVaccinePage />,
                            },
                            {
                                path: `${ADMIN_PATH.editvaccine}/:vaccineCode`,
                                element: <EditVaccinePage />,
                            },
                        ],
                    },
                    {
                        path: ADMIN_PATH.batchManagement,
                        children: [
                            {
                                path: ADMIN_PATH.catalog,
                                element: <VaccineBatchManagementPage />,
                            },
                        ],
                    },
                    {
                        path: ADMIN_PATH.packageManagement,
                        children: [
                            {
                                path: ADMIN_PATH.catalog,
                                element: <VaccinePackageManagementPage />,
                            },
                            {
                                path: ADMIN_PATH.addPackage,
                                element: <AddVaccinePackagePage />,
                            },
                            {
                                path: `${ADMIN_PATH.editPackage}/:vaccinePackageId`,
                                element: <EditVaccinePackagePage />,
                            },
                        ],
                    },
                    {
                        path: ADMIN_PATH.customerManagement,
                        element: <CustomerManagementPage />,
                    },
                ],
            },
            {
                path: ADMIN_PATH.statistics,
                children: [
                    {
                        path: ADMIN_PATH.revenue,
                        element: <RevenuePage />,
                    },
                    {
                        path: ADMIN_PATH.doseCount,
                        element: <DoseCountPage />,
                    },
                    {
                        path: ADMIN_PATH.canceledAppointment,
                        element: <CanceledAppointmentPage />,
                    },
                ],
            },
        ],
    },
    {
        path: EMPLOYEE_PATH.employee,
        element: <EmplyeeHomePage />,
    },
]
