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
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderColor: '#007bff',
                borderWidth: 2,
                fill: 'origin',
                tension: 0.2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#007bff',
                pointRadius: 5,
                pointHoverRadius: 5,
            },
            {
                label: 'Lợi nhuận',
                data: profits,
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: '#28a745',
                borderWidth: 2,
                fill: '-1',
                tension: 0.2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#28a745',
                pointRadius: 5,
                pointHoverRadius: 5,
            },
        ],
    }

    return (
        <div className="bg-white rounded-lg shadow-default border border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Doanh thu trong tuần này</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-blue-600">{totalRevenue.toLocaleString()} VNĐ</span>
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
