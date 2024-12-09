import React, { useEffect, useState } from 'react'
import { Table, DatePicker, Tooltip } from 'antd'
import dayjs from 'dayjs'
import emailjs from '@emailjs/browser'
import { orderService } from '@/services'
import { LoadingPage, MyToast } from '../common'
import { convertPaymentType, getPatientInfo } from '@/utils'
import { OrderDetailModal, OrderInjectionModal, PreInjectionCheckModal } from '.'

export const CustomerOrderTable = ({ orderList }) => {
    const [orderDetailList, setOrderDetailList] = useState([])

    const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false)
    const [orderRecord, setOrderRecord] = useState(null)

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

    const handleOpenOrderDetailModal = (record) => {
        setOrderRecord(record)
        setIsOpenOrderDetailModal(true)
    }

    const handleCloseOrderDetailModal = () => {
        setIsOpenOrderDetailModal(false)
        setOrderRecord(null)
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
        setPatientInfo(null)
    }

    const [isOpenOrderinjectionModal, setIsOpenOrderInjectionModal] = useState(false)

    const handleOpenOrderInjectionModal = (record) => {
        setOrderRecord(record)
        setIsOpenOrderInjectionModal(true)
    }

    const handleCloseOrderInjectionModal = () => {
        setIsOpenOrderInjectionModal(false)
        setOrderRecord(null)
    }

    const orderColumns = [
        // {
        //     title: 'Mã khách hàng',
        //     dataIndex: 'customerCode',
        //     key: 'customerCode',
        // },
        // {
        //     title: 'Họ và tên',
        //     dataIndex: 'orderCustomerFullName',
        //     key: 'orderCustomerFullName',
        // },
        // {
        //     title: 'Số điện thoại',
        //     dataIndex: 'orderCustomerPhone',
        //     key: 'orderCustomerPhone',
        // },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <span>#000{text}</span>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (text) => <span>{text.toLocaleString()} VND</span>,
        },
        {
            title: 'Thanh toán',
            dataIndex: 'orderPayment',
            key: 'orderPayment',
            render: (text) => <span>{convertPaymentType(text)}</span>,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Ngày hẹn tiêm',
            dataIndex: 'orderInjectionDate',
            key: 'orderInjectionDate',
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-2 justify-center">
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
                </div>
            ),
        },
    ]
    return (
        <>
            <Table
                columns={orderColumns}
                dataSource={orderList}
                scroll={{ y: 400 }}
                rowKey={'orderId'}
            />
            <OrderDetailModal
                visibleOrderDetailModal={isOpenOrderDetailModal}
                handleCloseOrderDetailModal={handleCloseOrderDetailModal}
                orderRecord={orderRecord}
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
        </>
    )
}
