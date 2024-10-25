import { vaccineBatchService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import dayjs from 'dayjs'
import { Table, Tooltip } from 'antd'
import { AddVaccineBatchModal } from '.'

export const VaccineBatchTable = () => {
    const [vaccineBatchList, setVaccineBatchList] = useState([])

    const handleGetVaccineBatchList = () => {
        vaccineBatchService
            .getAllBatch()
            .then((response) => setVaccineBatchList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy các lô vắc xin.'))
    }

    useEffect(() => {
        handleGetVaccineBatchList()
    }, [])

    const vaccineBatchColumns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Mã lô vắc xin',
            dataIndex: 'vaccineBatchNumber',
            key: 'vaccineBatchNumber',
        },
        {
            title: 'Số lượng vắc xin trong lô',
            dataIndex: 'vaccineBatchQuantity',
            key: 'vaccineBatchQuantity',
        },
        {
            title: 'Giá trị',
            dataIndex: 'vaccineBatchValue',
            key: 'vaccineBatchValue',
            render: (text) => BigInt(text).toLocaleString() + ' VND',
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'vaccineBatchImportDate',
            key: 'vaccineBatchImportDate',
            render: (text) => dayjs(text, 'DD-MM-YYYY').format('DD-MM-YYYY'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (record) => (
                <div className="inline-flex space-x-2 items-center rounded-md shadow-sm">
                    <Tooltip placement="top" title="Xem chi tiết">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-8 h-8"
                            >
                                <g fill="#000" fillRule="evenodd" clipRule="evenodd">
                                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                                    <path d="M21.83 11.28C19.542 7.153 15.812 5 12 5c-3.812 0-7.542 2.152-9.83 6.28a1.376 1.376 0 0 0-.01 1.308C4.412 16.8 8.163 19 12 19c3.837 0 7.588-2.199 9.84-6.412a1.376 1.376 0 0 0-.01-1.307ZM12 17c-2.939 0-5.96-1.628-7.908-5.051C6.069 8.596 9.073 7 12 7c2.927 0 5.931 1.596 7.908 4.949C17.96 15.372 14.94 17 12 17Z" />
                                </g>
                            </svg>
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ]

    const [isOpenAddVaccineBatchModal, setIsOpenAddVaccineBatchModal] = useState(false)

    const handleOpenAddVaccineBatchModal = () => {
        setIsOpenAddVaccineBatchModal(true)
    }

    const handleCloseAddVaccineBatchModal = () => {
        setIsOpenAddVaccineBatchModal(false)
    }

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-xl">
                    <input
                        placeholder="Tìm kiếm..."
                        className="rounded-full w-full bg-white py-2 px-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200 h-12"
                        type="text"
                        name="query"
                        id="query"
                    />
                    <button
                        type="submit"
                        className="absolute inline-flex items-center px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full right-3 top-2 h-8 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <svg
                            className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                        Search
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleOpenAddVaccineBatchModal}
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Nhập lô vắc xin mới</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <g stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
                                <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            <Table
                columns={vaccineBatchColumns}
                dataSource={vaccineBatchList}
                rowKey="vaccineBatchId"
            />

            <AddVaccineBatchModal
                visibleAddVaccineBatchModal={isOpenAddVaccineBatchModal}
                handleCloseAddVaccineBatchModal={handleCloseAddVaccineBatchModal}
                handleGetVaccineBatchList={handleGetVaccineBatchList}
            />
        </div>
    )
}
