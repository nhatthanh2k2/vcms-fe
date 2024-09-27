import { vaccineService } from '@/services'
import React, { useEffect, useState } from 'react'

export const VaccineList = () => {
    const [vaccineList, setVaccineList] = useState([])

    useEffect(() => {
        vaccineService
            .getAllVaccines()
            .then((respone) => setVaccineList(respone.data.result))
            .catch((err) => console.log('Get vaccines failed!'))
    }, [])

    return (
        <div className="flex flex-col mt-10 mx-20">
            <div className="text-xl font-semibold mb-4">Thông tin sản phẩm vắc xin</div>

            <div className="relative flex mb-6 w-72">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-500 hover:text-blue-500 transition-colors duration-200" // Change color on hover
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.716 4.354a8.031 8.031 0 1 0-2.7 13.138l3.58 3.581a3.164 3.164 0 0 0 4.477-4.473l-3.58-3.58a8.046 8.046 0 0 0-1.777-8.666Zm-5.682 11.715A6.033 6.033 0 1 1 14.3 14.3a6 6 0 0 1-4.266 1.769Zm9.625 1.943a1.165 1.165 0 0 1-1.647 1.647l-3.186-3.186a8.214 8.214 0 0 0 .89-.757 8.214 8.214 0 0 0 .757-.89Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
