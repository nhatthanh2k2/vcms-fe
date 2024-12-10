import { orderService } from '@/services'
import { convertPaymentType } from '@/utils'
import { Modal, Table, Tooltip } from 'antd'
import React, { useState } from 'react'

const batchDetailColumns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: 'vaccineName',
        key: 'vaccineName',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Giá vắc xin',
        dataIndex: 'vaccinePrice',
        key: 'vaccinePrice',
        render: (text) => (
            <span className="font-semibold">
                {text !== 'Không có thông tin' ? `${text.toLocaleString()} VND` : text}
            </span>
        ),
    },
]

const vaccinePackageColumns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Tên gói vắc xin',
        dataIndex: 'vaccinePackageName',
        key: 'vaccinePackageName',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Giá gói vắc xin',
        dataIndex: 'vaccinePackagePrice',
        key: 'vaccinePackagePrice',
        render: (text) => (
            <span className="font-semibold">
                {text !== 'Không có thông tin' ? `${text.toLocaleString()} VND` : text}
            </span>
        ),
    },
]

export const MyOrderTable = ({ myOrderList }) => {
    const [orderDetailList, setOrderDetailList] = useState([])

    const handleGetDetailOrder = async (orderId) => {
        try {
            const response = await orderService.getOrderDetail(orderId)
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
    const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false)

    const handleOpenOrderDetailModal = () => {
        setIsOpenOrderDetailModal(true)
    }

    const handleCloseOrderDetailModal = () => {
        setIsOpenOrderDetailModal(false)
    }
    const batchDetailData = orderDetailList
        .filter((orderDetail) => orderDetail.batchDetailResponse !== null)
        .map((detail, index) => ({
            key: detail.orderDetailId,
            index: index + 1,
            vaccineName:
                detail.batchDetailResponse.vaccineResponse?.vaccineName || 'Không có thông tin',
            vaccinePrice:
                detail.batchDetailResponse.batchDetailVaccinePrice || 'Không có thông tin',
        }))

    const vaccinePackageData = orderDetailList
        .filter((detail) => detail.vaccinePackageResponse !== null)
        .map((detail, index) => ({
            key: detail.orderDetailId,
            index: index + 1,
            vaccinePackageName: detail.vaccinePackageResponse.vaccinePackageName,
            vaccinePackagePrice: detail.vaccinePackageResponse.vaccinePackagePrice,
        }))

    const orderColumns = [
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
                <div
                    onClick={() => {
                        handleGetDetailOrder(record.orderId)
                        handleOpenOrderDetailModal()
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
            ),
        },
    ]

    return (
        <>
            <Table columns={orderColumns} dataSource={myOrderList} bordered rowKey={'orderId'} />

            <Modal
                open={isOpenOrderDetailModal}
                onCancel={handleCloseOrderDetailModal}
                footer={null}
                title={
                    <div className="text-center text-2xl text-blue-500 font-bold">
                        Thông tin chi tiết đơn hàng
                    </div>
                }
                width={800}
            >
                <div className="flex flex-col space-y-5">
                    <Table
                        columns={batchDetailColumns}
                        dataSource={batchDetailData}
                        pagination={false}
                        bordered
                    />

                    <Table
                        columns={vaccinePackageColumns}
                        dataSource={vaccinePackageData}
                        pagination={false}
                        bordered
                    />
                </div>
            </Modal>
        </>
    )
}
