import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Table, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { DeleteVaccinePackageModal } from '.'

export const VaccinePackageTable = () => {
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [loading, setLoading] = useState(true)

    const getVaccinePackageList = () => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => {
                setVaccinePackageList(response.data.result)
                setLoading(false)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục gói vắc xin.'))
    }

    useEffect(() => {
        getVaccinePackageList()
    }, [])

    const [isOpenDeleteVaccinePackageModal, setIsOpenDeleteVaccinePackageModal] = useState(false)
    const [vaccinePackageSelected, setVaccinePackageSelected] = useState(null)

    const handleOpenDeleteVaccinePackageModal = (record) => {
        setVaccinePackageSelected(record)
        setIsOpenDeleteVaccinePackageModal(true)
    }

    const handleCloseDeleteVaccinePackageModal = () => {
        setVaccinePackageSelected(null)
        setIsOpenDeleteVaccinePackageModal(false)
    }

    const vaccinePackageColumns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Tên gói vắc xin',
            dataIndex: 'vaccinePackageName',
            key: 'vaccinePackageName',
            render: (name, record) => <span>{name}</span>,
        },
        {
            title: 'Giá gói vắc xin',
            dataIndex: 'vaccinePackagePrice',
            key: 'vaccinePackagePrice',
            render: (price) => <span>{price.toLocaleString()} VND</span>,
        },
        {
            title: 'Ngày tạo gói',
            dataIndex: 'vaccinePackageCreateAt',
            key: 'vaccinePackageCreateAt',
            render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <div className="inline-flex space-x-2 items-center rounded-md shadow-sm">
                    <Tooltip placement="top" title="Chỉnh sửa gói">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#000"
                                fillRule="evenodd"
                                d="M21.121 2.707a3 3 0 0 0-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 0 0-.263.464l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .464-.263l7.849-7.848 1.737-1.738a3 3 0 0 0 0-4.242l-.172-.172Zm-2.828 1.414a1 1 0 0 1 1.414 0l.172.172a1 1 0 0 1 0 1.414l-1.017 1.017-1.555-1.617.986-.986Zm-2.4 2.4 1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99ZM4 8a1 1 0 0 1 1-1h5a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Tooltip>

                    <Tooltip placement="top" title="Xóa gói vắc xin">
                        <svg
                            onClick={() => handleOpenDeleteVaccinePackageModal(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <g
                                stroke="red"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            >
                                <path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
                            </g>
                        </svg>
                    </Tooltip>
                </div>
            ),
        },
    ]

    const navigate = useNavigate()

    const handleToAddVaccinePackagePage = () => {
        navigate('/admin/quan-ly/goi-vac-xin/them-goi-vac-xin')
    }

    return (
        <div className="flex flex-col space-y-5">
            <Table
                title={() => (
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
                                onClick={handleToAddVaccinePackagePage}
                                className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                            >
                                <span className="mr-2">Thêm gói vắc xin</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <g
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth={1.5}
                                    >
                                        <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                rowKey={'vaccinePackageId'}
                dataSource={vaccinePackageList}
                columns={vaccinePackageColumns}
                loading={loading}
            />

            <DeleteVaccinePackageModal
                visibleDeleteVaccinePackageModal={isOpenDeleteVaccinePackageModal}
                handleCloseDeleteVaccinePackageModal={handleCloseDeleteVaccinePackageModal}
                vaccinePackageSelected={vaccinePackageSelected}
                getVaccinePackageList={getVaccinePackageList}
            />
        </div>
    )
}
