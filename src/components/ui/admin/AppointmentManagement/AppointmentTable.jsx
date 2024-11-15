import { appointmentService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Table } from 'antd'

const appointmentColumns = [
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

export const AppointmentTable = () => {
    const [appointmentList, setAppointmentList] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [size] = useState(50)
    const [totalRecords, setTotalRecords] = useState(0)

    const getAllAppointment = (page, size) => {
        setLoading(true)
        appointmentService
            .getAllAppointment(page, size)
            .then((response) => {
                setAppointmentList(response.data.result.content)
                setTotalRecords(response.data.result.totalElements)
                setLoading(false)
            })
            .catch((error) => {
                MyToast('error', 'Xảy ra lỗi khi lấy dữ liệu cuộc hẹn.')
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllAppointment(page, size)
    }, [page, size])

    const paginationConfig = {
        current: page + 1,
        pageSize: size,
        total: totalRecords,
        onChange: (page) => setPage(page - 1),
        showSizeChanger: false,
    }

    return (
        <Table
            columns={appointmentColumns}
            dataSource={appointmentList}
            pagination={paginationConfig}
            loading={loading}
            rowKey="appointmentId"
        />
    )
}
