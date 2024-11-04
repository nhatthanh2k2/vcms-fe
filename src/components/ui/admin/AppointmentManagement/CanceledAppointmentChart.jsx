import { appointmentService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Table } from 'antd'

const columns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'customerCode',
        key: 'customerCode',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'appointmentCustomerFullName',
        key: 'appointmentCustomerFullName',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'appointmentCustomerPhone',
        key: 'appointmentCustomerPhone',
    },
    {
        title: 'Ngày hẹn tiêm',
        dataIndex: 'appointmentInjectionDate',
        key: 'appointmentInjectionDate',
    },
    {
        title: 'Vắc xin đăng ký',
        key: 'registeredVaccine',
        render: (_, record) => {
            if (record.batchDetailResponse) {
                return record.batchDetailResponse.vaccineResponse.vaccineName
            } else if (record.vaccinePackageResponse) {
                return record.vaccinePackageResponse.vaccinePackageName
            } else {
                return 'Không có'
            }
        },
    },
]

export const CanceledAppointmentChart = () => {
    const [canceledAppointmentList, setCanceledAppointmentList] = useState([])

    useEffect(() => {
        appointmentService
            .getCanceledAppointmentList()
            .then((response) => setCanceledAppointmentList(response.data.result))
            .catch((error) => MyToast('Lấy danh sách cuộc hẹn bị hủy thất bại.'))
    }, [])

    console.log(canceledAppointmentList)

    return (
        <div>
            <Table
                columns={columns}
                dataSource={canceledAppointmentList}
                rowKey={'appointmentId'}
            />
        </div>
    )
}
