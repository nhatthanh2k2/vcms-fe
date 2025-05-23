import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailOfSampleBatch } from '@/redux'
import { Input, Table, Tooltip } from 'antd'

import dayjs from 'dayjs'
import { batchDetailService, priceHistoryService } from '@/services'
import { MyToast } from '../../common'
import { PriceHistoryModal } from '.'

export const VaccinePriceTable = () => {
    const dispatch = useDispatch()
    const { batchDetailList, loading } = useSelector((state) => state.batchDetail)
    const [filteredDetailList, setFilteredDetailList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [vaccinePrice, setVaccinePrice] = useState()
    const [oldPrice, setOldPrice] = useState(null)

    useEffect(() => {
        dispatch(fetchDetailOfSampleBatch())
    }, [dispatch])

    useEffect(() => {
        setFilteredDetailList
    }, [batchDetailList])

    useEffect(() => {
        if (searchQuery) {
            const filtered = batchDetailList.filter((detail) =>
                detail.vaccineResponse.vaccineName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredDetailList(filtered)
        } else {
            setFilteredDetailList(batchDetailList)
        }
    }, [searchQuery, batchDetailList])

    const handleEditStart = (record) => {
        setOldPrice(record.batchDetailVaccinePrice)
    }

    const handlePriceChange = (e, record) => {
        const newPrice = e.target.value
        setVaccinePrice(newPrice)
        setFilteredDetailList((prevList) =>
            prevList.map((item) =>
                item.batchDetailId === record.batchDetailId
                    ? { ...item, batchDetailVaccinePrice: newPrice }
                    : item
            )
        )
    }

    const handleAddPriceHistory = async (request) => {
        try {
            const response = await priceHistoryService.addPriceHistory(request)
            if (response.data.code === 1000) {
                console.log('OKE')
            } else {
                console.log('ERROR')
            }
        } catch (error) {
            console.log('ERROR')
        }
    }

    const handleUpdateVaccinePrice = async (record) => {
        const request = {
            batchDetailId: record.batchDetailId,
            newPrice: vaccinePrice,
        }
        const priceHistoryRequest = {
            vaccineId: record.vaccineResponse.vaccineId,
            oldPrice: oldPrice,
            newPrice: vaccinePrice,
        }

        console.log(priceHistoryRequest)

        try {
            const response = await batchDetailService.updateVaccinePrice(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Cập nhật giá vắc xin thành công.')

                handleAddPriceHistory(priceHistoryRequest)
                dispatch(fetchDetailOfSampleBatch())
            } else MyToast('error', 'Xảy ra lỗi khi cập nhật. Hãy thử lại sau.')
        } catch (error) {
            if (error.response) MyToast('error', 'Không tìm thấy vắc xin để cập nhật.')
        }
    }

    const [isOpenPriceHistoryModal, setIsOpenPriceHistoryModal] = useState(false)
    const [recordSelected, setRecordSelected] = useState(null)

    const handleOpenPriceHistoryModal = (record) => {
        setRecordSelected(record)
        setIsOpenPriceHistoryModal(true)
    }

    const handleClosePriceHistoryModal = () => {
        setRecordSelected(null)
        setIsOpenPriceHistoryModal(false)
    }

    const vaccinePriceColumns = [
        {
            title: 'Tên vắc xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
            render: (name, record) => name,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'batchDetailVaccinePrice',
            key: 'price',
            render: (price, record) => (
                <Input
                    value={price}
                    onFocus={() => handleEditStart(record)}
                    onChange={(e) => handlePriceChange(e, record)}
                    suffix="VNĐ"
                />
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: ['vaccineResponse', 'vaccineCreateAt'],
            key: 'vaccineCreateAt',
            render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('HH:mm:ss DD-MM-YYYY'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: ['vaccineResponse', 'vaccineUpdateAt'],
            key: 'vaccineUpdateAt',
            render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('HH:mm:ss DD-MM-YYYY'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',

            render: (_, record) => (
                <div className="flex justify-center items-center">
                    <Tooltip
                        placement="top"
                        title="Cập nhật giá vắc xin"
                        key={`update-price-${record.vaccineId}`}
                    >
                        <svg
                            onClick={() => handleUpdateVaccinePrice(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 -0.5 25 25"
                        >
                            <path
                                stroke="#2b0fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="m17.7 5.128 1.566 1.247a.748.748 0 0 1-.006 1.095l-1.19 1.424-4.049 4.829a.517.517 0 0 1-.27.163l-2.1.476a.529.529 0 0 1-.551-.46v-2.158a.464.464 0 0 1 .119-.28l3.974-4.493 1.364-1.63a.868.868 0 0 1 1.143-.213Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="#2b0fff"
                                d="M12.033 7.619a.75.75 0 0 0 0-1.5v1.5Zm-2.8-.75v-.75h-.002l.002.75ZM5.5 10.619h.75v-.002l-.75.002Zm0 5.625.75.001v-.001H5.5Zm3.733 3.75-.002.75h.002v-.75Zm5.6 0v.75h.002l-.002-.75Zm3.733-3.75h-.75v.001l.75-.001Zm.75-3.75a.75.75 0 1 0-1.5 0h1.5Zm-3.43-5.81a.75.75 0 0 0-1.386.573l1.386-.573Zm2.346 2.938a.75.75 0 0 0-.324-1.465l.324 1.465ZM8.3 16.432a.75.75 0 1 0 0 1.5v-1.5Zm7.467 1.5a.75.75 0 0 0 0-1.5v1.5ZM12.033 6.119h-2.8v1.5h2.8v-1.5Zm-2.802 0A4.492 4.492 0 0 0 4.75 10.62l1.5-.003a2.992 2.992 0 0 1 2.985-2.998l-.004-1.5Zm-4.481 4.5v5.625h1.5v-5.625h-1.5Zm0 5.623a4.492 4.492 0 0 0 4.481 4.502l.004-1.5a2.992 2.992 0 0 1-2.985-2.999l-1.5-.003Zm4.483 4.502h5.6v-1.5h-5.6v1.5Zm5.602 0a4.492 4.492 0 0 0 4.481-4.502l-1.5.003a2.992 2.992 0 0 1-2.985 2.999l.004 1.5Zm4.481-4.5v-3.75h-1.5v3.75h1.5ZM14.5 7.257a4.653 4.653 0 0 0 1.187 1.658c.607.53 1.48.942 2.545.707l-.324-1.465c-.465.103-.869-.053-1.237-.373a3.16 3.16 0 0 1-.785-1.1l-1.386.573ZM8.3 17.932h7.467v-1.5H8.3v1.5Z"
                            />
                        </svg>
                    </Tooltip>

                    <Tooltip placement="top" title="Lịch sử thay đổi giá">
                        <svg
                            onClick={() => handleOpenPriceHistoryModal(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 48 48"
                        >
                            <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
                            <path
                                fill="#2F88FF"
                                stroke="#000"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M13 10h28v34H13z"
                            />
                            <path
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M35 10V4H8a1 1 0 0 0-1 1v33h6"
                            />
                            <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M21 22h12M21 30h12"
                            />
                        </svg>
                    </Tooltip>
                </div>
            ),
        },
    ]

    return (
        <>
            {' '}
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
                    </div>
                )}
                loading={loading}
                bordered
                columns={vaccinePriceColumns}
                dataSource={filteredDetailList}
                rowKey={'batchDetailId'}
            />
            <PriceHistoryModal
                visiblePriceHistoryModal={isOpenPriceHistoryModal}
                handleClosePriceHistoryModal={handleClosePriceHistoryModal}
                record={recordSelected}
            />
        </>
    )
}
