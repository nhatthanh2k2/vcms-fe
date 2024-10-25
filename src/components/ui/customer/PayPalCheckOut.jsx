import React, { useEffect, useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import dayjs from 'dayjs'
import { addressService, orderService } from '@/services'
import { MyToast } from '../common'
import { convertVNDToUSD } from '@/utils'

const initialOptions = {
    clientId: 'AVFgZHMR6yUFprkAP0XZhbGYzIjYLLcqI8ozAxD4HV4k_giJyLZ62-Jove471Fqd0bSRnenNVfU11dQx',
    currency: 'USD',
    intent: 'capture',
}

export const PayPalCheckOut = ({
    batchDetailIdList,
    vaccinePackageIdList,
    total,
    payment,
    injectionDate,
    customer,
    orderType,
    orderInfo,
}) => {
    return (
        <div className="relative">
            <div className="absolute left-0 right-0 z-40">
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: convertVNDToUSD(total),
                                            currency_code: 'USD',
                                        },
                                        shipping: {
                                            name: {
                                                full_name:
                                                    orderType === 'CODE'
                                                        ? customer.customerFullName
                                                        : orderInfo.orderCustomerFullName,
                                            },
                                            address: {
                                                address_line_1:
                                                    orderType === 'CODE'
                                                        ? customer.customerProvince
                                                        : addressService.getProvincenNameByCode(
                                                              orderInfo.orderCustomerProvince
                                                          ),
                                                admin_area_2:
                                                    orderType === 'CODE'
                                                        ? customer.customerDistrict
                                                        : addressService.getDistrictNameByCode(
                                                              orderInfo.orderCustomerDistrict
                                                          ),
                                                admin_area_1:
                                                    orderType === 'CODE'
                                                        ? customer.customerWard
                                                        : addressService.getWardNameByCode(
                                                              orderInfo.orderCustomerWard
                                                          ),
                                                postal_code: '700000',
                                                country_code: 'VN',
                                            },
                                        },
                                    },
                                ],
                            })
                        }}
                        onApprove={async (data, actions) => {
                            // Capture the order
                            const details = await actions.order.capture()

                            // Kiểm tra orderType
                            if (orderType === 'CODE') {
                                const orderWithCodeData = {
                                    customerIdentifier: customer.customerCode,
                                    customerDob: customer.customerDob,
                                    orderTotal: total,
                                    orderPayment: payment,
                                    orderInjectionDate: injectionDate,
                                    orderBatchDetailIdList: batchDetailIdList.map(
                                        (item) => item.batchDetailId
                                    ),
                                    orderVaccinePackageIdList: vaccinePackageIdList.map(
                                        (item) => item.vaccinePackageId
                                    ),
                                }

                                try {
                                    const response = await orderService.createOrderWithCustomerCode(
                                        orderWithCodeData
                                    )
                                    if (response && response.data && response.data.code === 1000) {
                                        MyToast('success', 'Đặt hàng thành công')
                                    } else {
                                        MyToast('error', 'Đặt hàng không thành công')
                                    }
                                } catch (error) {
                                    console.error('Error creating order with customer code:', error)
                                    MyToast('error', 'Đặt hàng không thành công')
                                }
                            } else {
                                const orderData = {
                                    orderCustomerFullName: orderInfo.orderCustomerFullName,
                                    orderCustomerGender: orderInfo.orderCustomerGender,
                                    orderCustomerDob: dayjs(orderInfo.orderCustomerDob).format(
                                        'DD-MM-YYYY'
                                    ),
                                    orderCustomerEmail: orderInfo.orderCustomerEmail,
                                    orderCustomerPhone: orderInfo.orderCustomerPhone,
                                    orderCustomerProvince: addressService.getProvincenNameByCode(
                                        orderInfo.orderCustomerProvince
                                    ),
                                    orderCustomerDistrict: addressService.getDistrictNameByCode(
                                        orderInfo.orderCustomerDistrict
                                    ),
                                    orderCustomerWard: addressService.getWardNameByCode(
                                        orderInfo.orderCustomerWard
                                    ),
                                    orderTotal: total,
                                    orderPayment: payment,
                                    orderInjectionDate: dayjs(orderInfo.orderInjectionDate).format(
                                        'DD-MM-YYYY'
                                    ),
                                    orderBatchDetailIdList: batchDetailIdList.map(
                                        (item) => item.batchDetailId
                                    ),
                                    orderVaccinePackageIdList: vaccinePackageIdList.map(
                                        (item) => item.vaccinePackageId
                                    ),
                                }

                                // Gọi service để tạo order
                                try {
                                    const res = await orderService.createOrder(orderData)
                                    if (res.status === 200 && res.data.code === 1000) {
                                        MyToast('success', 'Đặt hàng thành công')
                                    } else {
                                        MyToast('error', 'Đặt hàng không thành công')
                                    }
                                } catch (error) {
                                    console.error('Error creating order:', error)
                                    MyToast('error', 'Đặt hàng không thành công')
                                }
                            }
                        }}
                        onCancel={(data, actions) => {
                            MyToast('error', 'Thanh toán bị huỷ')
                        }}
                        onError={(data, actions) => {
                            MyToast('error', 'Lỗi thanh toán')
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    )
}
