import React from 'react'
import { AppointmentForm } from '@/components/ui'

export const AppointmentTemplate = () => {
    return (
        <div className="m-10">
            <div className=" uppercase text-3xl  font-bold text-center ">
                Đăng Ký Lịch Tiêm Chủng
            </div>
            <AppointmentForm />
        </div>
    )
}
