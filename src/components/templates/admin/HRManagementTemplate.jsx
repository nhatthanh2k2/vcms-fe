import { Breadcrumb, EmployeeTable } from '@/components/ui'
import React from 'react'

export const HRManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Nhân sự'} />
            <EmployeeTable />
        </>
    )
}
