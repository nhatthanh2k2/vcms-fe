import React, { useEffect, useState } from 'react'

import { Carousel } from 'antd'
import { vaccineService } from '@/services'

export const CarouselVaccine = () => {
    const [vaccineList, setVaccineList] = useState([])

    useEffect(() => {
        vaccineService
            .getAllVaccines()
            .then((respone) => setVaccineList(respone.data.result))
            .catch((err) => console.log('Get vaccines failed!'))
    }, [])

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
        <div className=" w-full h-full mt-10">
            <Carousel
                autoplay
                slidesToScroll={1}
                slidesToShow={slidesToShow}
                dots={false}
                arrows={false}
                autoplaySpeed={5000}
            >
                {vaccineList.map((vaccine, index) => (
                    <div
                        key={index}
                        className="mx-4 flex flex-col items-center justify-center pointer-events-none "
                    >
                        <img
                            className="h-64 w-72 mx-auto object-contain "
                            src={
                                import.meta.env.VITE_VCMS_IMAGE +
                                '/vaccines/' +
                                vaccine.vaccineImage
                            }
                            alt={vaccine.vaccineName}
                        />
                        <div className="mx-auto text-center mt-2 font-bold">
                            {vaccine.vaccineName}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
