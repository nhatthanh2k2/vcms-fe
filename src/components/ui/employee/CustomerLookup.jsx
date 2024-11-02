import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { customerService } from '@/services'
import { useForm } from 'react-hook-form'
import { DatePicker, Table } from 'antd'
import { disabledDoB, phoneNumberPattern } from '@/utils'
import { AlertModal, MyToast } from '../common'
import { VaccinationHistoryTable } from '../customer'

const lookupSchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
})

const columns = [
    {
        title: 'Mã vắc xin',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Liều lượng',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Mũi tiêm',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Ngày tiêm',
        dataIndex: 'code',
        key: 'customerCode',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
]

export const CustomerLookup = () => {
    const [customer, setCustomer] = useState(null)
    const formLookupCustomer = useRef(null)
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])

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
                    MyToast('info', 'Bạn chưa có dữ liệu tiêm chủng tại trung tâm')
                } else {
                    MyToast('success', 'Lấy lịch sử tiêm thành công')
                }
            }
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
        }
    }

    const handleLookupCustomer = () => {
        formLookupCustomer.current.requestSubmit()
    }

    const onSubmitLookup = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    setCustomer(response.data.result)
                    document.getElementById('modal_info').showModal()
                    getMyVaccinationReordHistory(lookupdata)
                } else {
                    document.getElementById('modal_no_info').showModal()
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    document.getElementById('modal_no_info').showModal()
                } else {
                    MyToast('error', 'Xảy ra lỗi khi tìm kiếm')
                }
            } else {
                MyToast('error', 'Xảy ra lỗi khi tìm kiếm')
            }
        }
    }

    return (
        <section className="flex-col">
            <div className=" bg-base-100 shadow-md flex flex-col p-4 space-y-2">
                <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-500  font-sans font-bold border-teal-400  dark:text-gray-200">
                    Tra cứu thông tin khách hàng
                </h1>

                <form ref={formLookupCustomer} onSubmit={handleSubmitLookup(onSubmitLookup)}>
                    <div className="flex flex-row space-x-4">
                        <div className="flex flex-col space-y-2 font-semibold flex-1">
                            <label className="block mb-1 font-medium">Nhập Mã KH / SĐT:</label>
                            <input
                                {...registerLookup('customerIdentifier')}
                                type="text"
                                placeholder="Số điện thoại / Mã KH"
                                className="input input-bordered input-info w-full  h-12"
                            />
                            {errorsLookup.customerIdentifier && (
                                <span className="w-fit text-red-500 text-sm">
                                    {errorsLookup.customerIdentifier.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2 font-semibold flex-1">
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
                                style={{ height: '48px' }} // Căn chỉnh chiều cao của DatePicker
                            />
                            {errorsLookup.customerDob && (
                                <span className="w-fit text-red-500 text-sm">
                                    {errorsLookup.customerDob.message}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 p-8">
                            <button
                                type="button"
                                onClick={handleLookupCustomer}
                                className=" bg-white tracking-wide  text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md  h-12"
                            >
                                Tra cứu khách hàng
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-5 shadow-lg">
                <input
                    type="radio"
                    name="customer_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-500 text-nowrap"
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
                    className="tab font-bold text-base text-orange-500 text-nowrap"
                    aria-label="Lịch sử tiêm chủng"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-3"
                >
                    <VaccinationHistoryTable vaccinationRecordList={vaccinationRecordList} />
                </div>
            </div>

            <AlertModal
                modalId={'modal_info'}
                message={'Khách hàng đã có thông tin tại trung tâm.'}
            />

            <AlertModal
                modalId={'modal_no_info'}
                message={'Khách hàng chưa có thông tin tại trung tâm.'}
            />
        </section>
    )
}
