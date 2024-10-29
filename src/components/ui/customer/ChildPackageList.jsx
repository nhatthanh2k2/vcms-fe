import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../common'
import { ChildPackageTable } from '.'

export const ChildPackageList = () => {
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [childPackageList, setChildPackageList] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục gói vắc xin.'))
    }, [])

    useEffect(() => {
        setChildPackageList(
            vaccinePackageList.filter((pack) => pack.vaccinePackageType === 'CHILD')
        )
    }, [vaccinePackageList])

    return (
        <div className="flex flex-col mx-20 mt-10">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-700 font-satoshi font-bold">
                    Gói vắc xin dành cho trẻ em
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-5">
                {childPackageList.map((pack, index) => (
                    <div className="my-5">
                        <ChildPackageTable pack={pack} key={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}
