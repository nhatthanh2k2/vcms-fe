import React, { useEffect, useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import dayjs from 'dayjs'
import { addressService, orderService } from '@/services'
import { MyToast } from '../common'

const initialOptions = {
    clientId: 'AVFgZHMR6yUFprkAP0XZhbGYzIjYLLcqI8ozAxD4HV4k_giJyLZ62-Jove471Fqd0bSRnenNVfU11dQx',
    currency: 'USD',
    intent: 'capture',
}

export const PayPalCheckOut = ({
    BatchDetailIdList,
    VaccinePackageIdList,
    Total,
    Payment,
    InjectionDate,
    customer,
    orderType,
    orderInfo,
}) => {
    // console.log('BatchDetailIdList:', BatchDetailIdList)
    // console.log('VaccinePackageIdList:', VaccinePackageIdList)
    // console.log('Total:', Total)
    // console.log('Payment:', Payment)
    // console.log('InjectionDate:', InjectionDate)
    // console.log('customer:', customer)
    // console.log('orderType:', orderType)
    // console.log('orderNoCode:', orderInfo)

    const [provinceData, setProvinceData] = useState('')
    const [districtData, setDistrictData] = useState('')
    const [wardData, setWardData] = useState('')

    useEffect(() => {
        addressService
            .getProvinceByCode(orderInfo.orderCustomerProvince)
            .then((response) => setProvinceData(response.data.name))
            .catch((err) => console.log('Get Province Failed!'))
        addressService
            .getDistrictByCode(orderInfo.orderCustomerDistrict)
            .then((response) => setDistrictData(response.data.name))
            .catch((err) => console.log('Get District Failed!'))
        addressService
            .getWardByCode(orderInfo.orderCustomerWard)
            .then((response) => setWardData(response.data.name))
            .catch((err) => console.log('Get Ward Failed!'))
    }, [orderInfo])

    const createOrder = async (data, actions) => {
        if (orderType === 'CODE') {
            const orderWithCodeData = {
                customerCode: customer.customerCode,
                customerPhone: customer.customerPhone,
                oTotal: Total,
                Payment: Payment,
                InjectionDate: dayjs(InjectionDate).format('DD-MM-YYYY'),
                BatchDetailIdList: BatchDetailIdList.map((item) => item.id),
                VaccinePackageIdList: VaccinePackageIdList.map((item) => item.id),
            }
            console.log(orderWithCodeData)
        } else {
            const orderData = {
                orderCustomerFullName: orderInfo.orderCustomerFullName,
                orderCustomerGender: orderInfo.orderCustomerGender,
                orderCustomerDob: dayjs(orderInfo.orderCustomerDob).format('DD-MM-YYYY'),
                orderCustomerEmail: orderInfo.orderCustomerEmail,
                orderCustomerPhone: orderInfo.orderCustomerPhone,
                orderCustomerProvince: provinceData,
                orderCustomerDistrict: districtData,
                orderCustomerWard: wardData,
                Total: Total,
                Payment: Payment,
                InjectionDate: dayjs(orderInfo.InjectionDate).format('DD-MM-YYYY'),
                BatchDetailIdList: BatchDetailIdList.map((item) => item.id),
                VaccinePackageIdList: VaccinePackageIdList.map((item) => item.id),
            }
            console.log(orderData)
        }
    }

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
                                            value: (Total / 24000).toFixed(2),
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
                                                        : orderInfo.orderCustomerProvince,
                                                admin_area_2:
                                                    orderType === 'CODE'
                                                        ? customer.customerDistrict
                                                        : orderInfo.orderCustomerDistrict,
                                                admin_area_1:
                                                    orderType === 'CODE'
                                                        ? customer.customerWard
                                                        : orderInfo.orderCustomerWard,
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
                                    customerCode: customer.customerCode,
                                    customerPhone: customer.customerPhone,
                                    orderTotal: Total,
                                    orderPayment: Payment,
                                    orderInjectionDate: InjectionDate,
                                    orderBatchDetailIdList: BatchDetailIdList.map(
                                        (item) => item.batchDetailId
                                    ),
                                    orderVaccinePackageIdList: VaccinePackageIdList.map(
                                        (item) => item.vaccinePackageId
                                    ),
                                }
                                console.log(orderWithCodeData)

                                // Gọi service để tạo order với customer code
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
                                    orderCustomerProvince: provinceData,
                                    orderCustomerDistrict: districtData,
                                    orderCustomerWard: wardData,
                                    orderTotal: Total,
                                    orderPayment: Payment,
                                    orderInjectionDate: InjectionDate,
                                    orderBatchDetailIdList: BatchDetailIdList.map(
                                        (item) => item.batchDetailId
                                    ),
                                    orderVaccinePackageIdList: VaccinePackageIdList.map(
                                        (item) => item.vaccinePackageId
                                    ),
                                }
                                console.log(orderData)

                                // Gọi service để tạo order
                                try {
                                    const res = await orderService.createOrder(orderData)
                                    if (res && res.data && res.data.code === 1000) {
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
