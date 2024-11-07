import { fetchOrderDetailList } from '@/redux'
import { Modal, Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

export const OrderDetailModal = ({
    visibleOrderDetailModal,
    handleCloseOrderDetailModal,
    orderRecord,
}) => {
    const dispatch = useDispatch()
    const { orderDetailList } = useSelector((state) => state.order)

    useEffect(() => {
        if (orderRecord) {
            dispatch(fetchOrderDetailList(orderRecord?.orderId))
        }
    }, [dispatch, orderRecord])

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

    return (
        <div>
            <Modal
                open={visibleOrderDetailModal}
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
                    />

                    <Table
                        columns={vaccinePackageColumns}
                        dataSource={vaccinePackageData}
                        pagination={false}
                    />
                </div>
            </Modal>
        </div>
    )
}
