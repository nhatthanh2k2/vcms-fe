import React, { useEffect, useState } from 'react'
import { Table, DatePicker, Tooltip } from 'antd'
import dayjs from 'dayjs'
import emailjs from '@emailjs/browser'
import { orderService } from '@/services'
import { MyToast } from '../common'
import { convertPaymentType, getPatientInfo } from '@/utils'
import { OrderDetailModal, OrderInjectionModal, PreInjectionCheckModal } from '.'

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
}

const loadingBoxStyle = {
    padding: '1rem 2rem',
    borderRadius: '8px',
    backgroundColor: '#1E3A8A',
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
}

export const OrderVaccinationSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [orderVaccinationList, setOrderVaccinationList] = useState()
    const [orderDetailList, setOrderDetailList] = useState([])

    useEffect(() => {
        const formatDate = dayjs(selectedDate).format('YYYY-MM-DD')
        orderService
            .getOrderListByInjectionDate(formatDate)
            .then((response) => setOrderVaccinationList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [selectedDate])

    const handleGetDetailOrder = async (orderId) => {
        try {
            const response = await orderService.getAllOrderDetailByOrderId(orderId)
            if (response.data.code === 1000) {
                setOrderDetailList(response.data.result)
            } else MyToast('error', 'Xảy ra lỗi khi lấy chi tiết đơn hàng')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404)
                    MyToast('error', 'Không tìm thấy chi tiết đơn hàng')
            }
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
            dataIndex: 'orderCustomerFullName',
            key: 'orderCustomerFullName',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'orderCustomerPhone',
            key: 'orderCustomerPhone',
            width: 150,
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            width: 150,
            render: (text) => <span className="font-semibold">{text.toLocaleString()} VND</span>,
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'orderPayment',
            key: 'orderPayment',
            width: 150,
            render: (text) => <span className="font-semibold">{convertPaymentType(text)}</span>,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            width: 150,
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-2">
                    <div
                        onClick={() => {
                            handleGetDetailOrder(record.orderId)
                            handleOpenOrderDetailModal(record)
                        }}
                    >
                        <Tooltip placement="top" title={'Xem đơn hàng'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <g fill="#0F0F0F">
                                    <path
                                        fillRule="evenodd"
                                        d="M9 6a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6ZM7 6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6ZM9 16a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M11 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 17a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z" />
                                </g>
                            </svg>
                        </Tooltip>
                    </div>

                    <div
                        onClick={() => {
                            handleGetDetailOrder(record.orderId)
                            handleOpenOrderInjectionModal(record)
                        }}
                    >
                        <Tooltip placement="top" title={'Tạo phiếu tiêm'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
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
                            handleGetDetailOrder(record.orderId)
                            handleSendVaccinationReminderEmail(record)
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
                </div>
            ),
        },
    ]

    const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false)

    const handleOpenOrderDetailModal = () => {
        setIsOpenOrderDetailModal(true)
    }

    const handleCloseOrderDetailModal = () => {
        setIsOpenOrderDetailModal(false)
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

    const [isOpenOrderinjectionModal, setIsOpenOrderInjectionModal] = useState(false)
    const [orderRecord, setOrderRecord] = useState(null)

    const handleOpenOrderInjectionModal = (record) => {
        setOrderRecord(record)
        setIsOpenOrderInjectionModal(true)
    }

    const handleCloseOrderInjectionModal = () => {
        setIsOpenOrderInjectionModal(false)
    }

    const [isLoading, setIsLoading] = useState(false)

    const handleSendVaccinationReminderEmail = (record) => {
        setIsLoading(true)

        const templateParams = {
            customerName: record.orderCustomerFullName,
            cutomerEmail: record.orderCustomerEmail,
            vaccineName:
                orderDetailList[0]?.vaccinePackageResponse === null
                    ? orderDetailList[0]?.batchDetailResponse.vaccineResponse.vaccineName
                    : orderDetailList[0]?.vaccinePackageResponse.vaccinePackageName,
            vacicnePrice: record.orderTotal,
            injectionDate: record.orderInjectionDate,
        }

        emailjs
            .send('service_wwqml4v', 'template_uk1un67', templateParams, {
                publicKey: 'lhyG5-7O7cRItbFjd',
            })
            .then(
                (response) => {
                    setIsLoading(false)
                    MyToast('success', 'Gửi email nhắc lịch tiêm thành công.')
                },
                (error) => {
                    setIsLoading(false)
                    MyToast('error', 'Xảy ra lỗi khi gửi email nhắc lịch tiêm.')

                    //console.log(error)
                }
            )
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-500  font-sans font-bold border-teal-400  dark:text-gray-200">
                Lịch tiêm từ đơn hàng
            </h1>

            <div className="flex items-center my-5">
                <span className=" font-semibold">Chọn ngày muốn xem:</span>
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
                    dataSource={orderVaccinationList}
                    scroll={{ y: 400 }}
                    rowKey={'orderId'}
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

            <OrderDetailModal
                visibleOrderDetailModal={isOpenOrderDetailModal}
                handleCloseOrderDetailModal={handleCloseOrderDetailModal}
                orderDetailList={orderDetailList}
            />

            <PreInjectionCheckModal
                visiblePreInjectionModal={isOpenPreInjectionCheckModal}
                handleClosePreInjectionCheckModal={handleClosePreInjectionCheckModal}
                patient={patientInfo}
            />

            <OrderInjectionModal
                visibleOrderInjectionModal={isOpenOrderinjectionModal}
                handleCloseOrderInjectionModal={handleCloseOrderInjectionModal}
                orderRecord={orderRecord}
                orderDetailList={orderDetailList}
            />

            {isLoading && (
                <div style={overlayStyle}>
                    <div
                        style={loadingBoxStyle}
                        className="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2 animate-spin"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                        Đang gửi email...
                    </div>
                </div>
            )}
        </section>
    )
}
