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

    // Lấy nhãn ngày và dữ liệu cho orderRevenue và recordRevenue
    const dailyLabels = dailyRevenueList.map((data) => data.period)
    const orderRevenues = dailyRevenueList.map((data) => data.orderRevenue)
    const recordRevenues = dailyRevenueList.map((data) => data.recordRevenue)

    const totalOrderRevenue = orderRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const totalRecordRevenue = recordRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const dailyRevenueData = {
        labels: dailyLabels,
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
                label: 'Doanh thu tiêm trực tiếp',
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
        <div className="bg-white rounded-lg shadow-default border border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Biểu đồ Doanh thu trong tuần này</span>
                <span>
                    Tổng doanh thu từ đơn hàng:{' '}
                    <span className="text-blue-600">{totalOrderRevenue.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng doanh thu tiêm trực tiếp:{' '}
                    <span className="text-orange-600">
                        {totalRecordRevenue.toLocaleString()} VNĐ
                    </span>
                </span>
            </div>
            <div className="mt-2 h-100">
                <Line data={dailyRevenueData} options={lineOptions} />
            </div>
        </div>
    )
}
