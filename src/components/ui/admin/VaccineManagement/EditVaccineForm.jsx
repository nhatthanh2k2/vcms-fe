import React from 'react'
import { useLocation } from 'react-router-dom'

export const EditVaccineForm = () => {
    const location = useLocation()
    const record = location.state?.record
    console.log(record)

    return <div>EditVaccineForm</div>
}
