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
        title: 'Số mũi đã đăng ký',
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
        <div className=" shadow-default bg-white">
            <Table
                bordered
                title={() => (
                    <div className="font-bold text-blue-600 text-xl">
                        Số mũi vắc xin đăng ký tiêm trong 1 tháng kế tiếp
                    </div>
                )}
                columns={columns}
                dataSource={doseCountList.map((item, index) => ({ ...item, key: index }))}
            />
        </div>
    )
}
