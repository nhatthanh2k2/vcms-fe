import React, { useEffect, useState } from 'react'
import { disabledDoB, disabledPastDate, convertPackageType } from '@/utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DatePicker, Select, Table } from 'antd'
import { employeeService, vaccinePackageService } from '@/services'
import dayjs from 'dayjs'
import { MyToast } from '../common'

const phoneNumberPattern = /^0[3-9]\d{8}$/

const schema = z.object({
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

export const CustomizableVaccinePackage = ({
    vaccinePackageList,
    vaccineList,
    batchDetailList,
}) => {
    const [packageSelected, setPackageSelected] = useState(null)
    const [packageDetailList, setPackageDetailList] = useState([])
    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [payment, setPayment] = useState('')

    const handleChosePackage = async (option) => {
        setPackageSelected(option)
        const response = await vaccinePackageService.getDetailsOfPackage(option)
        setPackageDetailList(response.data.result)
    }

    useEffect(() => {
        const filteredData = batchDetailList.filter(
            (detail) =>
                !packageDetailList.some(
                    (packageDetail) =>
                        packageDetail.vaccineResponse.vaccineId === detail.vaccineResponse.vaccineId
                )
        )
        setFilteredVaccineList(filteredData)
    }, [packageDetailList])

    //console.log(batchDetailList)
    //console.log(packageDetailList)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
            injectionDate: null,
        },
    })

    const onSubmit = async (data) => {
        const request = {
            ...data,
            injectionDate: data.injectionDate
                ? dayjs(data.injectionDate).format('DD-MM-YYYY')
                : null,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
            payment: payment,
            vaccinePackageId: packageSelected,
            vaccineIdList: packageDetailList.map(
                (packageDetail) => packageDetail.vaccineResponse.vaccineId
            ),
            doseCountList: packageDetailList.map((packageDetail) => packageDetail.doseCount),
        }
        // const response = await employeeService.bookCustomPackage(request)

        // if (response.data.code === 1000) {
        //     MyToast('success', 'Đặt Gói Vắc Xin Thành Công')
        // } else {
        //     MyToast('success', 'Đặt Gói Vắc Xin Thành Công')
        // }

        try {
            const response = await employeeService.bookCustomPackage(request)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Đặt Gói Vắc Xin Thành Công')
                } else {
                    MyToast('error', 'Đặt Gói Vắc Xin Không Thành Công')
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Không Tìm Thấy Khách Hàng')
                } else {
                    MyToast('error', 'Xảy ra lỗi')
                }
            } else {
                MyToast('error', 'Xảy ra lỗi')
            }
        }
    }

    const addVaccineToPackage = (batchDetailId) => {
        const batchDetailToAdd = batchDetailList.find(
            (detail) => detail.batchDetailId === batchDetailId
        )

        if (batchDetailToAdd) {
            const doseCount =
                packageSelected <= 3
                    ? batchDetailToAdd.vaccineResponse.vaccineAdultDoseCount
                    : batchDetailToAdd.vaccineResponse.vaccineChildDoseCount

            setPackageDetailList((prev) => [
                ...prev,
                {
                    vaccineResponse: batchDetailToAdd.vaccineResponse,
                    doseCount: doseCount,
                },
            ])

            setFilteredVaccineList((prev) =>
                prev.filter(
                    (vaccine) => vaccine.vaccineId !== batchDetailToAdd.vaccineResponse.vaccineId
                )
            )
        }
    }

    const removeVaccineFromPackage = (vaccineId) => {
        const vaccineToRemove = packageDetailList.find(
            (packageDetail) => packageDetail.vaccineResponse.vaccineId === vaccineId
        )

        if (vaccineToRemove) {
            setFilteredVaccineList((prev) => [
                ...prev,
                {
                    vaccineResponse: vaccineToRemove,
                },
            ])

            setPackageDetailList((prev) =>
                prev.filter(
                    (packageDetail) => packageDetail.vaccineResponse.vaccineId !== vaccineId
                )
            )
        }
    }

    const packageDetailColumns = [
        {
            title: 'Tên Vắc Xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
            width: 150,
        },
        {
            key: 'action',
            width: 50,
            render: (text, record) => (
                <svg
                    onClick={() => removeVaccineFromPackage(record.vaccineResponse.vaccineId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 stroke-current text-black hover:text-red-500 transition-colors duration-300 ease-in-out"
                >
                    <g strokeLinecap="round" strokeWidth={1.5}>
                        <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />

                        <path d="M15 9L9 15" />
                        <path d="M9 9l6 6" />
                    </g>
                </svg>
            ),
        },
    ]

    const batchDetailColumns = [
        {
            title: 'Tên Vắc Xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
            width: 150,
            onFilter: (value, record) => {
                if (value === 'CHILD') {
                    return record.vaccineResponse.vaccineAdultDoseCount === 0
                }

                if (value === 'ADULT') {
                    return record.vaccineResponse.vaccineAdultDoseCount > 0
                }
                return false
            },
            filters: [
                { text: 'Trẻ Em', value: 'CHILD' },
                { text: 'Người Lớn', value: 'ADULT' },
            ],
            filterMultiple: false,
        },
        {
            key: 'action',
            width: 50,
            render: (text, record) => (
                <svg
                    onClick={() => addVaccineToPackage(record.batchDetailId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 stroke-current text-black hover:text-green-500 transition-colors duration-300 ease-in-out"
                >
                    <g strokeLinecap="round" strokeWidth={1.5}>
                        <path d="M15 12h-3m0 0H9m3 0V9m0 3v3" />

                        <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                    </g>
                </svg>
            ),
        },
    ]

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
                Đăng ký gói vắc xin theo yêu cầu
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                            disabledDate={disabledPastDate}
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

                <div className="flex gap-5 items-center">
                    <label htmlFor="vaccinationType" className="block mb-1 font-medium">
                        Chọn gói muốn thay đổi:
                    </label>

                    <div className="flex flex-col space-y-5">
                        <Select
                            value={packageSelected}
                            onChange={handleChosePackage}
                            placeholder="Chọn gói vắc xin"
                            options={vaccinePackageList.map((pack) => ({
                                value: pack.vaccinePackageId,
                                label: (
                                    <span>
                                        {pack.vaccinePackageName}{' '}
                                        {convertPackageType(pack.vaccinePackageType)}
                                    </span>
                                ),
                            }))}
                            style={{
                                width: 384,
                                height: 40,
                            }}
                        />
                    </div>
                </div>

                {packageSelected && (
                    <div className="flex flex-row space-x-5">
                        <div>
                            <Table
                                columns={packageDetailColumns}
                                dataSource={packageDetailList}
                                rowKey={'vaccinePkgDetailId'}
                                pagination={false}
                                scroll={{
                                    y: 400,
                                }}
                                title={() => (
                                    <div className="text-center text-lg text-orange-500 font-semibold">
                                        Vắc Xin Trong Gói
                                    </div>
                                )}
                                rowClassName={(record, index) =>
                                    index % 2 === 0 ? 'even-row' : 'odd-row'
                                }
                            />
                        </div>

                        <div>
                            <Table
                                columns={batchDetailColumns}
                                dataSource={filteredVaccineList}
                                rowKey={'batchDetailId'}
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: false,
                                    showQuickJumper: false,
                                }}
                                scroll={{
                                    y: 400,
                                }}
                                title={() => (
                                    <div className="text-center text-lg text-orange-500 font-semibold">
                                        Danh Mục Vắc Xin
                                    </div>
                                )}
                                rowClassName={(record, index) =>
                                    index % 2 === 0 ? 'even-row' : 'odd-row'
                                }
                            />
                        </div>
                    </div>
                )}

                <div className="flex gap-5">
                    <label className="block mb-1 font-medium">Chọn hình thức thanh toán:</label>

                    <div className="flex gap-2">
                        <label>Tiền mặt</label>
                        <input
                            type="radio"
                            name="paymentType"
                            className="radio radio-success"
                            onChange={() => setPayment('CASH')}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label>Chuyển khoản</label>
                        <input
                            type="radio"
                            name="paymentType"
                            className="radio radio-success"
                            onChange={() => setPayment('TRANSFER')}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Đặt Mua Vắc Xin</span>
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
            </form>
        </section>
    )
}
