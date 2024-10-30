import { revenueService } from '@/services'
import { beginAtZeroOption } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

export const MonthlyRevenueOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyRevenueOfYearList, setMonthlyRevenueOfYearList] = useState([])

    useEffect(() => {
        revenueService
            .getMonthlyRevenueOfYear(yearSelected)
            .then((response) => setMonthlyRevenueOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const monthlyRevenueOfYearLabels = monthlyRevenueOfYearList.map(
        (data, index) => `Tháng ${index + 1}`
    )
    const monthlyRevenueOfYearRevenues = monthlyRevenueOfYearList.map((data) => data.revenue)

    const totalMonthlyRevenueOfYear = monthlyRevenueOfYearRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const monthlyRevenueOfYearData = {
        labels: monthlyRevenueOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: monthlyRevenueOfYearRevenues,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    }

    console.log(monthlyRevenueOfYearList)

    return (
        <div>
            <h2>Biểu đồ doanh thu hàng tháng</h2>
            <Line data={monthlyRevenueOfYearData} options={beginAtZeroOption} />
            <h3>Tổng doanh thu: {totalMonthlyRevenueOfYear.toLocaleString()} VNĐ</h3>
        </div>
    )
}
