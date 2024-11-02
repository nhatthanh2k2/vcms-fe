import {
    Breadcrumb,
    DailyDoseCountOfWeekChart,
    DoseCountForNextMonthTable,
    MonthlyDoseCountOfQuarterChart,
    MonthlyDoseCountOfYearChart,
    QuarterlyDoseCountOfYearChart,
} from '@/components/ui'
import { Select } from 'antd'
import React, { useState } from 'react'

const options = [
    { value: 'daily', label: 'Biểu đồ số lượt tiêm tuần này' },
    { value: 'monthlyQuarter', label: 'Biểu đồ só lượt tiêm theo Tháng trong Quý' },
    { value: 'quarterly', label: 'Biểu đồ só lượt tiêm theo Quý trong Năm' },
    { value: 'monthlyYear', label: 'Biểu đồ só lượt tiêm theo Tháng trong Năm' },
]

export const DoseCountTemplate = () => {
    const [selectedChart, setSelectedChart] = useState('daily')

    const renderChart = () => {
        switch (selectedChart) {
            case 'daily':
                return <DailyDoseCountOfWeekChart />
            case 'monthlyQuarter':
                return <MonthlyDoseCountOfQuarterChart />
            case 'quarterly':
                return <QuarterlyDoseCountOfYearChart />
            case 'monthlyYear':
                return <MonthlyDoseCountOfYearChart />
            default:
                return null
        }
    }
    return (
        <div className="flex flex-col space-y-10">
            <Breadcrumb pageName={'Số lượt tiêm'} />
            <div className="mb-5">
                <Select
                    options={options}
                    style={{ width: '100%' }}
                    onChange={(value) => setSelectedChart(value)}
                    value={selectedChart}
                />
            </div>
            <div>{renderChart()}</div>
            <DoseCountForNextMonthTable />
        </div>
    )
}
