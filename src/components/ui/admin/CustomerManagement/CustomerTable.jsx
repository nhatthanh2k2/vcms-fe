import { Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { CustomerDetailModal } from '.'
import { appointmentService, customerService, orderService } from '@/services'

export const CustomerTable = () => {
    const [customerList, setCustomerList] = useState([])
    const [isOpenCustomerDetailModal, setIsOpenCustomerDetailModal] = useState(false)
    const [customerSelected, setCustomerSelected] = useState(null)
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])
    const [myAppointmentList, setMyAppointmentList] = useState([])
    const [myOrderList, setMyOrderList] = useState([])

    useEffect(() => {
        customerService
            .getAllCustomers()
            .then((response) => setCustomerList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh sách khách hàng.'))
    }, [])

    const getMyVaccinationReordHistory = async (request) => {
        try {
            const response = await customerService.getMyVaccinationHistory(request)

            if (response.data.code === 1000) {
                const recordList = response.data.result
                setVaccinationRecordList(recordList)
            }
        } catch (error) {
            console.log('Không có dữ liệu')
        }
    }

    const getMyAppointmentList = async (request) => {
        try {
            const response = await appointmentService.getMyAppontmentList(request)

            if (response.data.code === 1000) {
                const appointmentList = response.data.result
                setMyAppointmentList(appointmentList)
            } else {
                console.log('Không có dữ liệu')
            }
        } catch (error) {
            //MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
            console.log('Không có dữ liệu')
        }
    }

    const getMyOrderList = async (request) => {
        try {
            const response = await orderService.getMyOrderList(request)

            if (response.data.code === 1000) {
                const orderList = response.data.result
                setMyOrderList(orderList)
            } else {
                console.log('Không có dữ liệu')
            }
        } catch (error) {
            //MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
            console.log('Không có dữ liệu')
        }
    }

    const handleOpenCustomerDetailModal = async (record) => {
        console.log(record)
        const lookupData = {
            customerIdentifier: record.customerPhone,
            customerDob: record.customerDob,
        }
        setCustomerSelected(record)
        getMyVaccinationReordHistory(lookupData)
        getMyAppointmentList(lookupData)
        getMyOrderList(lookupData)
        setIsOpenCustomerDetailModal(true)
    }

    const handleCloseCustomerDetailModal = () => {
        setCustomerSelected(null)
        setVaccinationRecordList([])
        setMyAppointmentList([])
        setMyOrderList([])
        setIsOpenCustomerDetailModal(false)
    }

    const customerColumns = [
        {
            title: 'Mã KH',
            dataIndex: 'customerCode',
            key: 'customerCode',
        },
        {
            title: 'Tên KH',
            dataIndex: 'customerFullName',
            key: 'customerFullName',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'customerDob',
            key: 'customerDob',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Email',
            dataIndex: 'customerEmail',
            key: 'customerEmail',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <div className="flex justify-center">
                    <Tooltip placement="top" title="Xem chi tiết">
                        <svg
                            onClick={() => handleOpenCustomerDetailModal(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 48 48"
                        >
                            <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
                            <rect
                                width={32}
                                height={40}
                                x={8}
                                y={4}
                                fill="#2F88FF"
                                stroke="#000"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                rx={2}
                            />
                            <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M21 14h12M21 24h12M21 34h12"
                            />
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M15 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Tooltip>
                </div>
            ),
        },
    ]

    const [filteredCustomerList, setFilteredCustomerList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        if (searchQuery) {
            const filtered = customerList.filter((customer) =>
                customer.customerFullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredCustomerList(filtered)
        } else {
            setFilteredCustomerList(customerList)
        }
    }, [searchQuery, customerList])

    return (
        <div className="bg-white shadow-default">
            <Table
                bordered
                title={() => (
                    <div className="">
                        <div className="relative w-full max-w-xl">
                            <input
                                placeholder="Tìm kiếm tên khách hàng..."
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
                columns={customerColumns}
                dataSource={filteredCustomerList}
                rowKey={'customerCode'}
            />
            <CustomerDetailModal
                visibleCustomerDetailModal={isOpenCustomerDetailModal}
                handleCloseCustomerDetailModal={handleCloseCustomerDetailModal}
                customerSelected={customerSelected}
                vaccinationList={vaccinationRecordList}
                appointmentList={myAppointmentList}
                orderList={myOrderList}
            />
        </div>
    )
}
