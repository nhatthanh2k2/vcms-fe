import { diseaseService, employeeService } from '@/services'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { MyToast } from '../../common'
import { Table, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { AddDiseaseModal, DeleteDiseaseModal } from '.'

export const DiseaseTable = () => {
    const [diseaseList, setDiseaseList] = useState([])
    const [filteredDiseaseList, setFilteredDiseaseList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const getDiseaseList = () => {
        diseaseService
            .getAllDiseases()
            .then((response) => {
                setDiseaseList(response.data.result)
                setFilteredDiseaseList(response.data.result)
                setLoading(false)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi lấy danh sách nhân viên.'))
    }

    useEffect(() => {
        getDiseaseList()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const filtered = diseaseList.filter((disease) =>
                disease.diseaseName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredDiseaseList(filtered)
        } else {
            setFilteredDiseaseList(diseaseList)
        }
    }, [searchQuery, diseaseList])

    const diseaseColumns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
            width: 50,
        },
        {
            title: 'Tên bệnh',
            dataIndex: 'diseaseName',
            key: 'diseaseName',
        },

        {
            title: 'Ngày thêm',
            dataIndex: 'diseaseCreateAt',
            key: 'diseaseCreateAt',
            render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <div onClick={() => handleOpenDeleteDiseaseModal(record.diseaseId)}>
                    <Tooltip placement="top" title="Xóa bệnh">
                        <svg
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

    const [isOpenAddDiseaseModal, setIsOpenAddDiseaseModal] = useState(false)

    const handleOpenAddDiseaseModal = () => {
        setIsOpenAddDiseaseModal(true)
    }

    const handleCloseAddDiseaseModal = () => {
        setIsOpenAddDiseaseModal(false)
    }

    const [isOpenDeleteDiseaseModal, setIsOpenDeleteDiseaseModal] = useState(false)
    const [diseaseSelected, setDiseaseSelected] = useState(null)

    const handleOpenDeleteDiseaseModal = (diseaseId) => {
        setDiseaseSelected(diseaseId)
        setIsOpenDeleteDiseaseModal(true)
    }

    const handleCloseDeleteDiseaseModal = () => {
        setDiseaseSelected(null)
        setIsOpenDeleteDiseaseModal(false)
    }

    const pagination = {
        current: currentPage,
        pageSize: pageSize,
        total: diseaseList.length,
        onChange: (page, pageSize) => {
            setCurrentPage(page)
            setPageSize(pageSize)
        },
    }

    return (
        <div className="flex flex-col space-y-5 bg-white shadow-default">
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                onClick={handleOpenAddDiseaseModal}
                                className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                            >
                                <span className="mr-2">Thêm bệnh mới</span>
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
                bordered
                columns={diseaseColumns}
                dataSource={filteredDiseaseList}
                rowKey="diseaseId"
                loading={loading}
                pagination={pagination}
            />

            <AddDiseaseModal
                visibleOpenAddDiseaseModal={isOpenAddDiseaseModal}
                handleCloseAddDiseaseModal={handleCloseAddDiseaseModal}
                getDiseaseList={getDiseaseList}
            />

            <DeleteDiseaseModal
                visibleOpenDeleteDiseaseModal={isOpenDeleteDiseaseModal}
                handleCloseDeleteDiseaseModal={handleCloseDeleteDiseaseModal}
                diseaseSelected={diseaseSelected}
                getDiseaseList={getDiseaseList}
            />
        </div>
    )
}
