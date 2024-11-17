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
    const revenues = monthlyRevenueOfYearList.map((data) => data.revenue)
    const costs = monthlyRevenueOfYearList.map((data) => data.cost)
    const profits = monthlyRevenueOfYearList.map((data) => data.profit)

    // Tính tổng
    const totalRevenue = revenues.reduce((acc, curr) => acc + curr, 0)
    const totalCost = costs.reduce((acc, curr) => acc + curr, 0)
    const totalProfit = profits.reduce((acc, curr) => acc + curr, 0)

    // Dữ liệu cho biểu đồ
    const monthlyRevenueOfYearData = {
        labels: monthlyRevenueOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenues,
                fill: false,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 2,
                tension: 0.1,
            },
            {
                label: 'Chi phí',
                data: costs,
                fill: false,
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
                borderWidth: 2,
                tension: 0.1,
            },
            {
                label: 'Lợi nhuận',
                data: profits,
                fill: false,
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    }

    return (
        <div className="bg-white rounded-lg shadow-default border border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Biểu đồ doanh thu, chi phí và lợi nhuận năm {yearSelected}</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-blue-600">{totalRevenue.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng chi phí:{' '}
                    <span className="text-orange-600">{totalCost.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng lợi nhuận:{' '}
                    <span className="text-green-600">{totalProfit.toLocaleString()} VNĐ</span>
                </span>
            </div>

            <div className="mt-2 h-100">
                <Line data={monthlyRevenueOfYearData} options={lineOptions} />
            </div>
        </div>
    )
}
