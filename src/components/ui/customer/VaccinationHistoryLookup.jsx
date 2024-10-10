import React from 'react'
import { DatePicker } from 'antd'
import { disabledDoB, phoneNumberPattern } from '@/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../common'
import { customerService } from '@/services'
import dayjs from 'dayjs'

const lookupSchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
})

export const VaccinationHistoryLookup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(lookupSchema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
        },
    })

    const onSubmit = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Tra cứu thành công')
                } else {
                    MyToast('error', 'Tra cứu không thành công')
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Không tìm thấy khách hàng')
                } else {
                    MyToast('error', 'Đã có lỗi xảy ra')
                }
            } else {
                MyToast('error', 'Đã có lỗi xảy ra')
            }
        }
    }

    return (
        <div className="flex flex-col mx-20 mt-10">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-600 font-satoshi font-bold">
                    Lịch sử tiêm chủng
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-5">
                <form className="flex flex-row space-x-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-2 font-semibold flex-1">
                        <label className="block mb-1 font-medium">Nhập Mã KH / SĐT:</label>
                        <div className=" relative">
                            <input
                                {...register('customerIdentifier')}
                                type="text"
                                placeholder="Số điện thoại / Mã KH"
                                className="input input-bordered input-info w-full  h-12"
                            />
                            {errors.customerIdentifier && (
                                <span className="w-fit text-red-500 text-sm">
                                    {errors.customerIdentifier.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 font-semibold flex-1">
                        <label className="block mb-1 font-medium">Ngày/tháng/năm sinh:</label>
                        <div className="relative flex flex-col">
                            <DatePicker
                                {...register('customerDob', {
                                    valueAsDate: true,
                                })}
                                onChange={(date) =>
                                    setValue('customerDob', date?.toDate() || null, {
                                        shouldValidate: true,
                                    })
                                }
                                format="DD-MM-YYYY"
                                disabledDate={disabledDoB}
                                style={{ height: '48px' }}
                            />
                            {errors.customerDob && (
                                <span className="absolute left-0 top-full mt-1 w-fit text-red-500 text-sm">
                                    {errors.customerDob.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 p-10">
                        <button
                            type="submit"
                            className="text-base rounded-full border-l-0 border-r-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2  font-bold cursor-pointer 
                        hover:bg-green-500 hover:text-white  bg-green-300   text-green-800 border duration-200 ease-in-out  border-green-500 transition"
                        >
                            Tra cứu thông tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
