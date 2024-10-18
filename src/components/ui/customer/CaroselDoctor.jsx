import React, { useState, useEffect } from 'react'

import { Carousel } from 'antd'
import { employeeService } from '@/services'

const responsiveSettings = {
    xs: {
        slidesToShow: 1,
        slidesToScroll: 1,
    },
    sm: {
        slidesToShow: 2,
        slidesToScroll: 1,
    },
    md: {
        slidesToShow: 3,
        slidesToScroll: 1,
    },
    lg: {
        slidesToShow: 5,
        slidesToScroll: 1,
    },
}

export const CarouselDoctor = () => {
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        employeeService
            .getAllEmployees()
            .then((response) => setEmployeeList(response.data.result))
            .catch((err) => console.log('Get employees failed'))
    }, [])

    const rolesToFilter = ['DOCTOR', 'NURSE']

    const filteredEmployees = employeeList.filter((employee) =>
        employee.roles.some((role) => rolesToFilter.includes(role))
    )

    return (
        <div className=" w-full mt-10">
            <Carousel
                autoplay
                slidesToScroll={4}
                slidesToShow={5}
                dots={false}
                arrows={false}
                autoplaySpeed={3000}
            >
                {filteredEmployees.map((employee, index) => (
                    <div
                        key={index}
                        className="mx-4 flex flex-col items-center justify-center pointer-events-none"
                    >
                        <img
                            className="h-96 w-64 object-cover"
                            src={
                                import.meta.env.VITE_VCMS_IMAGE +
                                '/avatars/' +
                                employee.employeeAvatar
                            }
                        />
                        <div className="mx-auto text-center mt-2 flex flex-row space-x-1 items-center justify-center">
                            <span>{employee.employeeQualification}.</span>
                            <span>{employee.employeeFullName}</span>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
