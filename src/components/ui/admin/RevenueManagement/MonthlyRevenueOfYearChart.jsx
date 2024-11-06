import { revenueService } from '@/services'
import { lineOptions } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { MyToast } from '../../common'

export const MonthlyRevenueOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyRevenueOfYearList, setMonthlyRevenueOfYearList] = useState([])

    useEffect(() => {
        revenueService
            .getMonthlyRevenueOfYear(yearSelected)
            .then((response) => setMonthlyRevenueOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [yearSelected])

    const monthlyRevenueOfYearLabels = monthlyRevenueOfYearList.map(
        (data, index) => `Tháng ${index + 1}`
    )
    const orderRevenues = monthlyRevenueOfYearList.map((data) => data.orderRevenue)
    const recordRevenues = monthlyRevenueOfYearList.map((data) => data.recordRevenue)

    const totalOrderRevenue = orderRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const totalRecordRevenue = recordRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const monthlyRevenueOfYearData = {
        labels: monthlyRevenueOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu từ đơn hàng',
                data: orderRevenues,
                fill: false,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 2,
                tension: 0.1,
            },
            {
                label: 'Doanh thu từ hồ sơ tiêm chủng',
                data: recordRevenues,
                fill: false,
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Biểu đồ doanh thu hàng tháng năm {yearSelected}</span>
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
                <Line data={monthlyRevenueOfYearData} options={lineOptions} />
            </div>
        </div>
    )
}
