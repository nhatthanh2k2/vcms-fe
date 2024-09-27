import { employeeService } from '@/services'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

export const MedicalTeam = () => {
    const [employeeList, setEmployeeList] = useState([])
    const rolesToFilter = ['DOCTOR', 'NURSE']
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9

    useEffect(() => {
        employeeService
            .getAllEmployees()
            .then((response) => setEmployeeList(response.data.result))
            .catch((err) => console.log('Get employees failed'))
    }, [])

    const filteredEmployees = employeeList.filter((employee) =>
        employee.roles.some((role) => rolesToFilter.includes(role))
    )

    const indexOfLastEmployee = currentPage * pageSize
    const indexOfFirstEmployee = indexOfLastEmployee - pageSize
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="flex flex-col mt-10 mx-30">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-600 font-satoshi font-bold">
                    Đội ngũ bác sĩ
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center">
                {currentEmployees.map((employee) => (
                    <div
                        key={employee.employeeId}
                        className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-5 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                    >
                        <img
                            className="w-full h-96 object-cover object-center"
                            src={
                                import.meta.env.VITE_VCMS_IMAGE +
                                '/avatars/' +
                                employee.employeeAvatar
                            }
                        />

                        <div className="py-4 px-6">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {employee.employeeQualification}. {employee.employeeFullName}
                            </h1>
                            <p className="py-2 text-lg text-gray-700">
                                {employee.employeePosition}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredEmployees.length}
                onChange={handlePageChange}
                className="mt-5 self-center"
            />
        </div>
    )
}
