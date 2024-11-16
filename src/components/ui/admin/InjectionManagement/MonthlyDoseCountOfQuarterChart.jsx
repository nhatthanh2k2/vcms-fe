import { injectionService } from '@/services'
import { barOptions } from '@/utils'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const MonthlyDoseCountOfQuarterChart = () => {
    const currentMonth = new Date().getMonth()
    const [quarterSelected, setQuarterSelected] = useState(Math.floor(currentMonth / 3) + 1)
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyDoseCountOfQuarterList, setMonthlyDoseCountOfQuarterList] = useState([])

    useEffect(() => {
        injectionService
            .getMonthlyDoseCountOfQuarter(yearSelected, quarterSelected)
            .then((response) => setMonthlyDoseCountOfQuarterList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [quarterSelected])

    const monthlyDoseCountOfQuarterData = {
        labels: monthlyDoseCountOfQuarterList.map((item) => item.period),
        datasets: [
            {
                label: 'Số lượt tiêm',
                data: monthlyDoseCountOfQuarterList.map((item) => item.doseCount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default rounded-lg border border-stroke px-5 pb-5 pt-7.5 space-y-5">
            <div className="flex justify-between items-center font-bold">
                <span>
                    Số lượt tiêm theo tháng trong quý {quarterSelected} năm {yearSelected}
                </span>

                <Select
                    options={[
                        {
                            value: 1,
                            label: 'Các tháng Quý 1',
                        },
                        {
                            value: 2,
                            label: 'Các tháng Quý 2',
                        },
                        {
                            value: 3,
                            label: 'Các tháng Quý 3',
                        },
                        {
                            value: 4,
                            label: 'Các tháng Quý 4',
                        },
                    ]}
                    placeholder="Chọn quý để xem doanh thu"
                    onChange={(value) => setQuarterSelected(value)}
                    value={quarterSelected || null}
                />
            </div>

            <div className="mt-2 h-100">
                <Bar data={monthlyDoseCountOfQuarterData} options={barOptions} />
            </div>
        </div>
    )
}
