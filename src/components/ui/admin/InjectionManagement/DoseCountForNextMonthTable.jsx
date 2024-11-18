import { injectionService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Table } from 'antd'

const columns = [
    {
        title: 'Tên vắc xin / Gói vắc xin',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số lượt đăng ký',
        dataIndex: 'doseCount',
        key: 'doseCount',
    },
]

export const DoseCountForNextMonthTable = () => {
    const [doseCountList, setDoseCountList] = useState([])

    useEffect(() => {
        injectionService
            .getVaccineDoseCountForNextMonth()
            .then((response) => setDoseCountList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy dữ liệu'))
    }, [])

    console.log(doseCountList)

    return (
        <div className="bg-white border border-stroke rounded-lg shadow-default p-5">
            <div className="text-lg font-semibold mb-3">
                Thống kê số vắc xin được đăng ký trong 1 tháng tiếp theo
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={doseCountList.map((item, index) => ({ ...item, key: index }))}
            />
        </div>
    )
}
