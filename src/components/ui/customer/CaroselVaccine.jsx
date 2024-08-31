import React, { useEffect, useState } from 'react'

import { Carousel } from 'antd'

export const CarouselVaccine = () => {
    const [vaccines, setVaccines] = useState([])

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
                {vaccines.map((vaccine, index) => (
                    <div key={index} className="mx-4 ">
                        <img
                            className="w-[200px] h-[200px]"
                            src={
                                'http://localhost:8080/images/vaccines/' +
                                vaccine.vaccineImage
                            }
                            alt="Vac xin"
                        />
                        <div>
                            <h2>{vaccine.vaccineName}</h2>
                            <p className="w-[200px]">{vaccine.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
