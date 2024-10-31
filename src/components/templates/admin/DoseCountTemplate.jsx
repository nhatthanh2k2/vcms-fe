import { DailyDoseCountOfWeekChart, DoseCountForNextMonthTable } from '@/components/ui'
import React from 'react'

export const DoseCountTemplate = () => {
    return (
        <div className="flex flex-col space-y-10">
            <DailyDoseCountOfWeekChart />
            <DoseCountForNextMonthTable />
        </div>
    )
}
