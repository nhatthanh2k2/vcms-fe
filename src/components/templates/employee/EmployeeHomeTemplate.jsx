import React, { useState, useEffect } from 'react'
import { batchDetailService, vaccinePackageService, vaccineService } from '@/services'
import {
    CustomerLookup,
    CustomizableVaccinePackage,
    BookVaccination,
    AppointmentVaccinationSchedule,
    OrderVaccinationSchedule,
    AddCustomerModal,
    ChangePasswordModal,
    UpdateEmployeeProfileModal,
    PrintRecord,
    ConfirmLogoutModal,
} from '@/components/ui'
import { Link, Outlet } from 'react-router-dom'

export const EmployeeHomeTemplate = () => {
    const [activeTab, setActiveTab] = useState('customerLookup')
    const [batchDetailList, setBatchDetailList] = useState([])
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [vaccineList, setVaccineList] = useState([])
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    useEffect(() => {
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((err) => console.log('Get Vaccine Package Failed!'))
        vaccineService
            .getAllVaccines()
            .then((response) => setVaccineList(response.data.result))
            .catch((err) => console.log('Get Vaccine Failed!'))
    }, [])

    const renderContent = () => {
        switch (activeTab) {
            case 'customerLookup':
                return <CustomerLookup />
            case 'AppointmentVaccinationSchedule':
                return <AppointmentVaccinationSchedule />
            case 'bookVaccination':
                return (
                    <BookVaccination
                        batchDetailList={batchDetailList}
                        vaccinePackageList={vaccinePackageList}
                        vaccineList={vaccineList}
                    />
                )
            case 'printVaccinationRecord':
                return <PrintRecord />
            case 'OrderVaccinationSchedule':
                return <OrderVaccinationSchedule />
            case 'CustomizableVaccinePackage':
                return (
                    <CustomizableVaccinePackage
                        vaccinePackageList={vaccinePackageList}
                        vaccineList={vaccineList}
                        batchDetailList={batchDetailList}
                    />
                )
            default:
                return null
        }
    }

    const [isOpenConfirmLogoutModal, setIsOpenConfirmLogoutModal] = useState(false)

    const handleOpenConfirmLogoutModal = () => {
        setIsOpenConfirmLogoutModal(true)
    }

    const handleCloseConfirmLogoutModal = () => {
        setIsOpenConfirmLogoutModal(false)
    }

    const [isOpenAddCustomerModal, setIsOpenAddCustomerModal] = useState(false)

    const handleOpenAddCustomerModal = () => {
        setIsOpenAddCustomerModal(true)
    }

    const handleCloseAddCustomerModal = () => {
        setIsOpenAddCustomerModal(false)
    }

    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState(false)

    const handleOpenChangePasswordModal = () => {
        setIsOpenChangePasswordModal(true)
    }

    const handleCloseChangePasswordModal = () => {
        setIsOpenChangePasswordModal(false)
    }

    const [isOpenUpdateEmployeeProfileModal, setIsOpenUpdateEmployeeProfileModal] = useState(false)

    const handleOpenUpdateEmployeeProfileModal = () => {
        setIsOpenUpdateEmployeeProfileModal(true)
    }

    const handleCloseUpdateEmployeeProfileModal = () => {
        setIsOpenUpdateEmployeeProfileModal(false)
    }

    return (
        <div className=" bg-employee overflow-hidden flex items-start min-h-screen ">
            <aside className="w-1/5 bg-white shadow-md h-screen fixed top-0 left-0">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex-grow">
                        <div className="px-4 py-6 text-center ">
                            <div className="text-3xl font-bold leading-tight ">
                                <span className="inline text-blue-700 rounded">T-Vax</span> Company
                            </div>
                        </div>
                        <div className="border-2 border-yellow-500"></div>
                        <div className="p-4">
                            <ul className="space-y-1">
                                <li>
                                    <div
                                        onClick={() => setActiveTab('customerLookup')}
                                        className={`flex items-center cursor-pointer hover:bg-blue-200 hover:text-black rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'customerLookup'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-lg mr-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9.446 9.032 1.504 1.504-1.414 1.414-1.504-1.504a4 4 0 1 1 1.414-1.414zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                        </svg>
                                        Tra cứu khách hàng
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={handleOpenAddCustomerModal}
                                        className="flex items-center cursor-pointer hover:bg-blue-200 hover:text-black rounded-xl font-bold text-sm py-3 px-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-lg mr-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <g
                                                stroke="#000"
                                                strokeLinecap="round"
                                                strokeWidth={1.5}
                                            >
                                                <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                                            </g>
                                        </svg>
                                        Thêm khách hàng mới
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() =>
                                            setActiveTab('AppointmentVaccinationSchedule')
                                        }
                                        className={`flex cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'AppointmentVaccinationSchedule'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            className="w-6 h-6 text-lg mr-4"
                                            viewBox="0 0 392.598 392.598"
                                        >
                                            <path d="M61.899 284.509h-7.305c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.913-10.925-10.99-10.925zM120.404 284.509h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.913-10.925-10.925-10.925zM178.844 284.509h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.912-10.925-10.925-10.925zM61.899 237.317h-7.305c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.076-4.913-10.925-10.99-10.925zM120.404 237.317h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.076-4.913-10.925-10.925-10.925zM178.844 237.317h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925.001-6.076-4.912-10.925-10.925-10.925zM61.899 190.061h-7.305c-6.012 0-10.925 4.848-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.913-10.925-10.99-10.925zM120.404 190.061h-7.37c-6.012 0-10.925 4.848-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.913-10.925-10.925-10.925zM178.844 190.061h-7.37c-6.012 0-10.925 4.848-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.912-10.925-10.925-10.925zM237.35 189.996h-7.37c-6.012 0-10.925 4.848-10.925 10.925.065 6.077 4.913 10.925 10.925 10.925h7.37c6.012 0 10.925-4.848 10.925-10.925s-4.849-10.925-10.925-10.925zM61.899 142.869h-7.305c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.796 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.077-4.784-10.925-10.861-10.925zM120.404 142.869h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.077-4.913-10.925-10.925-10.925zM178.844 142.869h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.012 4.849 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925-.064-6.077-4.912-10.925-10.925-10.925zM295.79 142.804h-7.37c-6.012 0-10.925 4.849-10.925 10.925 0 6.077 4.913 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.012-4.848-10.925-10.925-10.925zM237.35 142.804h-7.37c-6.012 0-10.925 4.849-10.925 10.925.065 6.077 4.913 10.925 10.925 10.925h7.37c6.012 0 10.925-4.849 10.925-10.925 0-6.012-4.849-10.925-10.925-10.925z" />
                                            <path d="M350.287 227.297V59.604c0-18.036-14.675-32.711-32.711-32.711h-33.228V10.925C284.348 4.913 279.499 0 273.422 0c-6.012 0-10.925 4.848-10.925 10.925v16.032H87.758V10.99c0-6.012-4.849-10.925-10.925-10.925S65.907 4.913 65.907 10.99v15.968H32.743C14.707 26.958.032 41.633.032 59.669V317.22c0 18.036 14.675 32.711 32.711 32.711h194.263c15.774 25.6 43.96 42.667 76.089 42.667 49.325 0 89.471-40.081 89.471-89.471 0-32-16.938-60.056-42.279-75.83zM21.818 59.604c0-6.012 4.848-10.925 10.925-10.925h33.228v17.778c0 6.012 4.849 10.925 10.925 10.925 6.012 0 10.925-4.848 10.925-10.925V48.679H262.69v17.778c0 6.012 4.849 10.925 10.925 10.925 6.012 0 10.925-4.848 10.925-10.925V48.679h33.228c6.012 0 10.925 4.849 10.925 10.925v39.564H21.818V59.604zM217.309 328.21l-184.501-.065c-6.012 0-10.925-4.848-10.925-10.925V121.083h306.683v96.388c-8.016-2.392-16.614-3.685-25.406-3.685-49.325 0-89.471 40.081-89.471 89.471a88.22 88.22 0 0 0 3.62 24.953zm85.786 42.602c-37.301 0-67.685-30.384-67.685-67.685s30.384-67.685 67.685-67.685 67.685 30.384 67.685 67.685-30.384 67.685-67.685 67.685z" />
                                            <path d="M339.879 276.105c-4.331-4.267-11.313-4.267-15.515 0l-30.901 30.901-11.572-11.572c-4.267-4.267-11.119-4.267-15.451 0-4.267 4.267-4.267 11.119 0 15.451l19.329 19.329c5.56 5.495 13.382 2.004 15.451 0l38.659-38.659c4.266-4.266 4.266-11.119 0-15.45z" />
                                        </svg>
                                        Lịch hẹn tiêm
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('OrderVaccinationSchedule')}
                                        className={`flex cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'OrderVaccinationSchedule'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            className="w-6 h-6 text-lg mr-4"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M264.533 213.333v-8.459a42.612 42.612 0 0 0 24.049-14.249c11.054-13.072 8.549-32.914-5.029-43.473l-19.02-14.794V85.847c9.941 3.515 17.067 12.993 17.067 24.137a8.533 8.533 0 0 0 17.066 0c0-20.64-14.659-37.858-34.133-41.811v-8.44A8.533 8.533 0 0 0 256 51.2a8.533 8.533 0 0 0-8.533 8.533v8.456a42.612 42.612 0 0 0-24.049 14.249c-11.054 13.072-8.549 32.914 5.029 43.473l19.02 14.794v46.511c-9.941-3.515-17.067-12.993-17.067-24.137a8.533 8.533 0 0 0-17.066 0c0 20.64 14.659 37.858 34.133 41.811v8.443a8.533 8.533 0 0 0 8.533 8.533 8.532 8.532 0 0 0 8.533-8.533zm-25.608-100.894c-6.051-4.706-7.154-13.447-2.478-18.978a25.599 25.599 0 0 1 11.02-7.614v33.236l-8.542-6.644zm34.151 48.185c6.051 4.706 7.154 13.447 2.478 18.978a25.599 25.599 0 0 1-11.02 7.614V153.98l8.542 6.644z" />
                                            <path d="M486.4 409.6h-42.667c0-37.703-30.564-68.267-68.267-68.267H264.533v-68.54c71.427-4.407 128-63.724 128-136.26C392.533 61.13 331.403 0 256 0S119.467 61.13 119.467 136.533c0 72.536 56.573 131.854 128 136.26v68.54H136.533c-37.703 0-68.267 30.564-68.267 68.267H25.6a8.533 8.533 0 0 0-8.533 8.533v85.333a8.533 8.533 0 0 0 8.533 8.533H128a8.533 8.533 0 0 0 8.533-8.533v-85.333A8.533 8.533 0 0 0 128 409.6H85.333c0-28.277 22.923-51.2 51.2-51.2h110.933v51.2H204.8a8.533 8.533 0 0 0-8.533 8.533v85.333a8.533 8.533 0 0 0 8.533 8.533h102.4a8.533 8.533 0 0 0 8.533-8.533v-85.333a8.533 8.533 0 0 0-8.533-8.533h-42.667v-51.2h110.933c28.277 0 51.2 22.923 51.2 51.2H384a8.533 8.533 0 0 0-8.533 8.533v85.333a8.533 8.533 0 0 0 8.533 8.533h102.4a8.533 8.533 0 0 0 8.533-8.533v-85.333a8.533 8.533 0 0 0-8.533-8.533zM136.533 136.533c0-65.977 53.489-119.467 119.467-119.467s119.467 53.489 119.467 119.467S321.977 256 256 256s-119.467-53.489-119.467-119.467zm-17.066 290.134v68.267H34.133v-68.267h85.334zm179.2 68.266h-85.333v-68.267h85.333v68.267zm179.2 0h-85.333v-68.267h85.333v68.267z" />
                                            <path d="M51.2 460.8a8.533 8.533 0 0 0 8.533 8.533h34.133c4.713 0 8.533-3.82 8.533-8.533s-3.82-8.533-8.533-8.533H59.733A8.533 8.533 0 0 0 51.2 460.8zM230.4 460.8a8.533 8.533 0 0 0 8.533 8.533h34.133c4.713 0 8.533-3.82 8.533-8.533s-3.82-8.533-8.533-8.533h-34.133a8.533 8.533 0 0 0-8.533 8.533zM409.6 460.8a8.533 8.533 0 0 0 8.533 8.533h34.133c4.713 0 8.533-3.82 8.533-8.533s-3.82-8.533-8.533-8.533h-34.133a8.533 8.533 0 0 0-8.533 8.533z" />
                                        </svg>
                                        Lịch tiêm của đơn hàng
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('bookVaccination')}
                                        className={`flex cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'bookVaccination'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            className="w-6 h-6 text-lg mr-4"
                                        >
                                            <path
                                                d="M11.5 13a.5.5 0 0 0-.5.5V15H1V3h2v.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V3h2v.5a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5H9v-.5A1.5 1.5 0 0 0 7.5 0h-3A1.5 1.5 0 0 0 3 1.5V2H.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5ZM4 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H4Zm11.854 4.646-2-2a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 7 10.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .354-.146l6-6a.5.5 0 0 0 0-.708ZM8 12v-1.293l5.5-5.5L14.793 6.5l-5.5 5.5Zm-2 .5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5Zm0-3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5ZM8.5 7h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1Z"
                                                data-name="Path 184"
                                            />
                                        </svg>
                                        Đăng ký vắc xin
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('CustomizableVaccinePackage')}
                                        className={`flex cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'CustomizableVaccinePackage'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            stroke="#000"
                                            strokeWidth={10.24}
                                            viewBox="0 0 512 512"
                                            className="w-6 h-6 text-lg mr-4"
                                        >
                                            <path d="M157.662 102.614a8.017 8.017 0 0 0-8.017 8.017c0 9.725-7.912 17.637-17.637 17.637s-17.637-7.912-17.637-17.637 7.912-17.637 17.637-17.637a8.017 8.017 0 0 0 0-16.034c-18.566 0-33.67 15.105-33.67 33.67s15.105 33.67 33.67 33.67 33.67-15.105 33.67-33.67a8.016 8.016 0 0 0-8.016-8.016zM157.662 196.676a8.017 8.017 0 0 0-8.017 8.017c0 9.725-7.912 17.637-17.637 17.637s-17.637-7.912-17.637-17.637 7.912-17.637 17.637-17.637a8.017 8.017 0 0 0 0-16.034c-18.566 0-33.67 15.105-33.67 33.67s15.105 33.67 33.67 33.67 33.67-15.105 33.67-33.67a8.016 8.016 0 0 0-8.016-8.016zM251.724 213.779h-59.858a8.017 8.017 0 0 0 0 16.034h59.858a8.017 8.017 0 0 0 0-16.034zM251.724 179.574h-59.858a8.017 8.017 0 0 0 0 16.034h59.858a8.017 8.017 0 0 0 0-16.034zM234.622 307.841h-42.756a8.017 8.017 0 0 0 0 16.034h42.756a8.017 8.017 0 0 0 0-16.034zM251.724 273.637h-59.858a8.017 8.017 0 0 0 0 16.034h59.858a8.017 8.017 0 0 0 0-16.034zM328.685 119.716H191.866a8.017 8.017 0 0 0 0 16.034h136.818a8.017 8.017 0 0 0 .001-16.034zM294.48 85.511H191.866a8.017 8.017 0 0 0 0 16.034H294.48a8.017 8.017 0 0 0 0-16.034zM157.662 290.739a8.017 8.017 0 0 0-8.017 8.017c0 9.725-7.912 17.637-17.637 17.637s-17.637-7.912-17.637-17.637 7.912-17.637 17.637-17.637a8.017 8.017 0 0 0 0-16.034c-18.566 0-33.67 15.105-33.67 33.67s15.105 33.67 33.67 33.67 33.67-15.105 33.67-33.67a8.016 8.016 0 0 0-8.016-8.016z" />
                                            <path d="M362.889 0H72.15C58.3 0 47.031 11.268 47.031 25.119v359.148c0 13.851 11.268 25.119 25.119 25.119h145.37a8.017 8.017 0 0 0 0-16.034H72.15c-5.01 0-9.086-4.076-9.086-9.086V25.119c0-5.01 4.076-9.086 9.086-9.086h290.739c5.01 0 9.086 4.076 9.086 9.086v265.087a8.017 8.017 0 0 0 16.034 0V25.119C388.008 11.268 376.74 0 362.889 0z" />
                                            <path d="M438.578 325.094c-7.451-.743-14.898 1.369-20.792 5.844-4.695-7.878-12.701-13.467-21.964-14.395-7.453-.742-14.899 1.37-20.792 5.844-4.695-7.878-12.701-13.467-21.964-14.395a29.618 29.618 0 0 0-16.365 3.069V208.969a29.45 29.45 0 0 0-9.677-21.8c-6.145-5.56-14.426-8.274-22.721-7.444-14.799 1.482-26.391 14.863-26.391 30.464v102.35l-23.566 23.566c-12.523 12.523-17.578 30.291-13.521 47.531l17.891 76.037c7.249 30.811 34.418 52.329 66.07 52.329h72.307c37.426 0 67.875-30.448 67.875-67.875V355.56c.001-15.603-11.591-28.984-26.39-30.466zm10.357 119.031c0 28.585-23.256 51.841-51.841 51.841h-72.307c-24.175 0-44.927-16.435-50.464-39.968l-17.891-76.037c-2.776-11.795.683-23.953 9.251-32.521l12.229-12.229v27.678a8.017 8.017 0 0 0 16.034 0V210.188c0-7.465 5.251-13.839 11.956-14.509 3.851-.387 7.534.815 10.366 3.379a13.393 13.393 0 0 1 4.401 9.912v141.094a8.017 8.017 0 0 0 16.034 0v-12.827c0-3.768 1.603-7.381 4.401-9.912 2.834-2.564 6.515-3.767 10.366-3.379 6.704.671 11.956 7.045 11.956 14.51v20.157a8.017 8.017 0 0 0 16.034 0v-12.827c0-3.768 1.603-7.381 4.401-9.912 2.834-2.564 6.516-3.766 10.366-3.379 6.704.671 11.956 7.045 11.956 14.51v20.158a8.017 8.017 0 0 0 16.034 0v-12.827c0-3.768 1.603-7.381 4.401-9.912 2.834-2.563 6.513-3.767 10.366-3.378 6.704.67 11.956 7.044 11.956 14.509v88.57z" />
                                        </svg>
                                        Đặt gói theo yêu cầu
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('printVaccinationRecord')}
                                        className={`flex cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'printVaccinationRecord'
                                                ? 'bg-blue-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            id="Icons"
                                            className="w-6 h-6 text-lg mr-4"
                                            fill="#000"
                                            viewBox="0 0 32 32"
                                        >
                                            <g id="SVGRepo_iconCarrier">
                                                <style>
                                                    {
                                                        '.st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
                                                    }
                                                </style>
                                                <path
                                                    d="M19 3v6h6l-6-6H7v26h18V9M18 14h3M18 18h3M16 22h5M13 12v1M13 19v1"
                                                    className="st0"
                                                />
                                                <path
                                                    d="M14 13h-1.5c-.8 0-1.5.7-1.5 1.5v0c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5.7 1.5 1.5v0c0 .8-.7 1.5-1.5 1.5H12"
                                                    className="st0"
                                                />
                                            </g>
                                        </svg>
                                        In phiếu
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col">
                        {employee.employeeProfile.employeeId === 1000 ? (
                            <Link
                                to={'/admin/trang-chu'}
                                className="
                            flex bg-white cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm text-black py-3 px-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-lg mr-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 4h3a2 2 0 0 1 2 2v1m-5 13h3a2 2 0 0 0 2-2v-1M4.425 19.428l6 1.8A2 2 0 0 0 13 19.312V4.688a2 2 0 0 0-2.575-1.916l-6 1.8A2 2 0 0 0 3 6.488v11.024a2 2 0 0 0 1.425 1.916zM9.001 12H9m7 0h5m0 0-2-2m2 2-2 2"
                                    />
                                </svg>
                                Đến trang Admin
                            </Link>
                        ) : (
                            ''
                        )}

                        <div
                            className="
                            dropdown dropdown-hover dropdown-right dropdown-end
                            flex bg-white cursor-pointer hover:bg-blue-200 rounded-xl font-bold text-sm text-black py-3 px-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-lg mr-4"
                                viewBox="0 0 24 24"
                            >
                                <title>{'Account Settings'}</title>
                                <path d="M9.6 3.32a3.86 3.86 0 1 0 3.86 3.85A3.85 3.85 0 0 0 9.6 3.32M16.35 11a.26.26 0 0 0-.25.21l-.18 1.27a4.63 4.63 0 0 0-.82.45l-1.2-.48a.3.3 0 0 0-.3.13l-1 1.66a.24.24 0 0 0 .06.31l1 .79a3.94 3.94 0 0 0 0 1l-1 .79a.23.23 0 0 0-.06.3l1 1.67c.06.13.19.13.3.13l1.2-.49a3.85 3.85 0 0 0 .82.46l.18 1.27a.24.24 0 0 0 .25.2h1.93a.24.24 0 0 0 .23-.2l.18-1.27a5 5 0 0 0 .81-.46l1.19.49c.12 0 .25 0 .32-.13l1-1.67a.23.23 0 0 0-.06-.3l-1-.79a4 4 0 0 0 0-.49 2.67 2.67 0 0 0 0-.48l1-.79a.25.25 0 0 0 .06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13l-1.2.52a4.07 4.07 0 0 0-.82-.45l-.18-1.27a.23.23 0 0 0-.22-.21h-1.82M9.71 13C5.45 13 2 14.7 2 16.83v1.92h9.33a6.65 6.65 0 0 1 0-5.69A13.56 13.56 0 0 0 9.71 13m7.6 1.43a1.45 1.45 0 1 1 0 2.89 1.45 1.45 0 0 1 0-2.89Z" />
                            </svg>
                            Cài đặt tài khoản
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-9999 w-52 p-2 shadow absolute"
                            >
                                <li onClick={handleOpenUpdateEmployeeProfileModal}>
                                    <span>Cập nhật hồ sơ</span>
                                </li>
                                <li onClick={handleOpenChangePasswordModal}>
                                    <span>Đổi mật khẩu</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center">
                            <button
                                //onClick={handleLogout}
                                onClick={handleOpenConfirmLogoutModal}
                                type="button"
                                className="inline-flex items-center justify-center hover:bg-blue-200 h-9 px-4 rounded-xl bg-gray-900 text-gray-300 text-sm font-semibold transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                                <span className="font-bold text-sm ml-2">Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="ml-[22%] mr-[2%] mt-8 w-4/5 h-full overflow-auto ">
                {renderContent()}
            </main>

            <AddCustomerModal
                visibleAddCustomerModal={isOpenAddCustomerModal}
                handleCloseAddCustomerModal={handleCloseAddCustomerModal}
            />

            <UpdateEmployeeProfileModal
                employeeInfo={employee}
                visibleUpdateEmployeeProfileModal={isOpenUpdateEmployeeProfileModal}
                handleCloseUpdateEmployeeProfileModal={handleCloseUpdateEmployeeProfileModal}
            />

            <ChangePasswordModal
                visibleChangePasswordModal={isOpenChangePasswordModal}
                handleCloseChangePasswordModal={handleCloseChangePasswordModal}
            />

            <ConfirmLogoutModal
                visibleConfirmLogoutModal={isOpenConfirmLogoutModal}
                handleCloseConfirmLogoutModal={handleCloseConfirmLogoutModal}
            />
        </div>
    )
}
