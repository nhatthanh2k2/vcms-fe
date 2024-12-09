import { screeningRecordService, vaccinationRecordService, vaccineBatchService } from '@/services'
import { DatePicker, Table, Tooltip } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../common'
import { convertScreeningResult } from '@/utils'
import { PrintScreeningRecordModal, PrintVaccinationRecordModal } from './Modal'

const convertRecordStatus = (status) => {
    switch (status) {
        case 'NOT_PRINTED':
            return 'Chưa in'
        case 'PRINTED':
            return 'Đã in'
        case 'CANCELED':
            return 'Đã hủy'
        default:
            break
    }
}

export const PrintRecord = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [screeningRecordList, setScreeningRecordList] = useState([])
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])

    useEffect(() => {
        const createDate = dayjs(selectedDate).format('YYYY-MM-DD')
        screeningRecordService
            .getScreeningRecordByCreateDate(createDate)
            .then((response) => setScreeningRecordList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy phiếu khám.'))
        vaccinationRecordService
            .getVaccinationRecordByCreateDate(createDate)
            .then((response) => setVaccinationRecordList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy phiếu tiêm.'))
    }, [selectedDate])

    const [isOpenPrintScreeningRecordModal, setIsOpenPrintScreeningRecordModal] = useState(false)
    const [screeningRecordSelected, setScreeningRecordSelected] = useState(null)

    const handleOpenPrintScreeningRecordModal = (record) => {
        setScreeningRecordSelected(record)
        setIsOpenPrintScreeningRecordModal(true)
    }

    const handleClosePrintScreeningRecordModal = () => {
        setIsOpenPrintScreeningRecordModal(false)
        setScreeningRecordSelected(null)
    }

    const [isOpenPrintVaccinationRecordModal, setIsOpenPrintVaccinationRecordModal] =
        useState(false)
    const [vaccinationRecordSelected, setVaccinationRecordSelected] = useState(null)

    const handleOpenPrintVaccinationRecordModal = (record) => {
        setVaccinationRecordSelected(record)
        setIsOpenPrintVaccinationRecordModal(true)
    }

    const handleClosePrintVaccinationRecordModal = () => {
        setIsOpenPrintVaccinationRecordModal(false)
        setVaccinationRecordSelected(null)
    }

    const screeningColumns = [
        {
            title: 'Mã phiếu khám',
            dataIndex: 'screeningRecordCode',
            key: 'screeningRecordCode',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'customerResponse',
            key: 'customerFullName',
            render: (text, record) => <span>{record.customerResponse.customerFullName}</span>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'customerResponse',
            key: 'customerPhone',
            render: (text, record) => <span>{record.customerResponse.customerPhone}</span>,
        },
        {
            title: 'Người tạo phiếu',
            dataIndex: 'employeeResponse',
            key: 'employeeFullName',
            render: (text, record) => <span>{record.employeeResponse.employeeFullName}</span>,
        },
        {
            title: 'Kết quả khám',
            dataIndex: 'screeningRecordResult',
            key: 'screeningRecordResult',
            render: (text) => <span>{convertScreeningResult(text)}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'screeningRecordStatus',
            key: 'screeningRecordStatus',
            render: (status) => <span>{convertRecordStatus(status)}</span>,
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-1">
                    <Tooltip placement="top" title="In phiếu khám">
                        <svg
                            onClick={() => handleOpenPrintScreeningRecordModal(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 18h-.8c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8v-4.6c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 7 5.08 7 6.2 7H7m10 11h.8c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 16.48 21 15.92 21 14.8v-4.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 7 18.92 7 17.8 7H17M7 11h.01M17 7V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 3 15.96 3 15.4 3H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 3.76 7 4.04 7 4.6V7m10 0H7m1.6 14h6.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C17 20.24 17 19.96 17 19.4v-2.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 15 15.96 15 15.4 15H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 15.76 7 16.04 7 16.6v2.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C7.76 21 8.04 21 8.6 21Z"
                            />
                        </svg>
                    </Tooltip>
                    <Tooltip placement="top" title="Hủy phiếu khám">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon w-6 h-6"
                            viewBox="0 0 1024 1024"
                        >
                            <path
                                fill="#D50000"
                                d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384zm0 85.333c66.133 0 128 23.467 179.2 59.734L273.067 691.2C236.8 640 213.333 578.133 213.333 512c0-164.267 134.4-298.667 298.667-298.667zm0 597.334c-66.133 0-128-23.467-179.2-59.734L750.933 332.8C787.2 384 810.667 445.867 810.667 512c0 164.267-134.4 298.667-298.667 298.667z"
                            />
                        </svg>
                    </Tooltip>
                </div>
            ),
        },
    ]

    const vaccinationColumns = [
        {
            title: 'Mã phiếu tiêm',
            dataIndex: 'vaccinationRecordCode',
            key: 'vaccinationRecordCode',
        },
        {
            title: 'Tên người tiêm',
            dataIndex: ['customerResponse', 'customerFullName'],
            key: 'customerFullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: ['customerResponse', 'customerPhone'],
            key: 'customerPhone',
        },
        {
            title: 'Người tạo phiếu',
            dataIndex: ['employeeResponse', 'employeeFullName'],
            key: 'employeeFullName',
        },
        {
            title: 'Tên vắc xin',
            dataIndex: 'vaccineName',
            key: 'vaccineName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'vaccinationRecordStatus',
            key: 'vaccinationRecordStatus',
            render: (status) => <span>{convertRecordStatus(status)}</span>,
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-1">
                    <Tooltip placement="top" title="In phiếu tiêm">
                        <svg
                            onClick={() => handleOpenPrintVaccinationRecordModal(record)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 18h-.8c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8v-4.6c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 7 5.08 7 6.2 7H7m10 11h.8c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 16.48 21 15.92 21 14.8v-4.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 7 18.92 7 17.8 7H17M7 11h.01M17 7V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 3 15.96 3 15.4 3H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 3.76 7 4.04 7 4.6V7m10 0H7m1.6 14h6.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C17 20.24 17 19.96 17 19.4v-2.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 15 15.96 15 15.4 15H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 15.76 7 16.04 7 16.6v2.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C7.76 21 8.04 21 8.6 21Z"
                            />
                        </svg>
                    </Tooltip>
                    <Tooltip placement="top" title="Hủy phiếu tiêm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon w-6 h-6"
                            viewBox="0 0 1024 1024"
                        >
                            <path
                                fill="#D50000"
                                d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384zm0 85.333c66.133 0 128 23.467 179.2 59.734L273.067 691.2C236.8 640 213.333 578.133 213.333 512c0-164.267 134.4-298.667 298.667-298.667zm0 597.334c-66.133 0-128-23.467-179.2-59.734L750.933 332.8C787.2 384 810.667 445.867 810.667 512c0 164.267-134.4 298.667-298.667 298.667z"
                            />
                        </svg>
                    </Tooltip>
                </div>
            ),
        },
    ]

    return (
        <section className="bg-base-100 rounded-lg shadow-default p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                In phiếu khám / phiếu tiêm
            </h1>
            <div className="flex items-center my-4">
                <span className="font-semibold">Chọn ngày muốn xem phiếu:</span>
                <DatePicker
                    defaultValue={dayjs(selectedDate)}
                    isClearable
                    format="DD-MM-YYYY"
                    className="mx-4"
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-5">
                <input
                    type="radio"
                    name="record_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Phiếu khám sàng lọc"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-4"
                >
                    <Table
                        columns={screeningColumns}
                        dataSource={screeningRecordList}
                        rowKey={'screeningRecordId'}
                    />
                </div>

                <input
                    type="radio"
                    name="record_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Phiếu tiêm"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-4"
                >
                    <Table
                        columns={vaccinationColumns}
                        dataSource={vaccinationRecordList}
                        rowKey={'vaccinationRecordId'}
                    />
                </div>
            </div>

            <PrintScreeningRecordModal
                visiblePrintScreeningRecordModal={isOpenPrintScreeningRecordModal}
                handleClosePrintScreeningRecordModal={handleClosePrintScreeningRecordModal}
                screeningRecordSelected={screeningRecordSelected}
            />

            <PrintVaccinationRecordModal
                visiblePrintVaccinationRecordModal={isOpenPrintVaccinationRecordModal}
                handleClosePrintVaccinationRecordModal={handleClosePrintVaccinationRecordModal}
                vaccinationRecordSelected={vaccinationRecordSelected}
            />
        </section>
    )
}
