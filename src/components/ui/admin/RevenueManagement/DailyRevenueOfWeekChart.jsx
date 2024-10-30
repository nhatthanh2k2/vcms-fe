import { revenueService } from '@/services'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { MyToast } from '../../common'
import { Bar, Line } from 'react-chartjs-2'
import { beginAtZeroOption } from '@/utils'

export const DailyRevenueOfWeekChart = () => {
    const [toDate, setToDate] = useState(new Date(2024, 9, 24))
    const [dailyRevenueList, setDailyRevenueList] = useState([])

    useEffect(() => {
        const formatDate = dayjs(toDate).format('YYYY-MM-DD')
        revenueService
            .getDailyRevenueOfWeek(formatDate)
            .then((response) => setDailyRevenueList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const dailyLabels = dailyRevenueList.map((data) => data.period)
    const dailyRevenues = dailyRevenueList.map((data) => data.revenue)

    const totalDailyRevenue = dailyRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const dailyRevenueData = {
        labels: dailyLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: dailyRevenues,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    }

    return (
        <div>
            <h2>Biểu đồ Doanh thu theo ngày trong tuần này</h2>
            <Line data={dailyRevenueData} options={beginAtZeroOption} />
            <h3>Tổng doanh thu: {totalDailyRevenue.toLocaleString()} VNĐ</h3>
        </div>
    )
}
