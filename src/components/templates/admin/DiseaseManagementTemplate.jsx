import { Breadcrumb, DiseaseTable } from '@/components/ui'
import React from 'react'

export const DiseaseManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Danh mục bệnh'} />
            <DiseaseTable />
        </>
    )
}
