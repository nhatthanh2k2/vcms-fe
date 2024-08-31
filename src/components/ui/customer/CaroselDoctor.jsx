import React, { useState, useEffect } from 'react'

import { Carousel } from 'antd'

export const CarouselDoctor = () => {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {}, [])

    return (
        <div className=" w-full mt-10">
            <Carousel
                autoplay
                slidesToScroll={3}
                slidesToShow={5}
                dots={false}
                arrows={false}
                autoplaySpeed={5000}
            >
                {doctors.map((doctor, index) => (
                    <div key={index} className="mx-4 ">
                        <img
                            className="w-[200px] h-[200px]"
                            src={
                                'http://localhost:8080/images/avatars/' +
                                doctor.avatar
                            }
                            alt="Vac xin"
                        />
                        <div className="ml-10">
                            <h2>Bác sĩ. {doctor.employeeName}</h2>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
