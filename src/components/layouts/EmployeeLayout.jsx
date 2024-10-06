import React, { useState, useEffect } from 'react'
import {
    AppointmentSchedule,
    BookVaccination,
    CustomerLookup,
    CustomizableVaccinePackage,
    PrintVaccinationRecord,
} from '../ui'
import { batchDetailService, vaccinePackageService, vaccineService } from '@/services'

export const EmployeeLayout = () => {
    const [activeTab, setActiveTab] = useState('customerLookup')
    const [batchDetailList, setBatchDetailList] = useState([])
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [vaccineList, setVaccineList] = useState([])

    useEffect(() => {
        batchDetailService
            .getDetail()
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
            case 'appointmentSchedule':
                return <AppointmentSchedule />
            case 'bookVaccination':
                return (
                    <BookVaccination
                        batchDetailList={batchDetailList}
                        vaccinePackageList={vaccinePackageList}
                        vaccineList={vaccineList}
                    />
                )
            case 'printVaccinationRecord':
                return <PrintVaccinationRecord />
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

    return (
        <div className=" bg-employee overflow-hidden flex items-start min-h-screen">
            <aside className="w-1/5 bg-white shadow-md h-screen ">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex-grow">
                        <div className="px-4 py-6 text-center ">
                            <div className="text-3xl font-bold leading-tight ">
                                <span className="inline text-blue-700 rounded">T-Vax</span> Company
                            </div>
                        </div>
                        <div className="border-2 border-orange-400"></div>
                        <div className="p-4">
                            <ul className="space-y-1">
                                <li>
                                    <div
                                        onClick={() => setActiveTab('customerLookup')}
                                        className={`flex items-center cursor-pointer hover:bg-yellow-50 hover:text-black rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'customerLookup'
                                                ? 'bg-yellow-50'
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
                                        onClick={() => setActiveTab('appointmentSchedule')}
                                        className={`flex cursor-pointer hover:bg-yellow-50 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'appointmentSchedule'
                                                ? 'bg-yellow-50'
                                                : 'bg-white'
                                        }`}
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
                                                d="m8 6 13 .001m-13 6h13m-13 6h13M3.5 6h.01m-.01 6h.01m-.01 6h.01M4 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                                            />
                                        </svg>
                                        Danh sách cuộc hẹn
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('bookVaccination')}
                                        className={`flex cursor-pointer hover:bg-yellow-50 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'bookVaccination'
                                                ? 'bg-yellow-50'
                                                : 'bg-white'
                                        }`}
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
                                                d="M3 9h18m-9 9v-6m3 3.001L9 15M7 3v2m10-2v2M6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21Z"
                                            />
                                        </svg>
                                        Đăng ký vắc xin
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('CustomizableVaccinePackage')}
                                        className={`flex cursor-pointer hover:bg-yellow-50 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'CustomizableVaccinePackage'
                                                ? 'bg-yellow-50'
                                                : 'bg-white'
                                        }`}
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
                                                d="M3 9h18m-9 9v-6m3 3.001L9 15M7 3v2m10-2v2M6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21Z"
                                            />
                                        </svg>
                                        Đặt gói theo yêu cầu
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab('printVaccinationRecord')}
                                        className={`flex cursor-pointer hover:bg-yellow-50 rounded-xl font-bold text-sm py-3 px-4 ${
                                            activeTab === 'printVaccinationRecord'
                                                ? 'bg-yellow-50'
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
                                        In phiếu tiêm
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col">
                        <div>
                            <div className="flex bg-white cursor-pointer hover:bg-yellow-50 rounded-xl font-bold text-sm text-black py-3 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-lg mr-4"
                                    viewBox="0 0 24 24"
                                >
                                    <title>{'Account Settings'}</title>
                                    <path d="M9.6 3.32a3.86 3.86 0 1 0 3.86 3.85A3.85 3.85 0 0 0 9.6 3.32M16.35 11a.26.26 0 0 0-.25.21l-.18 1.27a4.63 4.63 0 0 0-.82.45l-1.2-.48a.3.3 0 0 0-.3.13l-1 1.66a.24.24 0 0 0 .06.31l1 .79a3.94 3.94 0 0 0 0 1l-1 .79a.23.23 0 0 0-.06.3l1 1.67c.06.13.19.13.3.13l1.2-.49a3.85 3.85 0 0 0 .82.46l.18 1.27a.24.24 0 0 0 .25.2h1.93a.24.24 0 0 0 .23-.2l.18-1.27a5 5 0 0 0 .81-.46l1.19.49c.12 0 .25 0 .32-.13l1-1.67a.23.23 0 0 0-.06-.3l-1-.79a4 4 0 0 0 0-.49 2.67 2.67 0 0 0 0-.48l1-.79a.25.25 0 0 0 .06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13l-1.2.52a4.07 4.07 0 0 0-.82-.45l-.18-1.27a.23.23 0 0 0-.22-.21h-1.82M9.71 13C5.45 13 2 14.7 2 16.83v1.92h9.33a6.65 6.65 0 0 1 0-5.69A13.56 13.56 0 0 0 9.71 13m7.6 1.43a1.45 1.45 0 1 1 0 2.89 1.45 1.45 0 0 1 0-2.89Z" />
                                </svg>
                                Cài đặt tài khoản
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 text-sm font-semibold transition"
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
                            </button>{' '}
                            <span className="font-bold text-sm ml-2">Logout</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="mx-16 mt-16 w-4/5 h-full overflow-auto ">{renderContent()}</main>
        </div>
    )
}
