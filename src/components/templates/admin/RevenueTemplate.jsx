import {
    DailyRevenueOfWeekChart,
    MonthlyRevenueOfQuarterChart,
    MonthlyRevenueOfYearChart,
    QuarterlyRevenueOfYearChart,
} from '@/components/ui'
import React from 'react'

export const RevenueTemplate = () => {
    return (
        <div>
            {/* <DailyRevenueOfWeekChart />
            <MonthlyRevenueOfQuarterChart /> */}

            {/* <QuarterlyRevenueOfYearChart /> */}
            <MonthlyRevenueOfYearChart />
        </div>
    )
}
