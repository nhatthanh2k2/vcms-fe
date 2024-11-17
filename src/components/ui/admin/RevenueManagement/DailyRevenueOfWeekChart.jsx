import { revenueService } from '@/services'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Line } from 'react-chartjs-2'
import { lineOptions } from '@/utils'

export const DailyRevenueOfWeekChart = () => {
    const [toDate, setToDate] = useState(new Date())
    const [dailyRevenueList, setDailyRevenueList] = useState([])

    useEffect(() => {
        const formatDate = dayjs(toDate).format('YYYY-MM-DD')
        revenueService
            .getDailyRevenueOfWeek(formatDate)
            .then((response) => setDailyRevenueList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const dailyLabels = dailyRevenueList.map((data) => data.period)
    const revenues = dailyRevenueList.map((data) => data.revenue)
    const costs = dailyRevenueList.map((data) => data.cost)
    const profits = dailyRevenueList.map((data) => data.profit)

    const totalRevenue = revenues.reduce((acc, curr) => acc + curr, 0)
    const totalCost = costs.reduce((acc, curr) => acc + curr, 0)
    const totalProfit = profits.reduce((acc, curr) => acc + curr, 0)

    const dailyRevenueData = {
        labels: dailyLabels,
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
                <span>Biểu đồ Doanh thu, Chi phí và Lợi nhuận trong tuần</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-blue-600">{totalRevenue.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng chi phí:{' '}
                    <span className="text-red-600">{totalCost.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng lợi nhuận:{' '}
                    <span className="text-green-600">{totalProfit.toLocaleString()} VNĐ</span>
                </span>
            </div>
            <div className="mt-2 h-100">
                <Line data={dailyRevenueData} options={lineOptions} />
            </div>
        </div>
    )
}
