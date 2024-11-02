import { injectionService } from '@/services'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { MyToast } from '../../common'
import { Bar } from 'react-chartjs-2'
import { barOptions } from '@/utils'

export const QuarterlyDoseCountOfYearChart = () => {
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [quarterlyDoseCountOfYearList, setQuarterlyDoseCountOfYearList] = useState([])

    useEffect(() => {
        injectionService
            .getQuarterlyDoseCountOfYear(yearSelected)
            .then((response) => setQuarterlyDoseCountOfYearList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [])

    const quarterlyDoseCountOfYearData = {
        labels: quarterlyDoseCountOfYearList.map((item) => item.period),
        datasets: [
            {
                label: 'Số lượt tiêm',
                data: quarterlyDoseCountOfYearList.map((item) => item.doseCount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5">
            <div className="flex justify-between font-bold">
                <span>Số lượt tiêm theo quý năm {yearSelected}</span>
            </div>

            <div className="mt-2 h-100">
                <Bar data={quarterlyDoseCountOfYearData} options={barOptions} />
            </div>
        </div>
    )
}
