import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import { calculateAge, disabledDoB, phoneNumberPattern } from '@/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../common'
import { customerService, vaccinePackageService } from '@/services'
import dayjs from 'dayjs'
import { VaccinationHistoryTable } from '.'

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
    const [customer, setCustomer] = useState()
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])
    const [vaccinePackageList, setVaccinePackageList] = useState([])
    const [packageSelected, setPackageSelected] = useState(0)
    const [packageDetailList, setPackageDetailList] = useState([])
    const [filteredPackageDetailList, setFilteredPackageDetailList] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((error) => console.log('Get defaultpackage failed!'))
    }, [])

    useEffect(() => {
        if (customer?.customerDob) {
            const customerAge = calculateAge(customer.customerDob)

            if (customerAge <= 2) {
                setPackageSelected(8)
            } else if (customerAge > 2 && customerAge <= 9) {
                setPackageSelected(4)
            } else if (customerAge > 9 && customerAge <= 18) {
                setPackageSelected(3)
            } else {
                setPackageSelected(1)
            }
        }
    }, [customer])

    useEffect(() => {
        if (packageSelected) {
            vaccinePackageService
                .getDetailsOfPackage(packageSelected)
                .then((response) => setPackageDetailList(response.data.result))
                .catch((error) => console.log('Get detail of package failed!'))
        }
        setFilteredPackageDetailList(
            packageDetailList.filter((detail) => {
                const vaccineId = detail.vaccineResponse.vaccineId
                const isInVaccinationRecordList = vaccinationRecordList.some(
                    (record) => record.vaccineResponse.vaccineId === vaccineId
                )
                return !isInVaccinationRecordList
            })
        )
    }, [packageSelected])

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

    const getMyRecords = async (request) => {
        try {
            const response = await customerService.getMyVaccinationHistory(request)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    setVaccinationRecordList(response.data.result)
                    if (vaccinationRecordList.length === 0) {
                        MyToast('info', 'Bạn chưa có dữ liệu tiêm chủng tại trung tâm')
                    } else {
                        MyToast('success', 'Lấy lịch sử tiêm thành công')
                    }
                }
            }
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
        }
    }

    const onSubmit = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)
            console.log(response.data)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Tra cứu thông tin khách hàng thành công')
                    setCustomer(response.data.result)
                    await getMyRecords(lookupdata)
                } else {
                    MyToast('error', 'Tra cứu thông tin khách hàng không thành công')
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
                    Tra cứu lịch sử tiêm chủng
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

            <div>
                <span className="text-xl font-bold text-blue-600">Thông tin khách hàng</span>
                <div className="flex space-x-5 mt-2">
                    <input
                        value={customer?.customerFullName}
                        readOnly
                        type="text"
                        placeholder="Họ và tên"
                        className="input input-bordered input-success input-sm w-full max-w-xs"
                    />

                    <input
                        value={customer?.customerPhone}
                        readOnly
                        type="text"
                        placeholder="Số điện thoại:"
                        className="input input-bordered input-success input-sm w-full max-w-xs"
                    />

                    <input
                        value={
                            customer?.customerProvince &&
                            customer?.customerDistrict &&
                            customer?.customerWard
                                ? customer.customerWard +
                                  ', ' +
                                  customer.customerDistrict +
                                  ', ' +
                                  customer.customerProvince
                                : ''
                        }
                        readOnly
                        type="text"
                        placeholder="Địa chỉ:"
                        className="input input-bordered input-success input-sm w-full max-w-lg"
                    />
                </div>
            </div>

            {vaccinationRecordList.length === 0 ? (
                <div className="mt-2">
                    <span className="text-xl font-bold text-blue-600">Vắc xin bạn nên tiêm</span>
                    <div className="flex flex-wrap">
                        {packageDetailList.map((detail, index) => (
                            <div key={index} className="w-1/4 p-2">
                                <div className="border rounded-lg p-4">
                                    <h3>{detail.vaccineResponse.vaccineName}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-5">
                    <span className="text-xl font-bold text-blue-600">Vắc xin bạn nên tiêm 2</span>
                    <div className="flex flex-wrap">
                        {filteredPackageDetailList.map((detail, index) => (
                            <div key={index} className="w-1/4 p-2">
                                <div className="border rounded-lg p-4">
                                    <h3>{detail.vaccineResponse.vaccineName}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-5">
                <span className="text-xl font-bold text-blue-600">Bảng vắc xin đã tiêm</span>
                <div className="mt-2">
                    <VaccinationHistoryTable vaccinationRecordList={vaccinationRecordList} />
                </div>
            </div>
        </div>
    )
}
