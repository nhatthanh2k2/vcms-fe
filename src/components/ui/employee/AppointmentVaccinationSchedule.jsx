import React, { useState } from 'react'
import { Table, DatePicker, Select } from 'antd'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import { appointmentService } from '@/services'

const options = [
    {
        value: 'PENDING',
        label: 'Đang chờ',
    },
    {
        value: 'CONFIRMED',
        label: 'Đã xác nhận',
    },
    {
        value: 'COMPLETED',
        label: 'Hoàn thành',
    },
    {
        value: 'CANCELLED',
        label: 'Hủy',
    },
]

export const AppointmentVaccinationSchedule = () => {
    const [currentDate, setCurrentDate] = useState()
    const [appointmentList, setAppointmentList] = useState([])
    const [status, setStatus] = useState('')

    const handleDateChange = async (date) => {
        const selectedDate = date
            ? dayjs(date).format('YYYY-MM-DD')
            : dayjs(new Date()).format('YYYY-MM-DD')
        try {
            const response = await appointmentService.getAppointmentListByDate(selectedDate)
            setAppointmentList(response.data.result)
        } catch (error) {
            console.error('Error fetching appointment list:', error)
        }
    }

    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'customerCode',
            key: 'customerCode',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
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
                <div className="flex space-x-2">
                    <div className="tooltip tooltip-info" data-tip="Cập nhật trạng thái">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#000"
                                d="M21.121 2.707a3 3 0 0 0-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 0 0-.263.464l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .464-.263l7.849-7.848 1.737-1.738a3 3 0 0 0 0-4.242l-.172-.172Zm-2.828 1.414a1 1 0 0 1 1.414 0l.172.172a1 1 0 0 1 0 1.414l-1.017 1.017-1.555-1.617.986-.986Zm-2.4 2.4 1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99ZM4 8a1 1 0 0 1 1-1h5a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
                            />
                        </svg>
                    </div>
                    <div className="tooltip tooltip-info" data-tip="Tạo phiếu tiêm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 tooltip"
                            data-tip="Tạo phiếu tiêm"
                            viewBox="0 0 24 24"
                        >
                            <title>{'File-New'}</title>
                            <g fill="none" fillRule="evenodd">
                                <path d="M0 0h24v24H0z" />
                                <path
                                    stroke="#0C0310"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M4 5a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 20 7.828V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
                                />
                                <path
                                    stroke="#0C0310"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M15 4v2a2 2 0 0 0 2 2h2M12 9v6M9 12h6"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            ),
        },
    ]

    const handleChooseStatus = (value) => {
        setStatus(value)
    }

    const handleUpdateStatus = (e, appointmentId, status) => {
        e.preventDefault()
        const updateStatusRequest = {
            appointmentId: appointmentId,
            appointmentStatus: status,
        }
        console.log(updateStatusRequest)
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Lịch hẹn tiêm</h2>
            <div className="flex items-center mb-4">
                <span>Chọn ngày muốn xem lịch hẹn:</span>
                <DatePicker
                    isClearable
                    format="DD-MM-YYYY"
                    className="mx-4"
                    onChange={(date) => handleDateChange(date)}
                />
            </div>
            <div className="w-full">
                <Table
                    columns={columns}
                    dataSource={appointmentList}
                    rowKey={'appointmentId'}
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
