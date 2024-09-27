import React, { useState } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { customerService } from '@/services'
import { useForm } from 'react-hook-form'
import { DatePicker } from 'antd'
import { disabledDoB } from '@/utils'

const phoneNumberPattern = /^0[3-9]\d{8}$/

const lookupSchema = z.object({
    lookupCustomerCode: z
        .string()
        .min(10, { message: 'Mã KH tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    lookupCustomerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
})

export const CustomerLookup = () => {
    const [customerCode, setCustomerCode] = useState('')
    const [customerInfo, setCustomerInfo] = useState(null)

    const handleSearch = () => {
        // In a real application, this would fetch customer data from a server
        const mockCustomerInfo = {
            name: 'David Smith',
            age: 45,
            vaccinationHistory: ['Flu (2022)', 'COVID-19 (2021)'],
            upcomingAppointments: ['Hepatitis B - 2023-07-01'],
        }
        setCustomerInfo(mockCustomerInfo)
    }

    const onSubmit = async (data) => {
        const lookupdata = {
            ...data,
            lookupCustomerDob: data.lookupCustomerDob
                ? dayjs(data.lookupCustomerDob).format('DD-MM-YYYY')
                : null,
        }

        const response = await customerService.lookupCustomer(lookupdata)

        if (response.data.code === 1005) {
            document.getElementById('modal_no_info').showModal()
            setShowForm(true)
        }

        if (response.data.code === 1000) {
            document.getElementById('modal_info').showModal()
            setExistsCustomer(response.data.result)
            setShowForm(false)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(lookupSchema),
        defaultValues: {
            lookupCustomerCode: '',
            lookupCustomerDob: null,
        },
    })

    return (
        <div className="p-4">
            <div className=" bg-gray-2 shadow-md">
                <span className="text-2xl text-blue-600 uppercase font-bold">
                    Tra cứu thông tin khách hàng
                </span>
                <form
                    className="flex flex-row gap-20 items-center mt-5 "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col space-y-2">
                        <label>Nhập SĐT hoặc Mã khách hàng</label>
                        <input
                            {...register('lookupCustomerCode')}
                            type="text"
                            placeholder="Số điện thoại / Mã KH"
                            className="input input-bordered input-info w-full max-w-xs"
                        />
                        {errors.lookupCustomerCode && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.lookupCustomerCode.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>Ngày tháng năm sinh</label>
                        <DatePicker
                            {...register('lookupCustomerDob', {
                                valueAsDate: true,
                            })}
                            format="DD-MM-YYYY"
                            disabledDate={disabledDoB}
                            onChange={(date) =>
                                setValue('lookupCustomerDob', date?.toDate() || null, {
                                    shouldValidate: true,
                                })
                            }
                            style={{ height: '48px' }}
                        />
                        {errors.lookupCustomerDob && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.lookupCustomerDob.message}
                            </span>
                        )}
                    </div>

                    <div className="">
                        <button className="btn btn-accent h-12" type="submit">
                            Tra cứu
                        </button>
                    </div>
                </form>
            </div>

            <dialog id="modal_no_info" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                        >
                            <path fill="#2980b9" d="M22 13a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                            <path fill="#3498db" d="M22 12a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                            <path
                                fill="#2980b9"
                                d="M11 7v2h2V7h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z"
                            />
                            <path
                                fill="#ecf0f1"
                                d="M11 6v2h2V6h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z"
                            />
                        </svg>
                        <span className=" font-bold text-lg">Thông báo</span>
                    </div>

                    <p className="py-5 text-xl text-blue-600">
                        Bạn chưa có thông tin khách hàng tại trung tâm. Mời bạn nhập thông tin bên
                        dưới để đặt mua!
                    </p>
                </div>
            </dialog>

            <dialog id="modal_info" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                        >
                            <path fill="#2980b9" d="M22 13a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                            <path fill="#3498db" d="M22 12a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                            <path
                                fill="#2980b9"
                                d="M11 7v2h2V7h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z"
                            />
                            <path
                                fill="#ecf0f1"
                                d="M11 6v2h2V6h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z"
                            />
                        </svg>
                        <span className=" font-bold text-lg">Thông báo</span>
                    </div>

                    <p className="py-5 text-xl text-blue-600">
                        Bạn là khách hàng của trung tâm. Mời bạn chọn vắc xin muốn mua!
                    </p>
                </div>
            </dialog>
        </div>
    )
}
