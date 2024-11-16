import { injectionService } from '@/services'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { MyToast } from '../../common'
import { Line } from 'react-chartjs-2'

export const MonthlyDoseCountOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyDoseCountOfYearList, setMonthlyDoseCountOfYearList] = useState([])

    useEffect(() => {
        injectionService
            .getMonthlyDoseCountOfYear(yearSelected)
            .then((response) => setMonthlyDoseCountOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const monthlyDoseCountOfYearLabels = monthlyDoseCountOfYearList.map(
        (data, index) => `Tháng ${index + 1}`
    )

    const monthlyDoseCountOfYearData = {
        labels: monthlyDoseCountOfYearLabels,
        datasets: [
            {
                label: 'Số lượt tiêm hàng tháng',
                data: monthlyDoseCountOfYearList.map((item) => item.doseCount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.2,
                fill: true,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return (
        <div className="bg-white shadow-default rounded-lg border border-stroke px-5 pb-5 pt-7.5">
            <div className="flex font-bold justify-between">
                <span>Biểu đồ số lượt tiêm hàng tháng năm {yearSelected}</span>
            </div>

            <div className="mt-2 h-100">
                <Line data={monthlyDoseCountOfYearData} options={options} />
            </div>
        </div>
    )
}
