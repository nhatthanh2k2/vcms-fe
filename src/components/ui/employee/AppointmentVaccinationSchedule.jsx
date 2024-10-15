import React, { useState, useEffect } from 'react'
import { Table, DatePicker, Select, Tooltip } from 'antd'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import { appointmentService, customerService } from '@/services'
import { MyToast } from '../common'
import { PreInjectionCheckModal } from '.'
import { getPatientInfo } from '@/utils'

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
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [appointmentList, setAppointmentList] = useState([])
    const [status, setStatus] = useState('')
    const [appointmentSelected, setAppointmentSelected] = useState()

    useEffect(() => {
        const formatDate = dayjs(selectedDate).format('YYYY-MM-DD')
        appointmentService
            .getAppointmentListByInjectionDate(formatDate)
            .then((response) => setAppointmentList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [selectedDate])

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
                <div className="flex space-x-2 justify-center">
                    <div
                        onClick={(e) => {
                            handleUpdateStatus(e, record.appointmentId)
                        }}
                    >
                        <Tooltip placement="top" title="Cập nhật trạng thái">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#000"
                                    d="M21.121 2.707a3 3 0 0 0-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 0 0-.263.464l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .464-.263l7.849-7.848 1.737-1.738a3 3 0 0 0 0-4.242l-.172-.172Zm-2.828 1.414a1 1 0 0 1 1.414 0l.172.172a1 1 0 0 1 0 1.414l-1.017 1.017-1.555-1.617.986-.986Zm-2.4 2.4 1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99ZM4 8a1 1 0 0 1 1-1h5a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
                                />
                            </svg>
                        </Tooltip>
                    </div>

                    <div>
                        <Tooltip placement="top" title="Tạo phiếu tiêm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
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
                        </Tooltip>
                    </div>

                    <div onClick={() => handleOpenPreInjectionCheckModal(record)}>
                        <Tooltip placement="top" title="Tạo phiếu khám sàng lọc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                stroke="#000"
                                strokeWidth={0.32}
                                viewBox="0 0 18 18"
                            >
                                <path
                                    d="M11.5 13a.5.5 0 0 0-.5.5V15H1V3h2v.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V3h2v.5a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5H9v-.5A1.5 1.5 0 0 0 7.5 0h-3A1.5 1.5 0 0 0 3 1.5V2H.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5ZM4 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H4Zm11.854 4.646-2-2a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 7 10.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .354-.146l6-6a.5.5 0 0 0 0-.708ZM8 12v-1.293l5.5-5.5L14.793 6.5l-5.5 5.5Zm-2 .5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5Zm0-3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5ZM8.5 7h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1Z"
                                    data-name="Path 184"
                                />
                            </svg>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ]

    const handleChooseStatus = (value) => {
        setStatus(value)
    }

    const handleUpdateStatus = async (e, appointmentId) => {
        e.preventDefault()
        const updateStatusRequest = {
            appointmentId: appointmentId,
            appointmentStatus: status,
        }
        if (updateStatusRequest.appointmentStatus === '') {
            MyToast('warn', 'Bạn chưa thay đổi trạng thái')
            return
        }
        try {
            const response = await appointmentService.updateAppointmentStatus(updateStatusRequest)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Cập nhật trạng thái thành công')
                }
            } else MyToast('error', 'Xảy ra lỗi khi cập nhật trạng thái')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) MyToast('error', 'Không tìm thấy cuộc hẹn')
            }
        }
        console.log(updateStatusRequest)
    }

    const [isOpenPreInjectionCheckModal, setIsOpenPreInjectionCheckModal] = useState(false)
    const [patientInfo, setPatientInfo] = useState(null)

    const handleOpenPreInjectionCheckModal = async (record) => {
        const result = getPatientInfo(record)
        setPatientInfo(result)

        setIsOpenPreInjectionCheckModal(true)
    }

    const handleClosePreInjectionCheckModal = () => {
        setIsOpenPreInjectionCheckModal(false)
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Lịch hẹn tiêm</h2>
            <div className="flex items-center mb-4">
                <span>Chọn ngày muốn xem lịch hẹn:</span>
                <DatePicker
                    defaultValue={dayjs(selectedDate)}
                    isClearable
                    format="DD-MM-YYYY"
                    className="mx-4"
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>
            <div className="w-full">
                <Table
                    columns={columns}
                    dataSource={appointmentList}
                    scroll={{ y: 400 }}
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
                                <p>Chưa có lịch hẹn</p>
                            </div>
                        ),
                    }}
                />
            </div>

            <PreInjectionCheckModal
                visivlePreInjectionModal={isOpenPreInjectionCheckModal}
                handleClosePreInjectionCheckModal={handleClosePreInjectionCheckModal}
                patient={patientInfo}
            />
        </section>
    )
}
