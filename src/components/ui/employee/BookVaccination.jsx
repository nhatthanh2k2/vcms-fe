import React, { useState } from 'react'
import { DatePicker, Modal, Select, Table } from 'antd'
import {
    disabledDoB,
    disabledPastDateForEmployee,
    formatCurrency,
    phoneNumberPattern,
} from '@/utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { employeeService, vaccinePackageService } from '@/services'
import { MyToast } from '../common'

const bookVaccineSchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    injectionDate: z.date({
        invalid_type_error: 'Ngày tiêm không hợp lệ',
        message: 'Ngày tiêm không hợp lệ',
    }),
    customerDob: z.date({
        invalid_type_error: 'Ngày sinh không hợp lệ',
        message: 'Ngày sinh không hợp lệ',
    }),
})

const columns = [
    {
        title: 'Tên vắc xin',
        dataIndex: ['vaccineResponse', 'vaccineName'],
        key: 'vaccineName',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Phòng bệnh',
        dataIndex: ['diseaseResponse', 'diseaseName'],
        key: 'diseaseName',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
        title: 'Số mũi tiêm',
        dataIndex: 'doseCount',
        key: 'doseCount',
        render: (text) => <span className="font-semibold">{text}</span>,
    },
]

export const BookVaccination = ({ batchDetailList, vaccinePackageList, vaccineList }) => {
    const [injectionType, setInjectionType] = useState('SINGLE')
    const [batchDetailSelected, setBatchDetailSelected] = useState(null)
    const [packageSelected, setPackageSelected] = useState(null)
    const [detailPackage, setDetailPackage] = useState([])
    const [actionType, setActionType] = useState('')
    const [payment, setPayment] = useState('')

    const handleChoseVaccine = (option) => {
        setBatchDetailSelected(option)
        setPackageSelected(null)
    }

    const handleChosePackage = (option) => {
        setPackageSelected(option)
        setBatchDetailSelected(null)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(bookVaccineSchema),
        defaultValues: {
            customerIdentifier: '',
            injectionDate: null,
            customerDob: null,
        },
    })

    const onSubmit = async (data) => {
        const request = {
            ...data,
            injectionDate: data.injectionDate
                ? dayjs(data.injectionDate).format('DD-MM-YYYY')
                : null,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
            injectionType: injectionType,
            batchDetailSelected: batchDetailSelected,
            packageSelected: packageSelected,
            payment: payment,
            actionType: actionType,
        }

        try {
            const response = await employeeService.bookVaccination(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Đặt vắc xin thành công.')
            } else {
                MyToast('error', 'Xảy ra lỗi khi đặt vắc xin.')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Không tìm thấy khách hàng.')
                }
            }
        }
    }

    // xem goi
    const [open, setOpen] = useState(false)

    const showModal = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleViewPackage = async () => {
        const response = await vaccinePackageService.getDetailsOfPackage(packageSelected)
        setDetailPackage(response.data.result)
        showModal()
    }

    const totalDoseCount = detailPackage.reduce((total, item) => total + item.doseCount, 0)

    const findPriceById = (id) => {
        const foundPackage = vaccinePackageList.find((pkg) => pkg.vaccinePackageId === id)
        return foundPackage ? foundPackage.vaccinePackagePrice : ''
    }

    const dataSourceWithTotal = [...detailPackage]

    console.log(batchDetailList)

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                Đặt vắc xin
            </h1>
            <form className="space-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-5">
                    <div className="flex-1 flex flex-col">
                        <label className="block mb-1 font-medium">Mã KH / SĐT:</label>
                        <input
                            {...register('customerIdentifier')}
                            type="text"
                            className="input input-bordered input-info w-full max-w-sm"
                        />
                        {errors.customerIdentifier && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.customerIdentifier.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium">Ngày tháng năm sinh:</label>
                        <DatePicker
                            {...register('customerDob', {
                                valueAsDate: true,
                            })}
                            format="DD-MM-YYYY"
                            disabledDate={disabledDoB}
                            onChange={(date) => {
                                setValue('customerDob', date?.toDate() || null, {
                                    shouldValidate: true,
                                })
                            }}
                            style={{ height: '48px' }}
                        />
                        {errors.customerDob && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.customerDob.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="block mb-1 font-medium">Ngày tiêm:</label>
                        <DatePicker
                            {...register('injectionDate', {
                                valueAsDate: true,
                            })}
                            format="DD-MM-YYYY"
                            disabledDate={disabledPastDateForEmployee}
                            onChange={(date) => {
                                setValue('injectionDate', date?.toDate() || null, {
                                    shouldValidate: true,
                                })
                            }}
                            style={{ height: '48px' }}
                        />
                        {errors.injectionDate && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.injectionDate.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-5">
                    <label htmlFor="vaccinationType" className="block mb-1 font-medium">
                        Loại vắc xin:
                    </label>

                    <div className="flex gap-2">
                        <label htmlFor="">Vắc xin lẻ</label>
                        <input
                            type="radio"
                            name="vaccinationType"
                            className="radio radio-info"
                            onChange={() => setInjectionType('SINGLE')}
                            checked={injectionType === 'SINGLE'}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label htmlFor="">Vắc xin gói</label>
                        <input
                            type="radio"
                            name="vaccinationType"
                            className="radio radio-info"
                            checked={injectionType === 'PACKAGE'}
                            onChange={() => setInjectionType('PACKAGE')}
                        />
                    </div>
                </div>

                <div>
                    {injectionType === 'SINGLE' ? (
                        <div>
                            <Select
                                value={batchDetailSelected}
                                onChange={handleChoseVaccine}
                                placeholder="Chọn vắc xin"
                                options={batchDetailList.map((batchDetail) => ({
                                    value: batchDetail.batchDetailId,
                                    label: (
                                        <span>
                                            {batchDetail.vaccineResponse.vaccineName} -{' '}
                                            {batchDetail.batchDetailVaccinePrice.toLocaleString()}
                                            {' VNĐ'}
                                        </span>
                                    ),
                                }))}
                                style={{
                                    width: 500,
                                    height: 40,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-5 ">
                            <div className="flex-1 w-full">
                                <Select
                                    value={packageSelected}
                                    onChange={handleChosePackage}
                                    placeholder="Chọn gói vắc xin"
                                    options={vaccinePackageList.map((pack) => ({
                                        value: pack.vaccinePackageId,
                                        label: (
                                            <span>
                                                {pack.vaccinePackageName} -{' '}
                                                {pack.vaccinePackagePrice.toLocaleString()} {' VNĐ'}
                                            </span>
                                        ),
                                    }))}
                                    style={{
                                        width: 600,
                                        height: 40,
                                    }}
                                />
                            </div>

                            <div className="flex gap-5 flex-1">
                                <button
                                    type="button"
                                    onClick={handleViewPackage}
                                    className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                                >
                                    <span>Xem gói</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-5">
                    <label className="block mb-1 font-medium">Đặt lịch hẹn Hoặc Đặt mua:</label>

                    <div className="flex gap-2">
                        <label>Đặt lịch hẹn</label>
                        <input
                            type="radio"
                            name="actionType"
                            className="radio radio-accent"
                            onChange={() => setActionType('APPT')}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label>Mua Vắc xin</label>
                        <input
                            type="radio"
                            name="actionType"
                            className="radio radio-accent"
                            onChange={() => setActionType('ORDER')}
                        />
                    </div>
                </div>
                {actionType === 'ORDER' && (
                    <div className="flex gap-5">
                        <label className="block mb-1 font-medium">
                            Chọn hình thức thanh toán :
                        </label>

                        <div className="flex gap-2">
                            <label>Tiền mặt</label>
                            <input
                                type="radio"
                                name="paymentType"
                                className="radio radio-info"
                                onChange={() => setPayment('CASH')}
                            />
                        </div>

                        <div className="flex gap-2">
                            <label>Chuyển khoản</label>
                            <input
                                type="radio"
                                name="paymentType"
                                className="radio radio-info"
                                onChange={() => setPayment('TRANSFER')}
                            />
                        </div>
                    </div>
                )}

                <div className=" flex gap-5 items-center justify-center mt-5">
                    <div className="m-3">
                        <button
                            type="submit"
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Đặt Vắc Xin</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentcolor"
                                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.1 15.1h9.9c.8 0 1.54-.5 1.84-1.23l3.02-6.63A1 1 0 0 0 21 6H5.21l-.94-2H1v2h2.17l3.61 7.59-1.35 2.44C4.79 16.3 5.42 17 6.24 17H19v-2H7.1l1.1-2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>

            <Modal
                title={<div className="text-center font-bold text-xl">Thông tin gói vắc xin</div>}
                open={open}
                onCancel={handleCancel}
                footer={false}
                width={1200}
                style={{ top: 50, maxHeight: '80vh' }}
                styles={{
                    body: {
                        overflowY: 'auto',
                        maxHeight: '70vh',
                        height: '70vh',
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataSourceWithTotal.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                />
            </Modal>
        </section>
    )
}
