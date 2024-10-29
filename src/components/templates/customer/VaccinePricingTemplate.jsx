import { VaccinePricingTable } from '@/components/ui'
import React from 'react'

export const VaccinePricingTemplate = () => {
    return (
        <div className="mx-20 my-10">
            <div className="relative mb-10">
                <div className="uppercase text-3xl text-blue-700 font-satoshi font-bold">
                    Bảng giá tiêm chủng vắc xin
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <VaccinePricingTable />
        </div>
    )
}
