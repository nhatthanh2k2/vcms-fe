import { Breadcrumb, EditVaccineForm } from '@/components/ui'
import React from 'react'

export const EditVaccineTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Cập nhật vắc xin'} />
            <EditVaccineForm />
        </>
    )
}
