import { AdultPackageTable } from '.'
import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'

export const AdultPackageList = () => {
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [adultPackageList, setAdultPackageList] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục gói vắc xin.'))
    }, [])

    useEffect(() => {
        setAdultPackageList(
            vaccinePackageList.filter((pack) => pack.vaccinePackageType === 'ADULT')
        )
    }, [vaccinePackageList])

    return (
        <div className="flex flex-col mx-20 mt-10">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-700 font-satoshi font-bold">
                    Gói vắc xin dành cho người trưởng thành
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-5">
                {adultPackageList.map((pack, index) => (
                    <div className="my-5" key={pack.vaccinePackageId || index}>
                        <AdultPackageTable pack={pack} />
                        <div>
                            <img
                                className="mx-auto mt-5"
                                src="/images/section-img.png"
                                alt=""
                            ></img>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
