import { Breadcrumb, VaccineBatchTable } from '@/components/ui'
import React from 'react'

export const VaccineBatchManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Lô vắc xin'} />
            <VaccineBatchTable />
        </>
    )
}
