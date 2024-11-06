import { revenueService } from '@/services'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Bar } from 'react-chartjs-2'
import { barOptions } from '@/utils'

export const MonthlyRevenueOfQuarterChart = () => {
    const currentMonth = new Date().getMonth()
    const [quarterSelected, setQuarterSelected] = useState(Math.floor(currentMonth / 3) + 1)
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
    const [monthlyRevenueOfQuarterList, setMonthlyRevenueOfQuarterList] = useState([])

    useEffect(() => {
        revenueService
            .getMonthlyRevenueOfQuarter(yearSelected, quarterSelected)
            .then((response) => setMonthlyRevenueOfQuarterList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy dữ liệu'))
    }, [quarterSelected])

    // Tạo nhãn và hai mảng doanh thu từ API
    const monthlyOfQuarterLabels = monthlyRevenueOfQuarterList.map((data) => data.period)
    const orderRevenues = monthlyRevenueOfQuarterList.map((data) => data.orderRevenue)
    const recordRevenues = monthlyRevenueOfQuarterList.map((data) => data.recordRevenue)

    const totalOrderRevenue = orderRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const totalRecordRevenue = recordRevenues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const monthlyOfQuarterData = {
        labels: monthlyOfQuarterLabels,
        datasets: [
            {
                label: 'Doanh thu từ đơn hàng',
                data: orderRevenues,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1,
            },
            {
                label: 'Doanh thu từ hồ sơ tiêm chủng',
                data: recordRevenues,
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="bg-white shadow-default border-stroke px-5 pb-5 pt-7.5 space-y-5">
            <div className="flex justify-between items-center font-bold">
                <span>
                    Doanh thu theo tháng trong quý {quarterSelected} năm {yearSelected}
                </span>
                <Select
                    options={[
                        { value: 1, label: 'Các tháng Quý 1' },
                        { value: 2, label: 'Các tháng Quý 2' },
                        { value: 3, label: 'Các tháng Quý 3' },
                        { value: 4, label: 'Các tháng Quý 4' },
                    ]}
                    placeholder="Chọn quý để xem doanh thu"
                    onChange={(value) => setQuarterSelected(value)}
                    value={quarterSelected || null}
                />
            </div>

            <span className="font-semibold">
                Tổng doanh thu từ đơn hàng:{' '}
                <span className="text-blue-600">{totalOrderRevenue.toLocaleString()} VNĐ</span>
                &nbsp;| Tổng doanh thu từ hồ sơ:{' '}
                <span className="text-orange-600">{totalRecordRevenue.toLocaleString()} VNĐ</span>
            </span>

            <div className="mt-2 h-100">
                <Bar
                    data={monthlyOfQuarterData}
                    options={{
                        ...barOptions,
                        scales: { x: { stacked: true }, y: { stacked: true } },
                    }}
                />
            </div>
        </div>
    )
}
