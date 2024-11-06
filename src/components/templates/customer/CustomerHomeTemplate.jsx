import React from 'react'
import { Link } from 'react-router-dom'
import {
    CarouselIntroduction,
    CarouselDoctor,
    CarouselVaccine,
    DirectionsMap,
} from '@/components/ui/customer'

export const CustomerHomeTemplate = () => {
    return (
        <div>
            <div className="mb-3">
                <CarouselIntroduction />
            </div>

            <div className="flex flex-col mx-5 md:mx-20 space-y-5">
                <div>
                    <img className="mx-auto " src="/images/section-img.png" alt=""></img>
                </div>

                <div>
                    <span className="inline-block text-lg text-black font-bold relative">
                        DANH MỤC VẮC-XIN
                        <span className="absolute bottom-0 left-0 w-2/3 border-b-2 border-blue-500 top-1"></span>
                    </span>
                    <Link
                        className="inline float float-end text-blue-600 underline"
                        to={'/thong-tin-vac-xin'}
                    >
                        Xem tất cả
                    </Link>
                    <CarouselVaccine />
                </div>

                <div>
                    <img className="mx-auto " src="/images/section-img.png" alt=""></img>
                </div>

                <div>
                    <span className="inline-block text-lg text-black font-bold relative">
                        ĐỘI NGŨ CHUYÊN GIA
                        <span className="absolute bottom-0 left-0 w-2/3 border-b-2 border-blue-500 top-5"></span>
                    </span>
                    <Link
                        className="inline float float-end text-blue-600 underline"
                        to={'/gioi-thieu/doi-ngu-bac-si'}
                    >
                        Xem tất cả
                    </Link>
                    <CarouselDoctor />
                </div>

                <div>
                    <img className="mx-auto " src="/images/section-img.png" alt=""></img>
                </div>

                <div>
                    <span className="w-fit text-lg text-black font-bold relative">
                        DỊCH VỤ TIÊM CHỦNG
                        <span className="absolute bottom-0 left-0 w-2/3 border-b-2 border-blue-500 top-1"></span>
                    </span>
                    <div className="flex flex-wrap justify-center gap-5 mt-5">
                        <div className="relative w-80 h-80 bg-cover bg-center bg-no-repeat bg-vaccination-request flex justify-center items-center">
                            <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
                            <span className="uppercase text-blue-700 font-bold text-lg text-center max-w-[200px] relative z-10">
                                Tiêm theo yêu cầu
                            </span>
                        </div>
                        <div className="relative w-80 h-80 bg-cover bg-center bg-no-repeat bg-vaccination-pregnant flex justify-center items-center">
                            <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
                            <span className="uppercase text-blue-700 font-bold text-lg text-center max-w-[200px] relative z-10">
                                Tiêm cho người chuẩn bị mang thai
                            </span>
                        </div>
                        <div className="relative w-80 h-80 bg-cover bg-center bg-no-repeat bg-vaccination-for-adult flex justify-center items-center">
                            <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
                            <span className="uppercase text-blue-700 font-bold text-lg text-center max-w-[200px] relative z-10">
                                Tiêm trọn gói cho người lớn
                            </span>
                        </div>
                        <div className="relative w-80 h-80 bg-cover bg-center bg-no-repeat bg-vaccination-for-child flex justify-center items-center">
                            <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
                            <span className="uppercase text-blue-700 font-bold text-lg text-center max-w-[200px] relative z-10">
                                Tiêm trọn gói cho trẻ em
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <img className="mx-auto " src="/images/section-img.png" alt=""></img>
                </div>

                <div className="z-10">
                    <DirectionsMap />
                </div>
            </div>
        </div>
    )
}
