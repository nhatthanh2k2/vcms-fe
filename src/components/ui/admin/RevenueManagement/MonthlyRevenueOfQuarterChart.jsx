import { revenueService } from '@/services'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Bar } from 'react-chartjs-2'
import { barOptions } from '@/utils'

export const MonthlyRevenueOfQuarterChart = () => {
    const currentMonth = new Date().getMonth()
    const [quarterSelected, setQuarterSelected] = useState(Math.floor(currentMonth / 3) + 1)
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyRevenueOfQuarterList, setMonthlyRevenueOfQuarterList] = useState([])

    useEffect(() => {
        revenueService
            .getMonthlyRevenueOfQuarter(yearSelected, quarterSelected)
            .then((response) => setMonthlyRevenueOfQuarterList(response.data.result))
            .catch(() => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [quarterSelected, yearSelected])

    // Tạo nhãn và các mảng doanh thu, chi phí, lợi nhuận từ API
    const monthlyOfQuarterLabels = monthlyRevenueOfQuarterList.map((data) => data.period)
    const revenues = monthlyRevenueOfQuarterList.map((data) => data.revenue)
    const costs = monthlyRevenueOfQuarterList.map((data) => data.cost)
    const profits = monthlyRevenueOfQuarterList.map((data) => data.profit)

    const totalRevenue = revenues.reduce((acc, curr) => acc + curr, 0)
    const totalCost = costs.reduce((acc, curr) => acc + curr, 0)
    const totalProfit = profits.reduce((acc, curr) => acc + curr, 0)

    const monthlyOfQuarterData = {
        labels: monthlyOfQuarterLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenues,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1,
            },
            {
                label: 'Chi phí',
                data: costs,
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
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
        <div className="bg-white rounded-lg shadow-default border border-stroke px-5 pb-5 pt-7.5 space-y-5">
            <div className="flex justify-between items-center font-bold">
                <span>
                    Doanh thu, chi phí và lợi nhuận theo tháng trong quý {quarterSelected} năm{' '}
                    {yearSelected}
                </span>
                <Select
                    options={[
                        { value: 1, label: 'Các tháng Quý 1' },
                        { value: 2, label: 'Các tháng Quý 2' },
                        { value: 3, label: 'Các tháng Quý 3' },
                        { value: 4, label: 'Các tháng Quý 4' },
                    ]}
                    placeholder="Chọn quý để xem dữ liệu"
                    onChange={(value) => setQuarterSelected(value)}
                    value={quarterSelected || null}
                />
            </div>

            <span className="font-semibold">
                Tổng doanh thu:{' '}
                <span className="text-blue-600">{totalRevenue.toLocaleString()} VNĐ</span>
                &nbsp;| Tổng chi phí:{' '}
                <span className="text-orange-600">{totalCost.toLocaleString()} VNĐ</span>
                &nbsp;| Tổng lợi nhuận:{' '}
                <span className="text-green-600">{totalProfit.toLocaleString()} VNĐ</span>
            </span>

            <div className="mt-2 h-100">
                <Bar
                    data={monthlyOfQuarterData}
                    options={{
                        ...barOptions,
                        scales: { x: { stacked: true }, y: { stacked: true } },
                    }}
                />
            </div>
        </div>
    )
}
