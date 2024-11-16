import { employeeService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Pie, Bar } from 'react-chartjs-2'
import { Select } from 'antd'

export const EmployeeQualificationChart = () => {
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        employeeService
            .getAllEmployees()
            .then((response) => {
                setEmployeeList(response.data.result)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi lấy danh sách nhân viên.'))
    }, [])

    const qualificationStats = employeeList.reduce((acc, employee) => {
        acc[employee.employeeQualification] = (acc[employee.employeeQualification] || 0) + 1
        return acc
    }, {})

    const qualificationData = {
        labels: Object.keys(qualificationStats),
        datasets: [
            {
                label: 'Số lượng',
                data: Object.values(qualificationStats),
                backgroundColor: '#42A5F5',
            },
        ],
    }

    return (
        <div className="h-80 sm:px-7.5 rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <label className="flex-1 text-xl font-semibold">
                Biểu đồ nhân viên theo trình độ chuyên môn
            </label>

            <div className="mt-2 ">
                <Bar data={qualificationData} />
            </div>
        </div>
    )
}
