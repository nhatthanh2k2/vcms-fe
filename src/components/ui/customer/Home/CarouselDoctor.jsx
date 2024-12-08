import React, { useState, useEffect } from 'react'

import { Carousel } from 'antd'
import { employeeService } from '@/services'

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

    const [slidesToShow, setSlidesToShow] = useState(4)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) {
                setSlidesToShow(1)
            } else if (width < 768) {
                setSlidesToShow(2)
            } else if (width < 1024) {
                setSlidesToShow(3)
            } else {
                setSlidesToShow(4)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className=" w-full mt-10">
            <Carousel
                autoplay
                slidesToScroll={1}
                slidesToShow={slidesToShow}
                dots={false}
                arrows={false}
                autoplaySpeed={3000}
            >
                {filteredEmployees.map((employee, index) => (
                    <div
                        key={index}
                        className="mx-4 flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="w-fit">
                            <img
                                className="h-96 w-80 object-cover"
                                src={
                                    import.meta.env.VITE_VCMS_IMAGE +
                                    '/avatars/' +
                                    employee.employeeAvatar
                                }
                            />
                            <div className="text-center mt-2 font-bold">
                                {employee.employeeQualification} {employee.employeeFullName}
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
