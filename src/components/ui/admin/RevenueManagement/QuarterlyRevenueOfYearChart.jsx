import { revenueService } from '@/services'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { MyToast } from '../../common'
import { barOptions } from '@/utils'

export const QuarterlyRevenueOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [quarterlyRevenueOfYearList, setQuarterlyRevenueOfYearList] = useState([])

    useEffect(() => {
        revenueService
            .getQuarterlyRevenueOfYear(yearSelected)
            .then((response) => setQuarterlyRevenueOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [yearSelected])

    const quarterOfYearLabels = quarterlyRevenueOfYearList.map((data) => data.period)
    const revenues = quarterlyRevenueOfYearList.map((data) => data.revenue)
    const costs = quarterlyRevenueOfYearList.map((data) => data.cost)
    const profits = quarterlyRevenueOfYearList.map((data) => data.profit)

    const totalRevenue = revenues.reduce((acc, curr) => acc + curr, 0)
    const totalCost = costs.reduce((acc, curr) => acc + curr, 0)
    const totalProfit = profits.reduce((acc, curr) => acc + curr, 0)

    const quarterlyOfYearData = {
        labels: quarterOfYearLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenues,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1,
            },

            {
                label: 'Lợi nhuận',
                data: profits,
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white rounded-lg shadow-default border border-stroke px-5 pb-5 pt-7.5">
            <div className="flex justify-between font-bold">
                <span>Doanh thu theo quý năm {yearSelected}</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-blue-600">{totalRevenue.toLocaleString()} VNĐ</span>
                    &nbsp;| Tổng lợi nhuận:{' '}
                    <span className="text-green-600">{totalProfit.toLocaleString()} VNĐ</span>
                </span>
            </div>

            <div className="mt-2 h-100">
                <Bar
                    data={quarterlyOfYearData}
                    options={{
                        ...barOptions,
                        scales: { x: { stacked: true }, y: { stacked: true } },
                    }}
                />
            </div>
        </div>
    )
}
