import React, { useState } from 'react'
import { Table, DatePicker } from 'antd'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import { appointmentService } from '@/services'

const columns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullname',
        key: 'customerFullName',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'customerPhone',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: 'vaccine',
        key: 'customerVaccine',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'appointmentStatus',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
]

export const AppointmentSchedule = () => {
    const [currentDate, setCurrentDate] = useState(null)

    const handleDayChange = (days) => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + days)
        setCurrentDate(newDate)
    }

    const handleDateChange = async (date) => {
        setCurrentDate(date.toDate())

        const selectedDate = date ? dayjs(date).format('YYYY-MM-DD') : null

        console.log(selectedDate)
        const response = await appointmentService.getAppointmentListByDate(selectedDate)
        console.log(response.data)
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Lịch hẹn tiêm</h2>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => handleDayChange(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Previous Day
                </button>

                <DatePicker
                    isClearable
                    format="DD-MM-YYYY"
                    className="mx-4"
                    onChange={(date) => handleDateChange(date)}
                />

                <button
                    onClick={() => handleDayChange(1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Next Day
                </button>
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
