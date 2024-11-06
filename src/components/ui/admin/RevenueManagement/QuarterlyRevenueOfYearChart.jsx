import { revenueService } from '@/services'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { MyToast } from '../../common'
import { barOptions } from '@/utils'

export const QuarterlyRevenueOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [quarterlyRevenueOfYearList, setQuarterlyRevenueOfYearList] = useState([])

    useEffect(() => {
        revenueService
            .getQuarterlyRevenueOfYear(yearSelected)
            .then((response) => setQuarterlyRevenueOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [yearSelected])

    const quarterOfYearLabels = quarterlyRevenueOfYearList.map((data) => data.period)
    const orderRevenues = quarterlyRevenueOfYearList.map((data) => data.orderRevenue)
    const recordRevenues = quarterlyRevenueOfYearList.map((data) => data.recordRevenue)

    const totalOrderRevenue = orderRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const totalRecordRevenue = recordRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const quarterlyOfYearData = {
        labels: quarterOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu từ đơn hàng',
                data: orderRevenues,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1,
            },
            {
                label: 'Doanh thu từ hồ sơ tiêm chủng',
                data: recordRevenues,
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5">
            <div className="flex justify-between font-bold">
                <span>Doanh thu theo quý năm {yearSelected}</span>
                <span>
                    Tổng doanh thu từ đơn hàng:{' '}
                    <span className="text-blue-600">{totalOrderRevenue.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng doanh thu từ hồ sơ:{' '}
                    <span className="text-orange-600">
                        {totalRecordRevenue.toLocaleString()} VNĐ
                    </span>
                </span>
            </div>

            <div className="mt-2 h-100">
                <Bar
                    data={quarterlyOfYearData}
                    options={{
                        ...barOptions,
                        scales: { x: { stacked: true }, y: { stacked: true } },
                    }}
                />
            </div>
        </div>
    )
}
