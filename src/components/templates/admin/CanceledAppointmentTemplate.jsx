import { Breadcrumb, CanceledAppointmentChart } from '@/components/ui'
import React from 'react'

export const CanceledAppointmentTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Cuộc hẹn bị hủy'} />
            <CanceledAppointmentChart />
        </>
    )
}
