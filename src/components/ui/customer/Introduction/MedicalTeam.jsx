import { employeeService } from '@/services'
import React, { useEffect, useState } from 'react'
import { Pagination, Row, Col } from 'antd'

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

            <div className="mt-10 ">
                <Row gutter={[16, 16]}>
                    {currentEmployees.map((employee) => (
                        <Col key={employee.employeeId} xs={24} sm={12} lg={8}>
                            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-5">
                                <img
                                    className="w-full h-96 object-cover object-center"
                                    src={
                                        import.meta.env.VITE_VCMS_IMAGE +
                                        '/avatars/' +
                                        employee.employeeAvatar
                                    }
                                    alt={employee.employeeFullName}
                                />

                                <div className="py-4 px-6">
                                    <h1 className="text-lg font-semibold text-gray-800">
                                        {employee.employeeQualification} {employee.employeeFullName}
                                    </h1>
                                    <p className="py-2 text-base text-gray-700">
                                        {employee.employeePosition}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
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
