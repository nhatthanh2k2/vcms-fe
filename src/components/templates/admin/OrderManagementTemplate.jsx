import { Breadcrumb, OrderTable } from '@/components/ui'
import React from 'react'

export const OrderManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Đơn hàng'} />
            <OrderTable />
        </>
    )
}
