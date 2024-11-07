import { orderService } from '@/services'
import React from 'react'
import { MyToast } from '../../common'
import emailjs from '@emailjs/browser'

export const sendOrderConfirmation = async (record) => {
    try {
        const response = await orderService.getMyOrder(record.orderId)

        const contentList = response.data.result

        const productListHtml = contentList
            .map((detail, index) => {
                if (detail.batchDetailResponse !== null) {
                    return `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                        index + 1
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                        detail.batchDetailResponse.vaccineResponse.vaccineName
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">
                    ${detail.batchDetailResponse.batchDetailVaccinePrice} VNĐ</td>
                </tr>
            `
                } else {
                    return `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                        index + 1
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                        detail.vaccinePackageResponse.vaccinePackageName
                    }</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">
                    ${detail.vaccinePackageResponse.vaccinePackagePrice.toLocaleString()} VNĐ</td>
                </tr>
            `
                }
            })
            .join('')

        const productListContent = `
        
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">STT</th>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Tên vắc xin</th>
                    <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Giá vắc xin</th>
                </tr>
            </thead>
            <tbody>
                ${productListHtml}
            </tbody>
        </table>
        
    `

        const templateParams = {
            customerName: record.orderCustomerFullName,
            cutomerEmail: record.orderCustomerEmail,
            totalAmonut: record.orderTotal.toLocaleString(),
            product_list_html: productListContent,
        }

        emailjs
            .send('service_wwqml4v', 'template_9t0wifk', templateParams, {
                publicKey: 'lhyG5-7O7cRItbFjd',
            })
            .then((res) => MyToast('success', 'Bạn hãy kiểm tra email để xác nhận đơn hàng nhé.'))
            .catch((error) =>
                MyToast(
                    'error',
                    'Gửi mail xác nhận đơn hàng không thành công. Bạn hãy liên hệ SĐT của trung tâm để xác nhận nhé.'
                )
            )
    } catch (error) {
        MyToast('error', 'Không gửi được email xác nhận đơn hàng')
    }
}
