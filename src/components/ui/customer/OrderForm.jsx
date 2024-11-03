import React, { useState, useEffect } from 'react'
import { Select, DatePicker, Pagination } from 'antd'
import { batchDetailService, vaccinePackageService } from '@/services'
import { disabledDoB, formatCurrency, disabledPastDate, phoneNumberPattern } from '@/utils'

import { addressService } from '@/services/addressService'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { customerService } from '@/services/customerService'
import { AlertModal, ModalTransfer, MyToast } from '../common'
import { PayPalCheckOut } from '.'

const orderSchema = z.object({
    orderCustomerFullName: z.string().min(1, { message: 'Họ và tên là bắt buộc' }),
    orderCustomerEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    orderCustomerPhone: z.string().regex(/^0[0-9]{9,10}$/, {
        message: 'SĐT phải bắt đầu bằng 0 và có 10 chữ số',
    }),
    orderCustomerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
    orderCustomerGender: z.enum(['MALE', 'FEMALE'], {
        message: 'Giới tính là bắt buộc',
    }),
    orderCustomerProvince: z.string().min(1, { message: 'Tỉnh/Thành là bắt buộc' }),
    orderCustomerDistrict: z.string().min(1, { message: 'Quận/Huyện là bắt buộc' }),
    orderCustomerWard: z.string().min(1, { message: 'Xã/Phường là bắt buộc' }),
    orderInjectionDate: z.date({ invalid_type_error: 'Ngày tiêm không hợp lệ' }),
})

const lookupSchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
})

