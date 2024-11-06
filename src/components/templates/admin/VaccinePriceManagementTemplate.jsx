import { Breadcrumb, VaccinePriceTable } from '@/components/ui'
import React from 'react'

export const VaccinePriceManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Bảng giá vắc xin'} />
            <VaccinePriceTable />
        </>
    )
}
