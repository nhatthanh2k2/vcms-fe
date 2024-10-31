import { employeeService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { Pie, Bar } from 'react-chartjs-2'

export const EmployeeGenderChart = () => {
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

    const employeeStats = employeeList.reduce(
        (acc, employee) => {
            acc.total++
            if (employee.employeeGender === 'MALE') acc.male++
            else if (employee.employeeGender === 'FEMALE') acc.female++
            return acc
        },
        { total: 0, male: 0, female: 0 }
    )

    const genderData = {
        labels: ['Nam', 'Nữ'],
        datasets: [
            {
                data: Object.values(genderStats),
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    }

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <span className="flex-1 text-xl font-semibold">Biểu đồ nhân viên theo giới tính</span>

            <div className="mt-4 flex flex-row space-x-10">
                <div className="w-50 h-50">
                    <Pie data={genderData} />
                </div>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="">Tổng số nhân viên: {employeeStats.total}</label>
                    <label htmlFor="">Số nhân viên nam: {employeeStats.male}</label>
                    <label htmlFor="">Số nhân viên nữ: {employeeStats.female}</label>
                </div>
            </div>
        </div>
    )
}
