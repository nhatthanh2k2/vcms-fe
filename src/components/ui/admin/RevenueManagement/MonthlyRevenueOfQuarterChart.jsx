import { revenueService } from '@/services'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Bar } from 'react-chartjs-2'

export const MonthlyRevenueOfQuarterChart = () => {
    const currentMonth = new Date().getMonth()
    const [quarterSelected, setQuarterSelected] = useState(Math.floor(currentMonth / 3) + 1)
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyRevenueOfQuarterList, setMonthlyRevenueOfQuarterList] = useState([])

    useEffect(() => {
        revenueService
            .getMonthlyRevenueOfQuarter(yearSelected, quarterSelected)
            .then((response) => setMonthlyRevenueOfQuarterList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [quarterSelected])

    const monthlyOfQuarterLabels = monthlyRevenueOfQuarterList.map((data) => data.period)
    const monthlyOfQuarterRevenues = monthlyRevenueOfQuarterList.map((data) => data.revenue)

    const totalRevenueOfQuarter = monthlyOfQuarterRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const monthlyOfQuarterData = {
        labels: monthlyOfQuarterLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: monthlyOfQuarterRevenues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true },
        },
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5 space-y-5">
            <div className="flex justify-between items-center font-bold">
                <span>
                    Doanh thu theo tháng trong quý {quarterSelected} năm {yearSelected}
                </span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-orange-600">
                        {totalRevenueOfQuarter.toLocaleString()} VNĐ
                    </span>
                </span>

                <Select
                    options={[
                        {
                            value: 1,
                            label: 'Các tháng Quý 1',
                        },
                        {
                            value: 2,
                            label: 'Các tháng Quý 2',
                        },
                        {
                            value: 3,
                            label: 'Các tháng Quý 3',
                        },
                        {
                            value: 4,
                            label: 'Các tháng Quý 4',
                        },
                    ]}
                    placeholder="Chọn quý để xem doanh thu"
                    onChange={(value) => setQuarterSelected(value)}
                />
            </div>

            <div className="h-100 ">
                <Bar data={monthlyOfQuarterData} options={options} />
            </div>
        </div>
    )
}
