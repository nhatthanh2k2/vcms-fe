import React from 'react'
import { Link } from 'react-router-dom'
import {
    CarouselIntroduction,
    CarouselDoctor,
    CarouselVaccine,
} from '@/components/ui/customer'

export const CustomerHomeTemplate = () => {
    return (
        <div>
            <CarouselIntroduction />
            <div className=" flex flex-col mx-20 space-y-10">
                <div>
                    <img
                        className="mx-auto mt-5"
                        src="/images/section-img.png"
                        alt=""
                    ></img>
                </div>

                <div>
                    <span className=" inline text-lg text-blue-600 font-bold border-b-2 border-solid border-black">
                        DANH MỤC VẮC-XIN
                    </span>

                    <Link
                        className=" inline float float-end text-blue-600 underline"
                        to={'/thong-tin-vac-xin'}
                    >
                        Xem tất cả
                    </Link>

                    <CarouselVaccine />
                </div>

                <div>
                    <img
                        className="mx-auto mt-5"
                        src="/images/section-img.png"
                        alt=""
                    ></img>
                </div>

                <div>
                    <span className=" inline text-lg text-blue-600 font-bold border-b-2 border-solid border-black">
                        ĐỘi NGŨ CHUYÊN GIA
                    </span>
                    <Link
                        className=" inline float float-end text-blue-600 underline"
                        to={'/gioi-thieu/doi-ngu-bac-si'}
                    >
                        Xem tất cả
                    </Link>
                    <CarouselDoctor />
                </div>
            </div>
        </div>
    )
}
