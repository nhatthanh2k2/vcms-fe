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
                label: 'Số mũi',
                data: dailyDoseCountOfWeekList.map((item) => item.doseCount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
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
        <div className="bg-white w-3/4 h-100 shadow-default border-stroke px-5 pb-5 pt-7.5">
            <h2 className="font-bold">Biểu đồ số lượng mũi tiêm trong tuần này</h2>
            <Line data={dailyDoseCountOfWeekData} options={options} />
        </div>
    )
}
