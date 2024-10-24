import { Breadcrumb, VaccinePackageTable } from '@/components/ui'
import React from 'react'

export const VaccinePackageManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Gói vắc xin'} />
            <VaccinePackageTable />
        </>
    )
}