export const OrderForm = () => {
    const [showForm, setShowForm] = useState(false)
    const [packageList, setPackageList] = useState([])
    const [batchDetailList, setBatchDetailList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9
    const startIndex = (currentPage - 1) * pageSize
    const currentBatchDetails = batchDetailList.slice(startIndex, startIndex + pageSize)

    const [batchDetailSelectedList, setBatchDetailSelectedList] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [payment, setPayment] = useState('')
    const [injectionDate, setInjectionDate] = useState(null)
    const [vaccinePackageSelectedList, setVaccinePackageSelectedList] = useState([])
    const [orderType, setOrderType] = useState('')
    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    useEffect(() => {
        // batchDetailService
        //     .getDetail()
        //     .then((response) => setBatchDetailList(response.data.result))
        //     .catch((err) => console.log('Get Batch Detail Failed!'))
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setPackageList(response.data.result))
            .catch((err) => console.log('Get Vaccine Package Failed!'))
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSelectVaccine = (batchDetail) => {
        if (!batchDetailSelectedList.find((b) => b.batchDetailId === batchDetail.batchDetailId)) {
            setBatchDetailSelectedList([...batchDetailSelectedList, batchDetail])
        }
    }

    const handleRemoveVaccine = (batchDetailId) => {
        setBatchDetailSelectedList(
            batchDetailSelectedList.filter((b) => b.batchDetailId !== batchDetailId)
        )
    }

    const handleSelectPackage = (pack) => {
        if (!vaccinePackageSelectedList.find((p) => p.vaccinePackageId === pack.vaccinePackageId)) {
            setVaccinePackageSelectedList([...vaccinePackageSelectedList, pack])
        }
    }

    const handleRemovePackage = (packageId) => {
        setVaccinePackageSelectedList(
            vaccinePackageSelectedList.filter((p) => p.vaccinePackageId !== packageId)
        )
    }

    useEffect(() => {
        const totalVaccinePrice = batchDetailSelectedList.reduce(
            (acc, batchDetail) => acc + batchDetail.batchDetailVaccinePrice,
            0
        )

        const totalPackagePrice = vaccinePackageSelectedList.reduce(
            (acc, pack) => acc + pack.vaccinePackagePrice,
            0
        )
        const total = totalVaccinePrice + totalPackagePrice
        setTotalAmount(total)
    }, [batchDetailSelectedList, vaccinePackageSelectedList])

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    useEffect(() => {
        setProvinceList(addressService.getProvinceList())
        setDistrictList(addressService.getDistrictList())
        setWardList(addressService.getWardList())
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        watch,
        getValues,
    } = useForm({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            orderCustomerFullName: '',
            orderCustomerEmail: '',
            orderCustomerPhone: '',
            orderCustomerDob: null,
            orderCustomerGender: '',
            orderCustomerProvince: '',
            orderCustomerDistrict: '',
            orderCustomerWard: '',
            orderInjectionDate: null,
        },
    })

    const {
        register: registerLookup,
        handleSubmit: handleSubmitLookup,
        formState: { errors: errorsLookup },
        setValue: setValueLookup,
        clearErrors: clearErrorsLookup,
    } = useForm({
        resolver: zodResolver(lookupSchema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
        },
    })

    const [existsCustomer, setExistsCustomer] = useState(null)

    const onSubmitLookup = async (data) => {
        const lookupdata = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }

        try {
            const response = await customerService.lookupCustomer(lookupdata)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    document.getElementById('modal_info').showModal()
                    setExistsCustomer(response.data.result)
                    setOrderType('CODE')
                    setShowForm(false)
                } else {
                    document.getElementById('modal_no_info').showModal()
                    setShowForm(true)
                    setOrderType('NOCODE')
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    document.getElementById('modal_no_info').showModal()
                    setShowForm(true)
                    setOrderType('NOCODE')
                    console.error('Customer not found: ', error.response.data.message)
                } else {
                    MyToast('error', 'Đã có lỗi xảy ra')
                }
            } else {
                MyToast('error', 'Đã có lỗi xảy ra')
            }
        }
    }

    const orderData = watch()

    return (
        <div className="bg-gray-2 pt-10">
            <div className="relative mx-10 ">
                <div className="uppercase text-3xl text-blue-600 font-satoshi font-bold">
                    Đặt mua vắc xin
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="flex mx-10 lg:mx-20 space-x-5 mt-10 flex-wrap md:flex-nowrap">
                <div className="flex flex-col ">
                    {!showForm && (
                        <div className="mb-5 min-w-fit">
                            <form
                                className="flex flex-col space-y-2 font-semibold w-full"
                                onSubmit={handleSubmitLookup(onSubmitLookup)}
                            >
                                <div className="flex flex-col md:flex-row md:space-x-2">
                                    <div className="flex flex-col space-y-2 flex-1 min-w-[200px]">
                                        <label className="block mb-1 font-medium">
                                            Nhập Mã KH / SĐT:
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...registerLookup('customerIdentifier')}
                                                type="text"
                                                placeholder="Số điện thoại / Mã KH"
                                                className="input input-bordered input-info w-full"
                                            />
                                            {errorsLookup.customerIdentifier && (
                                                <span className="absolute left-0 top-full mt-1 w-fit text-red-500 text-sm">
                                                    {errorsLookup.customerIdentifier.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2 flex-1 min-w-[200px]">
                                        <label className="block mb-1 font-medium">Ngày sinh</label>
                                        <div className="relative flex flex-col">
                                            <DatePicker
                                                {...registerLookup('customerDob', {
                                                    valueAsDate: true,
                                                })}
                                                format="DD-MM-YYYY"
                                                disabledDate={disabledDoB}
                                                onChange={(date) =>
                                                    setValueLookup(
                                                        'customerDob',
                                                        date?.toDate() || null,
                                                        {
                                                            shouldValidate: true,
                                                        }
                                                    )
                                                }
                                                style={{ height: '48px' }}
                                            />
                                            {errorsLookup.customerDob && (
                                                <span className="absolute left-0 top-full mt-1 w-fit text-red-500 text-sm">
                                                    {errorsLookup.customerDob.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 mt-10">
                                    <button
                                        type="submit"
                                        className="text-base rounded-full border-l-0 border-r-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 font-bold cursor-pointer 
                                    hover:bg-green-500 hover:text-white bg-green-300 text-green-800 border duration-200 ease-in-out border-green-500 transition"
                                    >
                                        Tra cứu thông tin
                                    </button>
                                </div>
                            </form>

                            {existsCustomer && (
                                <div className="relative flex z-0 w-full mb-5 group space-x-2 mt-5 gap-5 items-center">
                                    <label>Ngày mong muốn tiêm: </label>
                                    <DatePicker
                                        format="DD-MM-YYYY"
                                        disabledDate={disabledPastDate}
                                        onChange={(date) =>
                                            setInjectionDate(dayjs(date).format('DD-MM-YYYY'))
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {showForm && (
                        <form className="w-fit">
                            <div>
                                <span className="text-2xl text-blue-600 uppercase font-bold text-center">
                                    Thông tin người tiêm
                                </span>
                            </div>
                            <div className="relative z-0 w-full mb-5 group mt-5">
                                <input
                                    type="text"
                                    {...register('orderCustomerFullName')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên
                                </label>
                                {errors.orderCustomerFullName && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.orderCustomerFullName.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="email"
                                    {...register('orderCustomerEmail')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                                {errors.orderCustomerEmail && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.orderCustomerEmail.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    {...register('orderCustomerPhone')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại
                                </label>
                                {errors.orderCustomerPhone && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.orderCustomerPhone.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center">
                                <div className="relative z-0 w-full mb-2 group flex flex-col">
                                    <div>
                                        <label>Ngày sinh: </label>
                                        <DatePicker
                                            {...register('orderCustomerDob', {
                                                valueAsDate: true,
                                            })}
                                            format="DD-MM-YYYY"
                                            disabledDate={disabledDoB}
                                            onChange={(date) =>
                                                setValue(
                                                    'orderCustomerDob',
                                                    date?.toDate() || null,
                                                    {
                                                        shouldValidate: true,
                                                    }
                                                )
                                            }
                                        />
                                    </div>

                                    {errors.orderCustomerDob && (
                                        <span className="w-50 text-red-500 text-sm">
                                            {errors.orderCustomerDob.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative z-0 w-full mb-5 group flex flex-col">
                                    <div className="flex  md:flex-row gap-5 mt-2">
                                        <div>
                                            <span>Giới tính: </span>
                                        </div>
                                        <div className="flex space-x-2 justify-center">
                                            <label className="">Nam</label>
                                            <input
                                                type="radio"
                                                {...register('orderCustomerGender')}
                                                value="MALE"
                                                className="radio radio-accent"
                                            />
                                        </div>
                                        <div className="flex space-x-2 justify-center">
                                            <label className="">Nữ</label>
                                            <input
                                                type="radio"
                                                {...register('orderCustomerGender')}
                                                value="FEMALE"
                                                className="radio radio-accent"
                                            />
                                        </div>
                                    </div>
                                    {errors.orderCustomerGender && (
                                        <span className="w-50 text-red-500 text-sm">
                                            {errors.orderCustomerGender.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-0 w-full mb-2 group">
                                <label>Địa chỉ thường trú:</label>
                            </div>

                            <div className="flex flex-col mb-5 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                <div className="relative z-0 w-full  group flex flex-col flex-1">
                                    <label>Tỉnh/Thành:</label>
                                    <Select
                                        placeholder="Chọn Tỉnh/Thành"
                                        onChange={(provinceValue) => {
                                            setSelectedProvince(provinceValue)
                                            setValue('orderCustomerProvince', provinceValue)
                                            if (provinceValue) clearErrors('orderCustomerProvince')
                                        }}
                                        options={provinceList.map((province) => ({
                                            value: province.code,
                                            label: province.name,
                                        }))}
                                    />
                                    {errors.orderCustomerProvince && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.orderCustomerProvince.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative z-0 w-full group flex flex-col flex-1">
                                    <label>Quận/Huyện:</label>
                                    <Select
                                        placeholder="Chọn quận/huyện"
                                        value={selectedDistrict || undefined}
                                        onChange={(value) => {
                                            if (value !== selectedDistrict) {
                                                setSelectedDistrict(value)
                                                setValue('orderCustomerDistrict', value)
                                                if (value) clearErrors('orderCustomerDistrict')
                                            }
                                        }}
                                        disabled={!selectedProvince}
                                        options={
                                            selectedProvince
                                                ? districtList
                                                      .filter(
                                                          (district) =>
                                                              district.province_code ===
                                                              selectedProvince
                                                      )
                                                      .map((district) => ({
                                                          value: district.code,
                                                          label: district.name,
                                                      }))
                                                : []
                                        }
                                        style={{ opacity: !selectedProvince ? 0.75 : 1 }}
                                    />
                                    {errors.orderCustomerDistrict && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.orderCustomerDistrict.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative z-0 w-full  group flex flex-col flex-1">
                                    <label>Xã/Phường:</label>
                                    <Select
                                        placeholder="Chọn xã/phường"
                                        value={selectedWard || undefined}
                                        onChange={(value) => {
                                            setSelectedWard(value)
                                            setValue('orderCustomerWard', value)
                                            if (value) clearErrors('orderCustomerWard')
                                        }}
                                        disabled={!selectedDistrict}
                                        options={
                                            selectedDistrict
                                                ? wardList
                                                      .filter(
                                                          (ward) =>
                                                              ward.district_code ===
                                                              selectedDistrict
                                                      )
                                                      .map((ward) => ({
                                                          value: ward.code,
                                                          label: ward.name,
                                                      }))
                                                : []
                                        }
                                        style={{ opacity: !selectedDistrict ? 0.75 : 1 }}
                                    />
                                    {errors.orderCustomerWard && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.orderCustomerWard.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-0 w-full mb-5 group space-x-2 flex">
                                <label>Chọn ngày tiêm: </label>
                                <DatePicker
                                    {...register('orderInjectionDate', { valueAsDate: true })}
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledPastDate}
                                    onChange={(date) =>
                                        setValue('orderInjectionDate', date?.toDate() || null, {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                                {errors.orderInjectionDate && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.orderInjectionDate.message}
                                    </span>
                                )}
                            </div>
                        </form>
                    )}

                    <div className="flex flex-col">
                        <div className="bg-white rounded-lg shadow p-4 flex flex-col space-x-2">
                            <div className="flex space-x-2 items-center justify-center mb-5 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon line-color h-8 w-8"
                                    data-name="Line Color"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M7 4 4.33 7 3 5.5"
                                        style={{
                                            fill: 'none',
                                            stroke: '#2ca9bc',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <path
                                        d="M3 11.5 4.33 13 7 10M3 17.5 4.33 19 7 16"
                                        data-name="secondary"
                                        style={{
                                            fill: 'none',
                                            stroke: '#2ca9bc',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <path
                                        d="M11 6h10m-10 6h10m-10 6h10"
                                        style={{
                                            fill: 'none',
                                            stroke: '#000',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                        }}
                                    />
                                </svg>
                                <span className="text-lg font-bold text-blue-900">
                                    DANH SÁCH VẮC XIN CHỌN MUA
                                </span>
                            </div>

                            <div className="border-b border-green-500 "></div>

                            <div className="mt-5">
                                {batchDetailSelectedList.length === 0 &&
                                vaccinePackageSelectedList.length === 0 ? (
                                    <div className="text-xl text-blue-600 text-center">
                                        Danh sách trống
                                    </div>
                                ) : (
                                    <>
                                        {batchDetailSelectedList.map((batchDetail) => (
                                            <div
                                                key={batchDetail.batchDetailId}
                                                className="border-b border-red-100 p-5"
                                            >
                                                <div className="flex flex-row items-center justify-between">
                                                    <div className="flex flex-col space-y-2">
                                                        <span className=" uppercase text-xl font-bold text-black">
                                                            {
                                                                batchDetail.vaccineResponse
                                                                    .vaccineName
                                                            }
                                                        </span>

                                                        <span>
                                                            Nguồn gốc:{' '}
                                                            {
                                                                batchDetail.vaccineResponse
                                                                    .vaccineOrigin
                                                            }
                                                        </span>
                                                        <span className="text-lg font-bold text-blue-800">
                                                            {formatCurrency(
                                                                batchDetail.batchDetailVaccinePrice
                                                            )}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveVaccine(
                                                                batchDetail.batchDetailId
                                                            )
                                                        }
                                                        className="btn btn-square btn-sm"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {vaccinePackageSelectedList.map((pack) => (
                                            <div
                                                key={pack.vaccinePackageId}
                                                className="border-b border-red-100 p-5 flex flex-col space-y-2"
                                            >
                                                <div className="flex flex-row items-center justify-between">
                                                    <div className="flex flex-col space-y-2">
                                                        <span className=" uppercase text-xl font-bold text-black">
                                                            {pack.vaccinePackageName}
                                                        </span>

                                                        <span className="text-lg font-bold text-blue-800">
                                                            {formatCurrency(
                                                                pack.vaccinePackagePrice
                                                            )}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemovePackage(
                                                                pack.vaccinePackageId
                                                            )
                                                        }
                                                        className="btn btn-square btn-sm"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col space-y-4 mt-8">
                                <span className="text-lg font-semibold">
                                    Chọn phương thức thanh toán:
                                </span>

                                <div className="flex gap-4">
                                    <input
                                        value="TRANSFER"
                                        type="radio"
                                        name="radio-5"
                                        className="radio radio-success"
                                        onChange={handlePayment}
                                        checked={payment === 'TRANSFER'}
                                    />
                                    <span>Thanh toán chuyển khoản</span>
                                </div>

                                <div className="flex gap-4">
                                    <input
                                        value="PAYPAL"
                                        type="radio"
                                        name="radio-5"
                                        className="radio radio-success"
                                        onChange={handlePayment}
                                        checked={payment === 'PAYPAL'}
                                    />
                                    <span>Thanh toán Paypal</span>
                                </div>
                            </div>
                        </div>

                        {totalAmount > 0 && (
                            <div>
                                <div className=" flex flex-col mt-4">
                                    <span className="text-2xl font-semibold">
                                        Tổng số tiền: {formatCurrency(totalAmount)}
                                    </span>
                                </div>
                                <div className="mt-5">
                                    {payment === '' ? null : payment === 'PAYPAL' ? (
                                        <PayPalCheckOut
                                            key={totalAmount}
                                            batchDetailIdList={batchDetailSelectedList}
                                            vaccinePackageIdList={vaccinePackageSelectedList}
                                            initialTotal={totalAmount}
                                            payment={payment}
                                            injectionDate={injectionDate}
                                            customer={existsCustomer}
                                            orderType={orderType}
                                            orderInfo={orderData}
                                        />
                                    ) : (
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() =>
                                                    document
                                                        .getElementById('modal_transfer')
                                                        .showModal()
                                                }
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-8 h-8"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 0 0 0-2Zm14-6a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 0 0 2h4a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1ZM20 1h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 1 1v4a1 1 0 0 0 2 0V4a3 3 0 0 0-3-3ZM2 9a1 1 0 0 0 1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 0 0-2H4a3 3 0 0 0-3 3v4a1 1 0 0 0 1 1Zm8-4H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM9 9H7V7h2Zm5 2h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Zm1-4h2v2h-2Zm-5 6H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Zm-1 4H7v-2h2Zm5-1a1 1 0 0 0 1-1 1 1 0 0 0 0-2h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Zm-4 4a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z" />
                                                    </svg>
                                                    <span>Quét mã chuyển khoản</span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div role="tablist" className="tabs tabs-lifted ">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab font-bold text-base text-nowrap [--tab-bg:yellow] [--tab-border-color:orange]"
                            aria-label="Vắc xin lẻ"
                            defaultChecked
                        />
                        <div
                            role="tabpanel"
                            className="tab-content bg-base-100 border-base-300 rounded-box p-6 "
                        >
                            <div className="flex flex-wrap gap-4 flex-grow">
                                {currentBatchDetails.map((batchDetail, index) => {
                                    const isVaccineSelected = batchDetailSelectedList.find(
                                        (v) => v.batchDetailId === batchDetail.batchDetailId
                                    )

                                    return (
                                        <div
                                            className="card card-compact bg-base-100 w-70 shadow-xl"
                                            key={index}
                                        >
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    {batchDetail.vaccineResponse.vaccineName}
                                                </h2>
                                                <p>
                                                    Phòng: {batchDetail.diseaseResponse.diseaseName}
                                                </p>
                                                <p>
                                                    Giá chỉ:{' '}
                                                    {formatCurrency(
                                                        batchDetail.batchDetailVaccinePrice
                                                    )}
                                                </p>
                                                <div className="card-actions justify-end">
                                                    {isVaccineSelected ? (
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveVaccine(
                                                                    batchDetail.batchDetailId
                                                                )
                                                            }
                                                            className="btn btn-outline btn-accent"
                                                        >
                                                            Đã Chọn
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleSelectVaccine(batchDetail)
                                                            }
                                                            className="btn btn-outline btn-info"
                                                        >
                                                            Chọn
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {batchDetailList.length > pageSize && (
                                <div className="pagination flex  mt-5 justify-center">
                                    <Pagination
                                        current={currentPage}
                                        pageSize={pageSize}
                                        total={batchDetailList.length}
                                        onChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab font-bold text-base text-nowrap [--tab-bg:yellow] [--tab-border-color:orange]"
                            aria-label="Gói vắc xin"
                        />
                        <div
                            role="tabpanel"
                            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                        >
                            <div className="flex flex-col ">
                                <div className="flex flex-wrap gap-2 flex-grow">
                                    {packageList.map((pack, index) => {
                                        const isPackageSelected = vaccinePackageSelectedList.find(
                                            (p) => p.vaccinePackageId === pack.vaccinePackageId
                                        )
                                        return (
                                            <div
                                                key={index}
                                                className="card bg-base-100 w-70 shadow-xl flex-shrink-0 "
                                            >
                                                <div className="card-body">
                                                    <h2 className="card-title ">
                                                        {pack.vaccinePackageName}{' '}
                                                    </h2>

                                                    <p>
                                                        Giá:{' '}
                                                        {formatCurrency(pack.vaccinePackagePrice)}
                                                    </p>
                                                    <div className="card-actions justify-end">
                                                        <div className="card-actions justify-end">
                                                            {isPackageSelected ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleRemovePackage(
                                                                            pack.vaccinePackageId
                                                                        )
                                                                    }
                                                                    className="btn btn-outline btn-accent"
                                                                >
                                                                    Đã Chọn
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() =>
                                                                        handleSelectPackage(pack)
                                                                    }
                                                                    className="btn btn-outline btn-info"
                                                                >
                                                                    Chọn
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalTransfer />

            <AlertModal
                modalId={'modal_no_info'}
                message={
                    'Bạn chưa có thông tin khách hàng tại trung tâm. Mời bạn nhập thông tin bên dưới để đặt mua!'
                }
            />

            <AlertModal
                modalId={'modal_info'}
                message={'Bạn là khách hàng của trung tâm. Mời bạn chọn vắc xin muốn mua!'}
            />
        </div>
    )
}
