import { Breadcrumb, CustomerTable } from '@/components/ui'
import React from 'react'

export const CustomerManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Khách hàng'} />
            <CustomerTable />
        </>
    )
}
