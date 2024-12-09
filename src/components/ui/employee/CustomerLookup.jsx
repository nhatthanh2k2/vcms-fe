import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { appointmentService, customerService, orderService } from '@/services'
import { useForm } from 'react-hook-form'
import { DatePicker, Table } from 'antd'
import { disabledDoB, phoneNumberPattern } from '@/utils'
import { AlertModal, MyToast } from '../common'
import { MyAppointmentTable, MyOrderTable, VaccinationHistoryTable } from '../customer'
import { CustomerAppointmentTable, CustomerOrderTable } from '.'

const lookupSchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
})

export const CustomerLookup = () => {
    const [customer, setCustomer] = useState(null)
    const formLookupCustomer = useRef(null)
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])
    const [myAppointmentList, setMyAppointmentList] = useState([])
    const [myOrderList, setMyOrderList] = useState([])

    const {
        register: registerLookup,
        handleSubmit: handleSubmitLookup,
        formState: { errors: errorsLookup },
        setValue: setValueLookup,
    } = useForm({
        resolver: zodResolver(lookupSchema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
        },
    })

    const getMyVaccinationReordHistory = async (request) => {
        try {
            const response = await customerService.getMyVaccinationHistory(request)

            if (response.data.code === 1000) {
                const recordList = response.data.result
                setVaccinationRecordList(recordList)

                if (recordList.length === 0) {
                    //MyToast('info', 'Bạn chưa có dữ liệu tiêm chủng tại trung tâm')
                    console.log('Bạn chưa có dữ liệu tiêm chủng tại trung tâm.')
                } else {
                    //MyToast('success', 'Lấy lịch sử tiêm thành công')
                    console.log('Lấy lịch sử tiêm thành công.')
                }
            }
        } catch (error) {
            //MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
            console.log('Không thể lấy lịch sử tiêm chủng.')
        }
    }

    const handleLookupCustomer = () => {
        formLookupCustomer.current.requestSubmit()
    }

    const getMyAppointmentList = async (request) => {
        try {
            const response = await appointmentService.getMyAppontmentList(request)

            if (response.data.code === 1000) {
                const appointmentList = response.data.result
                setMyAppointmentList(appointmentList)
            } else {
                console.log('Không có dữ liệu')
            }
        } catch (error) {
            //MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
            console.log('Không có dữ liệu')
        }
    }

    const getMyOrderList = async (request) => {
        try {
            const response = await orderService.getMyOrderList(request)

            if (response.data.code === 1000) {
                const orderList = response.data.result
                setMyOrderList(orderList)
            } else {
                console.log('Không có dữ liệu')
            }
        } catch (error) {
            //MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
            console.log('Không có dữ liệu')
        }
    }

    const onSubmitLookup = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)

            if (response.data.code === 1000) {
                setCustomer(response.data.result)
                //document.getElementById('modal_info').showModal()
                MyToast('success', 'Tra cứu khách hàng thành công.')
                getMyVaccinationReordHistory(lookupdata)
                getMyAppointmentList(lookupdata)
                getMyOrderList(lookupdata)
            } else {
                // document.getElementById('modal_no_info').showModal()
                MyToast('error', 'Xảy ra lỗi khi tìm kiếm.')
            }
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Khách hàng chưa có thông tin.')
            }
        }
    }

    return (
        <section className="flex-col">
            <div className=" bg-base-100 shadow-default flex flex-col p-4 space-y-2 rounded-lg">
                <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                    Tra cứu thông tin khách hàng
                </h1>

                <form ref={formLookupCustomer} onSubmit={handleSubmitLookup(onSubmitLookup)}>
                    <div className="flex flex-row items-center justify-between space-x-5">
                        <div className="flex flex-col space-y-2 font-semibold">
                            <label className="block mb-1 font-medium">Nhập Mã KH / SĐT:</label>
                            <input
                                {...registerLookup('customerIdentifier')}
                                type="text"
                                className="input input-bordered input-info w-full h-12"
                            />
                            {errorsLookup.customerIdentifier && (
                                <span className="w-fit text-red-500 text-sm">
                                    {errorsLookup.customerIdentifier.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2 font-semibold ">
                            <label className="block mb-1 font-medium">Ngày/tháng/năm sinh:</label>
                            <DatePicker
                                {...registerLookup('customerDob', {
                                    valueAsDate: true,
                                })}
                                format="DD-MM-YYYY"
                                disabledDate={disabledDoB}
                                onChange={(date) =>
                                    setValueLookup('customerDob', date?.toDate() || null, {
                                        shouldValidate: true,
                                    })
                                }
                                style={{ height: '48px' }}
                            />
                            {errorsLookup.customerDob && (
                                <span className="w-fit text-red-500 text-sm">
                                    {errorsLookup.customerDob.message}
                                </span>
                            )}
                        </div>

                        <div className="m-3 flex-1">
                            <button
                                type="submit"
                                className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-teal-500 hover:border-teal-600 hover:bg-teal-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                            >
                                <span className="mr-2">Tra cứu khách hàng</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M9 2a7 7 0 1 0 4.192 12.606l7.1 7.101a1 1 0 0 0 1.415-1.414l-7.1-7.1A7 7 0 0 0 9 2ZM4 9a5 5 0 1 1 10 0A5 5 0 0 1 4 9Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-5 shadow-default border-base-200">
                <input
                    type="radio"
                    name="customer_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Thông tin khách hàng"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box px-10 pb-10"
                >
                    <div className="flex gap-10 mt-5">
                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Mã khách hàng:</label>
                            <input
                                readOnly
                                value={customer?.customerCode}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Họ và tên:</label>
                            <input
                                readOnly
                                value={customer?.customerFullName}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-10 mt-5">
                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Email:</label>
                            <input
                                readOnly
                                value={customer?.customerEmail}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Số điện thoại:</label>
                            <input
                                readOnly
                                value={customer?.customerPhone}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-10 mt-5">
                        <div className="flex-1 flex flex-col space-y-2">
                            <label className="font-semibold">Ngày sinh:</label>
                            <input
                                readOnly
                                value={customer?.customerDob}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>

                        <div className="flex-1 flex flex-col space-y-2 font-semibold">
                            <label>Giới tính:</label>
                            <div className="flex gap-10 ">
                                <div className="flex gap-5">
                                    <label htmlFor="">Nam</label>
                                    <input
                                        readOnly
                                        type="radio"
                                        name="radio-5"
                                        className="radio radio-success"
                                        checked={customer?.customerGender === 'MALE'}
                                    />
                                </div>

                                <div className="flex gap-5">
                                    <label htmlFor="">Nữ</label>
                                    <input
                                        readOnly
                                        type="radio"
                                        name="radio-5"
                                        className="radio radio-success"
                                        checked={customer?.customerGender === 'FEMALE'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="font-semibold mt-5">
                        <label>Địa chỉ thường trú:</label>
                    </div>

                    <div className="flex gap-10 ">
                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Tỉnh/Thành:</label>
                            <input
                                readOnly
                                value={customer?.customerProvince}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Quận/Huyện:</label>
                            <input
                                readOnly
                                value={customer?.customerDistrict}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Xã/Phường:</label>
                            <input
                                readOnly
                                value={customer?.customerWard}
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                            />
                        </div>
                    </div>
                </div>

                <input
                    type="radio"
                    name="customer_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Lịch sử tiêm chủng"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-3"
                >
                    <VaccinationHistoryTable vaccinationRecordList={vaccinationRecordList} />
                </div>

                <input
                    type="radio"
                    name="customer_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Lịch hẹn"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-3"
                >
                    {/* <MyAppointmentTable myAppointmentList={myAppointmentList} /> */}
                    <CustomerAppointmentTable appointmentList={myAppointmentList} />
                </div>

                <input
                    type="radio"
                    name="customer_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-600 text-nowrap"
                    aria-label="Đơn hàng"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-3"
                >
                    {/* <MyOrderTable myOrderList={myOrderList} /> */}
                    <CustomerOrderTable orderList={myOrderList} />
                </div>
            </div>
        </section>
    )
}
