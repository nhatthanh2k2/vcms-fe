import { customerService } from '@/services'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'

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
]

export const CustomerTable = () => {
    const [customerList, setCustomerList] = useState([])

    useEffect(() => {
        customerService
            .getAllCustomers()
            .then((response) => setCustomerList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh sách khách hàng.'))
    }, [])

    return (
        <div className="bg-white shadow-default">
            <Table
                bordered
                title={() => (
                    <div className="">
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
                    </div>
                )}
                columns={customerColumns}
                dataSource={customerList}
            />
        </div>
    )
}
