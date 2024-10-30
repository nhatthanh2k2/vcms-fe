import { revenueService } from '@/services'
import { beginAtZeroOption } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const QuarterlyRevenueOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [quarterlyRevenueOfYearList, setQuarterlyRevenueOfYearList] = useState([])

    useEffect(() => {
        revenueService
            .getQuarterlyRevenueOfYear(yearSelected)
            .then((response) => setQuarterlyRevenueOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const quarterOfYearLabels = quarterlyRevenueOfYearList.map((data) => data.period)
    const quarterOfYearRevenues = quarterlyRevenueOfYearList.map((data) => data.revenue)

    const totalQuarterlyRevenueOfYear = quarterOfYearRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const quarterlyOfYearData = {
        labels: quarterOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: quarterOfYearRevenues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div>
            <h2>Doanh thu theo tháng trong quý {yearSelected}</h2>
            <Bar data={quarterlyOfYearData} options={beginAtZeroOption} />
            <h3>Tổng doanh thu: {totalQuarterlyRevenueOfYear.toLocaleString()} VNĐ</h3>
        </div>
    )
}
