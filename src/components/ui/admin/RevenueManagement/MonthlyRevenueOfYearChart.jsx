import { revenueService } from '@/services'
import { lineOptions } from '@/utils'
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
                <span>Biểu đồ doanh thu hàng tháng năm {yearSelected}</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-orange-500">
                        {totalMonthlyRevenueOfYear.toLocaleString()} VNĐ
                    </span>
                </span>
            </div>

            <div className="mt-2 h-100">
                <Line data={monthlyRevenueOfYearData} options={lineOptions} />
            </div>
        </div>
    )
}
