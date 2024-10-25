import { AddVaccineForm, Breadcrumb } from '@/components/ui'
import React from 'react'

export const AddVaccineTemplate = () => {
    return (
        <>
            <Breadcrumb pageName={'Thêm vắc xin'} />
            <AddVaccineForm />
        </>
    )
}
