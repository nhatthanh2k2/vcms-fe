import { employeeService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Pie, Bar } from 'react-chartjs-2'
import { Select } from 'antd'

export const EmployeeChart = () => {
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        employeeService
            .getAllEmployees()
            .then((response) => {
                setEmployeeList(response.data.result)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi lấy danh sách nhân viên.'))
    }, [])

    const genderStats = employeeList.reduce((acc, employee) => {
        acc[employee.employeeGender] = (acc[employee.employeeGender] || 0) + 1
        return acc
    }, {})

    const genderData = {
        labels: ['Nam', 'Nữ'],
        datasets: [
            {
                data: Object.values(genderStats),
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    }

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

    const [chart, setChart] = useState('GENDER')

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <div className="flex justify-between items-center">
                <label className="flex-1 text-xl font-semibold">Biểu đồ nhân viên</label>

                <Select
                    className="w-full flex-1"
                    options={[
                        {
                            value: 'GENDER',
                            label: 'Theo giới tính',
                        },
                        {
                            value: 'QUAL',
                            label: 'Theo chuyên môn',
                        },
                    ]}
                    placeholder="Chọn biểu đồ"
                    value={chart || null}
                    onChange={(value) => setChart(value)}
                />
            </div>
            <div className="mt-2 ">
                {chart === 'GENDER' ? (
                    <div className="w-50 h-50">
                        <Pie data={genderData} />
                    </div>
                ) : (
                    <Bar data={qualificationData} />
                )}
            </div>
        </div>
    )
}
