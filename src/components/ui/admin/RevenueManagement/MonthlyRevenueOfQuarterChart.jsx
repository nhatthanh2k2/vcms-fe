import { revenueService } from '@/services'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Bar } from 'react-chartjs-2'
import { beginAtZeroOption } from '@/utils'

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

    return (
        <div>
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
            <div>
                <h2>Doanh thu theo tháng trong quý {quarterSelected}</h2>
                <Bar data={monthlyOfQuarterData} options={beginAtZeroOption} />
                <h3>Tổng doanh thu: {totalRevenueOfQuarter.toLocaleString()} VNĐ</h3>
            </div>
        </div>
    )
}
