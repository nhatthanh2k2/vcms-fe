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
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5">
            <div className="flex justify-between font-bold">
                <span>Doanh thu theo quý năm {yearSelected}</span>
                <span>
                    Tổng doanh thu:{' '}
                    <span className="text-orange-500">
                        {totalQuarterlyRevenueOfYear.toLocaleString()} VNĐ
                    </span>
                </span>
            </div>

            <div className="mt-2 h-100">
                <Bar data={quarterlyOfYearData} options={barOptions} />
            </div>
        </div>
    )
}
