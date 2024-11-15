import { AppointmentTable, Breadcrumb } from '@/components/ui'
import React from 'react'

export const AppointmentManagementTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Danh sách cuộc hẹn'} />
            <AppointmentTable />
        </>
    )
}
