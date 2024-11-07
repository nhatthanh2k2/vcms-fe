import React from 'react'
import emailjs from '@emailjs/browser'
import { MyToast } from '../../common'

export const sendAppointmentReminder = (appointmentRecord, setIsLoading) => {
    setIsLoading(true)

    const vaccineName =
        appointmentRecord.vaccinePackageResponse === null
            ? appointmentRecord.batchDetailResponse.vaccineResponse.vaccineName
            : appointmentRecord.vaccinePackageResponse.vaccinePackageName
    const vacicnePrice =
        appointmentRecord.vaccinePackageResponse === null
            ? appointmentRecord.batchDetailResponse.batchDetailVaccinePrice
            : appointmentRecord.vaccinePackageResponse.vaccinePackagePrice

    const emailContent = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">STT</th>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Tên vắc xin</th>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Giá vắc xin</th>
                </tr>
            </thead>
            <tbody
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${1}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${vaccineName}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${vacicnePrice.toLocaleString()} VNĐ</td>
                    </tr>
            </tbody>
        </table>
    `

    const templateParams = {
        customerName: appointmentRecord.appointmentCustomerFullName,
        cutomerEmail: appointmentRecord.appointmentCustomerEmail,
        content: emailContent,
        injectionDate: appointmentRecord.appointmentInjectionDate,
    }
    console.log(templateParams)

    emailjs
        .send('service_wwqml4v', 'template_uk1un67', templateParams, {
            publicKey: 'lhyG5-7O7cRItbFjd',
        })
        .then(
            (response) => {
                setIsLoading(false)
                MyToast('success', 'Gửi email nhắc lịch tiêm thành công.')
            },
            (error) => {
                setIsLoading(false)
                MyToast('error', 'Xảy ra lỗi khi gửi email nhắc lịch tiêm.')
            }
        )
}
