import { convertPaymentType } from '@/utils'
import { Table } from 'antd'
import React from 'react'

const orderColumns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'customerCode',
        key: 'customerCode',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'orderCustomerFullName',
        key: 'orderCustomerFullName',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'orderCustomerPhone',
        key: 'orderCustomerPhone',
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
]

export const MyOrderTable = ({ myOrderList }) => {
    return <Table columns={orderColumns} dataSource={myOrderList} bordered rowKey={'orderId'} />
}
