import React, { useState, useEffect } from 'react'
import { Table, DatePicker, Select, Tooltip } from 'antd'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import { appointmentService } from '@/services'
import { LoadingPage, MyToast } from '../common'
import {
    AddCustomerApptModal,
    AppointmentInjectionModal,
    PreInjectionCheckModal,
    sendAppointmentReminder,
} from '.'
import { getPatientInfo } from '@/utils'

const statusOptions = [
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
        label: 'Hủy hẹn',
    },
]

export const AppointmentVaccinationSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [appointmentList, setAppointmentList] = useState([])
    const [filterdAppointmentList, setFilterdAppointmentList] = useState([])
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpenAppointmentInjectionModal, setIsOpenAppointmentInjectionModal] = useState(false)
    const [isOpenAddCustomerModal, setIsOpenAddCustomerModal] = useState(false)
    const [appointmentRecord, setAppointmentRecord] = useState(null)
    const [isOpenPreInjectionCheckModal, setIsOpenPreInjectionCheckModal] = useState(false)
    const [patientInfo, setPatientInfo] = useState(null)

    useEffect(() => {
        const formatDate = dayjs(selectedDate).format('YYYY-MM-DD')
        appointmentService
            .getAppointmentListByInjectionDate(formatDate)
            .then((response) => {
                setAppointmentList(response.data.result)
                setFilterdAppointmentList(response.data.result)
            })
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [selectedDate])

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
    }

    const handleOpenPreInjectionCheckModal = async (record) => {
        const result = getPatientInfo(record)
        setPatientInfo(result)
        setIsOpenPreInjectionCheckModal(true)
    }

    const handleClosePreInjectionCheckModal = () => {
        setPatientInfo(null)
        setIsOpenPreInjectionCheckModal(false)
    }

    const handleOpenAppointmentInjectionModal = (record) => {
        setAppointmentRecord(record)
        setIsOpenAppointmentInjectionModal(true)
    }

    const handleCloseAppointmentInjectionModal = () => {
        setAppointmentRecord(null)
        setIsOpenAppointmentInjectionModal(false)
    }

    const handleOpenAddCustomerModal = (record) => {
        setAppointmentRecord(record)
        setIsOpenAddCustomerModal(true)
    }

    const handleCloseAddCustomerModal = () => {
        setAppointmentRecord(null)
        setIsOpenAddCustomerModal(false)
    }

    const handleSendEmailRemiderForNextDay = async () => {
        try {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            const formatDate = dayjs(tomorrow).format('YYYY-MM-DD')
            //console.log(formatDate)
            const response = await appointmentService.getAppointmentListByInjectionDate(formatDate)
            //console.log(response.data.result)
            const apptList = response.data.result
            if (apptList.length === 0) {
                MyToast('warn', 'Ngày mai không có cuộc hẹn.')
                return
            } else {
                apptList.forEach((record) => {
                    sendAppointmentReminder(record, setIsLoading)
                })
            }
        } catch (error) {
            MyToast('error', 'Đã xảy ra lỗi khi nhắc lịch.')
        }
    }

    useEffect(() => {
        if (searchQuery) {
            const filtered = appointmentList.filter((appt) =>
                appt.appointmentCustomerFullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilterdAppointmentList(filtered)
        } else {
            setFilterdAppointmentList(appointmentList)
        }
    }, [searchQuery, appointmentList])

    const appointmentColumns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'customerCode',
            key: 'customerCode',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'appointmentCustomerFullName',
            key: 'customerFullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'appointmentCustomerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Vắc xin',
            dataIndex: 'vaccine',
            key: 'customerVaccine',
            render: (text, record) => {
                const vaccineName = record.batchDetailResponse
                    ? record.batchDetailResponse.vaccineResponse.vaccineName
                    : record.vaccinePackageResponse?.vaccinePackageName || 'Chưa xác định'
                return <span>{vaccineName}</span>
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
                    options={statusOptions}
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

                    <div
                        onClick={() => {
                            handleOpenAppointmentInjectionModal(record)
                        }}
                    >
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
                    <div
                        onClick={() => {
                            sendAppointmentReminder(record, setIsLoading)
                        }}
                    >
                        <Tooltip placement="top" title="Nhắc lịch tiêm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <g
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                >
                                    <path d="M44 24V9H4v30h20M44 34H30M39 29l5 5-5 5" />
                                    <path d="m4 9 20 15L44 9" />
                                </g>
                            </svg>
                        </Tooltip>
                    </div>
                    {record.customerCode === 'Chưa có thông tin' && (
                        <div
                            onClick={() => {
                                handleOpenAddCustomerModal(record)
                            }}
                        >
                            <Tooltip placement="top" title="Thêm khách hàng">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <g
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.16}
                                    >
                                        <path d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                                    </g>
                                </svg>
                            </Tooltip>
                        </div>
                    )}
                </div>
            ),
        },
    ]

    return (
        <section className="bg-base-100 rounded-lg shadow-default p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                Lịch hẹn tiêm
            </h1>
            <div className="flex space-x-10 items-center">
                <div className="flex items-center my-5">
                    <span className="font-semibold">Chọn ngày muốn xem:</span>
                    <DatePicker
                        defaultValue={dayjs(selectedDate)}
                        isClearable
                        format="DD-MM-YYYY"
                        className="mx-4"
                        onChange={(date) => setSelectedDate(date)}
                    />
                </div>
                <label className="input input-bordered input-info input-sm flex items-center gap-2 w-75">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Tên khách hàng"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
                <div className="m-3">
                    <button
                        onClick={handleSendEmailRemiderForNextDay}
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-teal-500 hover:border-teal-600 hover:bg-teal-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Nhắc lịch tiêm ngày mai</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentcolor"
                                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="w-full">
                <Table
                    bordered
                    columns={appointmentColumns}
                    dataSource={filterdAppointmentList}
                    scroll={{ y: 400 }}
                    rowKey={'appointmentId'}
                />
            </div>

            <PreInjectionCheckModal
                visiblePreInjectionModal={isOpenPreInjectionCheckModal}
                handleClosePreInjectionCheckModal={handleClosePreInjectionCheckModal}
                patient={patientInfo}
            />

            <AppointmentInjectionModal
                visibleAppointmentInjectionModal={isOpenAppointmentInjectionModal}
                handleCloseAppointmentInjectionModal={handleCloseAppointmentInjectionModal}
                appointmentRecord={appointmentRecord}
            />

            <AddCustomerApptModal
                visibleAddCustomerModal={isOpenAddCustomerModal}
                handleCloseAddCustomerModal={handleCloseAddCustomerModal}
                appointmentRecord={appointmentRecord}
            />

            {isLoading && <LoadingPage title={'Đang gửi email...'} />}
        </section>
    )
}
