import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { injectionService } from '@/services'
import { Line } from 'react-chartjs-2'

export const DailyDoseCountOfWeekChart = () => {
    const [toDate, setToDate] = useState(new Date())
    const [dailyDoseCountOfWeekList, setDailyDoseCountOfWeekList] = useState([])
    useEffect(() => {
        const formatDate = dayjs(toDate).format('YYYY-MM-DD')
        injectionService
            .getDailyDoseCountOfWeek(formatDate)
            .then((response) => setDailyDoseCountOfWeekList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const dailyDoseCountOfWeekData = {
        labels: dailyDoseCountOfWeekList.map((item) => item.period),
        datasets: [
            {
                label: 'Số lượt tiêm',
                data: dailyDoseCountOfWeekList.map((item) => item.doseCount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#000',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#000',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#000',
                },
            },
        },
    }

    return (
        <div className="bg-white shadow-default rounded-lg border border-stroke px-5 pb-8 pt-7.5">
            <h2 className="font-bold">Biểu đồ số lượt tiêm trong tuần này</h2>
            <div className="mt-2 h-100">
                <Line data={dailyDoseCountOfWeekData} options={options} />
            </div>
        </div>
    )
}
