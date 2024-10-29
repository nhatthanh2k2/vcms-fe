import React from 'react'
import { AddVaccinePackageForm, Breadcrumb } from '@/components/ui'

export const AddVaccinePackageTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Thêm gói vắc xin'} />
            <AddVaccinePackageForm />
        </>
    )
}
