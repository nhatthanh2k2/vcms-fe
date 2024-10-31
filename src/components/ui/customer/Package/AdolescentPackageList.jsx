import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { AdolescentPackageTable } from '.'

export const AdolescentPackageList = () => {
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [adolescentPackageList, setAdolescentPackageList] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục gói vắc xin.'))
    }, [])

    useEffect(() => {
        setAdolescentPackageList(
            vaccinePackageList.filter((pack) => pack.vaccinePackageType === 'ADOLESCENT')
        )
    }, [vaccinePackageList])

    return (
        <div className="flex flex-col mx-20 mt-10">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-700 font-satoshi font-bold">
                    Gói vắc xin dành cho tuổi vị thành niên và thanh niên
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-5">
                {adolescentPackageList.map((pack, index) => (
                    <div className="my-5">
                        <AdolescentPackageTable pack={pack} key={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}
