import {
    Breadcrumb,
    DailyRevenueOfWeekChart,
    MonthlyRevenueOfQuarterChart,
    MonthlyRevenueOfYearChart,
    QuarterlyRevenueOfYearChart,
} from '@/components/ui'
import { Select } from 'antd'
import React, { useState } from 'react'

const options = [
    { value: 'daily', label: 'Biểu đồ Doanh thu Tuần' },
    { value: 'monthlyQuarter', label: 'Biểu đồ Doanh thu Tháng trong Quý' },
    { value: 'quarterly', label: 'Biểu đồ Doanh thu Quý trong Năm' },
    { value: 'monthlyYear', label: 'Biểu đồ Doanh thu Tháng trong Năm' },
]

export const RevenueTemplate = () => {
    const [selectedChart, setSelectedChart] = useState('daily')

    const renderChart = () => {
        switch (selectedChart) {
            case 'daily':
                return <DailyRevenueOfWeekChart />
            case 'monthlyQuarter':
                return <MonthlyRevenueOfQuarterChart />
            case 'quarterly':
                return <QuarterlyRevenueOfYearChart />
            case 'monthlyYear':
                return <MonthlyRevenueOfYearChart />
            default:
                return null
        }
    }
    return (
        <div>
            <Breadcrumb pageName={'Doanh thu'} />

            <div className="mb-5">
                <Select
                    options={options}
                    style={{ width: '100%' }}
                    onChange={(value) => setSelectedChart(value)}
                    value={selectedChart}
                />
            </div>

            <div>{renderChart()}</div>
        </div>
    )
}
