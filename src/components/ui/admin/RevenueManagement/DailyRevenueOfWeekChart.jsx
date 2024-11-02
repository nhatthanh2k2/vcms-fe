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
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Biểu đồ Doanh thu trong tuần này</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-orange-600">
                        {totalDailyRevenue.toLocaleString()} VNĐ
                    </span>
                </span>
            </div>
            <div className="mt-2 h-100">
                <Line data={dailyRevenueData} options={lineOptions} />
            </div>
        </div>
    )
}
