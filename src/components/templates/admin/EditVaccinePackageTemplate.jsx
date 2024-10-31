import { Breadcrumb, EditVaccinePackageForm } from '@/components/ui'
import React from 'react'

export const EditVaccinePackageTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Chỉnh sửa gói'} />
            <EditVaccinePackageForm />
        </>
    )
}
