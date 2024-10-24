import { vaccineService } from '@/services'
import { Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import dayjs from 'dayjs'
import { render } from 'react-dom'

export const VaccineTable = () => {
    const [vaccineList, setVaccineList] = useState([])

    useEffect(() => {
        vaccineService
            .getAllVaccines()
            .then((response) => setVaccineList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh sách vắc xin.'))
    }, [])

    console.log(vaccineList)

    const vaccineColumns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Mã Vaccine',
            dataIndex: 'vaccineCode',
            key: 'vaccineCode',
        },
        {
            title: 'Tên Vaccine',
            dataIndex: 'vaccineName',
            key: 'vaccineName',
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'vaccineOrigin',
            key: 'vaccineOrigin',
        },
        {
            title: 'Ngày thêm',
            dataIndex: 'vaccineCreateAt',
            key: 'vaccineCreateAt',
            render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (record) => (
                <div className="inline-flex space-x-2 items-center rounded-md shadow-sm">
                    <Tooltip placement="top" title="Chỉnh sửa vắc xin">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </div>
                    </Tooltip>

                    <Tooltip placement="top" title="Xóa vắc xin">
                        <div className=" hover:text-red-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ]

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
                    <button className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span className="mr-2">Thêm vắc xin</span>
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

            <Table rowKey="vaccineId" columns={vaccineColumns} dataSource={vaccineList} />
        </div>
    )
}
