import { convertAppointmentStatus } from '@/utils'
import { Table } from 'antd'
import React from 'react'

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
        title: 'Ngày hẹn tiêm',
        dataIndex: 'appointmentInjectionDate',
        key: 'appointmentInjectionDate',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'appointmentStatus',
        key: 'appointmentStatus',
        render: (text) => <span>{convertAppointmentStatus(text)}</span>,
    },
]

export const MyAppointmentTable = ({ myAppointmentList }) => {
    return (
        <Table
            columns={appointmentColumns}
            dataSource={myAppointmentList}
            bordered
            rowKey={'appointmentId'}
        />
    )
}
