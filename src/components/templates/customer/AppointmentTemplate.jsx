import React from 'react'
import { AppointmentForm } from '@/components/ui'

export const AppointmentTemplate = () => {
    return (
        <div className="m-10">
            <div className=" uppercase text-3xl  font-bold text-center ">
                Đăng Ký Lịch Tiêm Chủng
            </div>
            <div className="flex flex-row">
                <AppointmentForm />

                <div className="flex justify-center">
                    <span className=" uppercase">Danh mục vắc-xin</span>
                </div>
            </div>
        </div>
    )
}
