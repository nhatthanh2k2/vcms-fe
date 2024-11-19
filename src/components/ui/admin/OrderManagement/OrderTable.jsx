import { orderService } from '@/services'
import { Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { convertPaymentType } from '@/utils'

const orderColumns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'customerCode',
        key: 'customerCode',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Họ và tên',
        dataIndex: 'orderCustomerFullName',
        key: 'orderCustomerFullName',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'orderCustomerPhone',
        key: 'orderCustomerPhone',
        width: 150,
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'orderTotal',
        key: 'orderTotal',
        width: 150,
        render: (text) => <span>{text.toLocaleString()} VND</span>,
    },
    {
        title: 'Thanh toán',
        dataIndex: 'orderPayment',
        key: 'orderPayment',
        width: 150,
        render: (text) => <span>{convertPaymentType(text)}</span>,
    },
    {
        title: 'Ngày đặt hàng',
        dataIndex: 'orderDate',
        key: 'orderDate',
        width: 150,
        render: (text) => <span>{text}</span>,
    },
]

export const OrderTable = () => {
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [size] = useState(50)
    const [totalRecords, setTotalRecords] = useState(0)
    const [filter, setFilter] = useState('today')

    const getOrderList = (page, size, filter) => {
        setLoading(true)
        let fetchOrders

        if (filter === 'today') {
            fetchOrders = orderService.getAllOrderToday(page, size)
        } else if (filter === 'week') {
            fetchOrders = orderService.getAllOrderInWeek(page, size)
        } else {
            fetchOrders = orderService.getAllOrder(page, size)
        }

        fetchOrders
            .then((response) => {
                setOrderList(response.data.result.content)
                setTotalRecords(response.data.result.totalElements)
                setLoading(false)
            })
            .catch((error) => {
                MyToast('error', 'Xảy ra lỗi khi lấy dữ liệu đơn hàng.')
                setLoading(false)
            })
    }

    useEffect(() => {
        getOrderList(page, size, filter)
    }, [page, size, filter])

    const paginationConfig = {
        current: page + 1,
        pageSize: size,
        total: totalRecords,
        onChange: (page) => setPage(page - 1),
        showSizeChanger: false,
    }

    return (
        <>
            <Select
                placeholder="Chọn thời gian xem lịch hẹn"
                value={filter}
                options={[
                    {
                        value: 'today',
                        label: 'Đơn hàng hôm nay',
                    },
                    {
                        value: 'week',
                        label: 'Đơn hàng trong tuần kế tiếp',
                    },
                    {
                        value: 'all',
                        label: 'Tất cả đơn hàng',
                    },
                ]}
                onChange={(value) => setFilter(value)}
                style={{
                    width: '250px',
                    marginBottom: '10px',
                    border: '2px',
                    borderColor: '#000',
                }}
            />
            <Table
                columns={orderColumns}
                dataSource={orderList}
                pagination={paginationConfig}
                loading={loading}
                rowKey="orderId"
            />
        </>
    )
}
