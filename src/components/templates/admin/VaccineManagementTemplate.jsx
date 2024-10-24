import { Breadcrumb, VaccineTable } from '@/components/ui'
import React from 'react'

export const VaccineManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Vắc xin lẻ'} />
            <VaccineTable />
        </>
    )
}
