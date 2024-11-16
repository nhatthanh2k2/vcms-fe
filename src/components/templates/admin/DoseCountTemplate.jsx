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
        <div className="">
            <Breadcrumb pageName={'Số lượt tiêm'} />
            <div className="flex space-x-2 items-center mb-5 ">
                <label className="font-semibold">Chọn thời gian để xem doanh thu:</label>
                <div className="w-80">
                    <Select
                        options={options}
                        style={{ width: '100%' }}
                        onChange={(value) => setSelectedChart(value)}
                        value={selectedChart}
                    />
                </div>
            </div>
            <div className="mb-5">{renderChart()}</div>
            <DoseCountForNextMonthTable />
        </div>
    )
}
