import React from 'react'
import { Table, DatePicker } from 'antd'

export const OrderVaccinationSchedule = () => {
    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'appointmentCustomerFullName',
            key: 'customerFullName',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'appointmentCustomerPhone',
            key: 'customerPhone',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Vắc xin',
            dataIndex: 'vaccine',
            key: 'customerVaccine',
            render: (text, record) => {
                const vaccineName = record.batchDetailResponse
                    ? record.batchDetailResponse.vaccineResponse.vaccineName
                    : record.vaccinePackageResponse?.vaccinePackageName || 'Chưa xác định'
                return <span className="font-semibold">{vaccineName}</span>
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'appointmentStatus',
            key: 'appointmentStatus',
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    style={{ width: 150 }}
                    onChange={handleChooseStatus}
                    options={options}
                ></Select>
            ),
        },
        {
            title: '',
            key: 'updateStatus',
            render: (text, record) => (
                <button
                    type="button"
                    className="text-base rounded-md border-l-0 border-r-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2  font-bold cursor-pointer 
                        hover:bg-yellow-500 hover:text-white  bg-yellow-300   text-yellow-800 border duration-200 ease-in-out  border-yellow-500 transition"
                >
                    <div className="flex leading-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit w-5 h-5 mr-1"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Cập nhật
                    </div>
                </button>
            ),
        },
    ]
    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Lịch tiêm từ đơn hàng</h2>
            <div className="flex items-center mb-4">
                <span>Chọn ngày muốn xem:</span>
                <DatePicker isClearable format="DD-MM-YYYY" className="mx-4" />
            </div>
            <div className="w-full">
                <Table
                    columns={columns}
                    locale={{
                        emptyText: (
                            <div className="flex flex-col items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    style={{ filter: 'blur(1px)' }}
                                >
                                    <path fill="#fff" d="M0 0h24v24H0z" />
                                    <path
                                        stroke="#000"
                                        strokeLinejoin="round"
                                        d="m3 15 .924-11.083A1 1 0 0 1 4.92 3h14.16a1 1 0 0 1 .996.917L21 15M3 15v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5M3 15h6c0 1 .6 3 3 3s3-2 3-3h6"
                                    />
                                </svg>
                                <p>Chưa có dữ liệu</p>
                            </div>
                        ),
                    }}
                />
            </div>
        </section>
    )
}
