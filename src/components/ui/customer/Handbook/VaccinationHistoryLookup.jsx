import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import { calculateAge, disabledDoB, phoneNumberPattern } from '@/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../../common'
import {
    appointmentService,
    customerService,
    orderService,
    vaccinePackageService,
    vaccineService,
} from '@/services'
import dayjs from 'dayjs'
import { MyAppointmentTable, MyOrderTable, VaccinationHistoryTable } from '.'

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
    const [vaccineList, setVaccineList] = useState([])
    const [packageDetailList, setPackageDetailList] = useState([])
    const [recommendedPackageList, setRecommendedPackageList] = useState([])
    const [myAppointmentList, setMyAppointmentList] = useState([])
    const [myOrderList, setMyOrderList] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setVaccinePackageList(response.data.result))
            .catch((error) => console.log('Get default package failed!'))
        vaccineService
            .getAllVaccines()
            .then((response) => setVaccineList(response.data.result))
            .catch((error) => console.log('Get vaccine list failed!'))
    }, [])

    const getSuggestedPackage = (ageInfo, vaccinePackageList) => {
        return vaccinePackageList.find((pkg) => {
            if (ageInfo.ageInMonths !== null && ageInfo.ageInMonths <= 24) {
                if (pkg.vaccinePackageName.includes('Gói 6 tháng') && ageInfo.ageInMonths <= 6) {
                    return true
                }
                if (pkg.vaccinePackageName.includes('Gói 9 tháng') && ageInfo.ageInMonths <= 9) {
                    return true
                }
                if (pkg.vaccinePackageName.includes('Gói 12 tháng') && ageInfo.ageInMonths <= 12) {
                    return true
                }
                if (pkg.vaccinePackageName.includes('Gói 24 tháng') && ageInfo.ageInMonths <= 24) {
                    return true
                }
            } else if (ageInfo.ageInYears >= 18) {
                return pkg.vaccinePackageName.includes('trưởng thành')
            } else if (ageInfo.ageInYears >= 9 && ageInfo.ageInYears <= 18) {
                return pkg.vaccinePackageName.includes('9 tuổi - 18 tuổi')
            } else if (ageInfo.ageInYears >= 4 && ageInfo.ageInYears <= 6) {
                return pkg.vaccinePackageName.includes('4 tuổi - 6 tuổi')
            }
            return false
        })
    }

    useEffect(() => {
        if (customer?.customerDob) {
            const suggestPackage = getSuggestedPackage(
                calculateAge(customer.customerDob),
                vaccinePackageList
            )

            if (suggestPackage) {
                vaccinePackageService
                    .getDetailsOfPackage(suggestPackage.vaccinePackageId)
                    .then((response) => {
                        const vaccinesInPackage = response.data.result
                        const vaccinesToSuggest = []

                        for (const detail of vaccinesInPackage) {
                            if (vaccinesToSuggest.length === 3) break

                            const vaccine = detail.vaccineResponse
                            const isVaccineAdministered = vaccinationRecordList.some(
                                (record) => record.vaccineName === vaccine.vaccineName
                            )

                            if (!isVaccineAdministered) {
                                vaccinesToSuggest.push(detail)
                            }
                        }

                        setRecommendedPackageList(vaccinesToSuggest)
                    })
                    .catch((error) => console.log('Get detail of package failed!', error))
            }
        }
    }, [vaccinationRecordList])

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

    const getMyVaccinationReordHistory = async (request) => {
        try {
            const response = await customerService.getMyVaccinationHistory(request)

            if (response.data.code === 1000) {
                const recordList = response.data.result
                setVaccinationRecordList(recordList)
            }
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi lấy lịch sử tiêm chủng')
        }
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

    const onSubmit = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        const myData = {
            customerIdentifier: data.customerIdentifier,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)

            if (response.data.code === 1000) {
                MyToast('success', 'Tra cứu thông tin khách hàng thành công')
                setCustomer(response.data.result)
                getMyVaccinationReordHistory(lookupdata)
                getMyAppointmentList(myData)
                getMyOrderList(myData)
            } else {
                MyToast('error', 'Tra cứu thông tin khách hàng không thành công')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Không tìm thấy khách hàng')
                }
            }
        }
    }

    return (
        <div className="flex flex-col mx-20 mt-10">
            <div className="relative">
                <div className="uppercase text-2xl text-blue-700 font-satoshi font-bold">
                    Tra cứu lịch sử tiêm chủng
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="mt-5 flex justify-center space-x-5">
                <form
                    className=" flex flex-col font-semibold space-y-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col">
                        <label className=" mb-1 font-medium">Nhập Mã KH / SĐT:</label>
                        <div className=" relative">
                            <input
                                {...register('customerIdentifier')}
                                type="text"
                                placeholder="Số điện thoại / Mã KH"
                                className="input input-bordered input-info w-full h-12"
                            />
                            {errors.customerIdentifier && (
                                <p className=" text-red-500 text-sm">
                                    {errors.customerIdentifier.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className=" mb-1 font-medium">Ngày/tháng/năm sinh:</label>
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
                                <p className=" text-red-500 text-sm">
                                    {errors.customerDob.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-1">
                        <button
                            type="submit"
                            className="text-base rounded-full border-l-0 border-r-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2  font-bold cursor-pointer 
                        hover:bg-green-500 hover:text-white  bg-green-300   text-green-800 border duration-200 ease-in-out  border-green-500 transition"
                        >
                            Tra cứu thông tin
                        </button>
                    </div>
                </form>

                {customer ? (
                    <div className="w-full">
                        <div>
                            <span className="text-xl font-bold text-teal-700">
                                Thông tin khách hàng
                            </span>
                            <div className="flex space-x-5 mt-2">
                                <input
                                    value={customer?.customerFullName}
                                    readOnly
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="input input-bordered input-success input-sm w-full max-w-fit flex-1"
                                />

                                <input
                                    value={customer?.customerPhone}
                                    readOnly
                                    type="text"
                                    placeholder="Số điện thoại:"
                                    className="input input-bordered input-success input-sm w-full max-w-fit flex-1"
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
                                    className="input input-bordered input-success input-sm w-full max-w-sm flex-2"
                                />
                            </div>
                        </div>

                        <div className="mt-2">
                            <span className="text-xl font-bold text-teal-700">
                                Vắc xin bạn nên tiêm
                            </span>
                            <div className="flex flex-wrap mt-2">
                                {recommendedPackageList.map((detail, index) => (
                                    <div key={index} className="w-fit mr-2">
                                        <div className="border rounded-lg p-4">
                                            <h3>{detail.vaccineResponse.vaccineName}</h3>
                                            <h3>
                                                Phòng bệnh: {detail.diseaseResponse.diseaseName}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <div role="tablist" className="tabs tabs-lifted">
                                <input
                                    type="radio"
                                    name="my_info"
                                    role="tab"
                                    className="tab text-nowrap font-bold text-teal-700"
                                    aria-label="Lịch sử tiêm chủng"
                                    defaultChecked
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <VaccinationHistoryTable
                                        vaccinationRecordList={vaccinationRecordList}
                                    />
                                </div>

                                <input
                                    type="radio"
                                    name="my_info"
                                    role="tab"
                                    className="tab text-nowrap font-bold text-teal-700"
                                    aria-label="Lịch hẹn của tôi"
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <MyAppointmentTable myAppointmentList={myAppointmentList} />
                                </div>

                                <input
                                    type="radio"
                                    name="my_info"
                                    role="tab"
                                    className="tab text-nowrap font-bold text-teal-700"
                                    aria-label="Đơn hàng của tôi"
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <MyOrderTable myOrderList={myOrderList} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <img src="/images/lookup-user.png" className=" h-100 object-cover" />
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-accent text-lg font-semibold">
                                Nhập thông tin của bạn để tra cứu nhé!
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
