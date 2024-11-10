import React, { useState, useEffect } from 'react'
import { addressService } from '@/services/addressService'
import { DatePicker, Pagination, Select } from 'antd'
import dayjs from 'dayjs'
import { appointmentService, batchDetailService, vaccinePackageService } from '@/services'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../common'
import { disabledDoB, formatCurrency, disabledPastDate, phoneNumberPattern } from '@/utils'

const appointmentSchema = z.object({
    appointmentCustomerFullName: z.string().min(1, { message: 'Họ và tên là bắt buộc' }),
    appointmentCustomerEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    appointmentCustomerPhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    appointmentCustomerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
    appointmentCustomerGender: z.enum(['MALE', 'FEMALE'], { message: 'Giới tính là bắt buộc' }),
    appointmentCustomerProvince: z.string().min(1, { message: 'Tỉnh/Thành là bắt buộc' }),
    appointmentCustomerDistrict: z.string().min(1, { message: 'Quận/Huyện là bắt buộc' }),
    appointmentCustomerWard: z.string().min(1, { message: 'Xã/Phường là bắt buộc' }),
    appointmentRelativesFullName: z
        .string()
        .min(1, { message: 'Họ và tên người liên hệ là bắt buộc' }),
    appointmentRelativesPhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    appointmentRelativesRelationship: z.string().min(1, { message: 'Mối quan hệ là bắt buộc' }),
    appointmentInjectionDate: z.date({ invalid_type_error: 'Ngày tiêm không hợp lệ' }),
})

const apptCodeSchema = z.object({
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

export const AppointmentForm = () => {
    const [isCustomer, setIsCustomer] = useState(0)

    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    const [batchDetailList, setBatchDetailList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9
    const startIndex = (currentPage - 1) * pageSize
    const currentBatchDetails = batchDetailList.slice(startIndex, startIndex + pageSize)
    const [packageList, setPackageList] = useState([])

    const [injectionType, setInjectionType] = useState('SINGLE')
    const [batchDetailSelected, setBatchDetailSelected] = useState()
    const [vaccinePackageSelected, setVaccinePackageSelected] = useState()

    // Lay danh sach vaccine va goi vaccine
    useEffect(() => {
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))

        vaccinePackageService
            .getDefaultPackages()
            .then((response) => setPackageList(response.data.result))
            .catch((err) => console.log('Get Vaccine Package Failed!'))
    }, [])

    // Lay tinh-thanh, quan-huyen, xa-phuong
    useEffect(() => {
        setProvinceList(addressService.getProvinceList())
        setDistrictList(addressService.getDistrictList())
        setWardList(addressService.getWardList())
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            appointmentCustomerFullName: '',
            appointmentCustomerEmail: '',
            appointmentCustomerPhone: '',
            appointmentCustomerDob: null,
            appointmentCustomerGender: '',
            appointmentCustomerProvince: '',
            appointmentCustomerDistrict: '',
            appointmentCustomerWard: '',
            appointmentRelativesFullName: '',
            appointmentRelativesPhone: '',
            appointmentRelativesRelationship: '',
            appointmentInjectionDate: null,
        },
    })

    const {
        register: registerWithCode,
        handleSubmit: handleSubmitWithCode,
        formState: { errors: errorsWithCode },
        setValue: setValueWithCode,
        clearErrors: clearErrorsWithCode,
    } = useForm({
        resolver: zodResolver(apptCodeSchema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
            injectionDate: null,
        },
    })

    const onSubmit = async (data) => {
        try {
            const request = {
                ...data,
                appointmentCustomerProvince:
                    addressService.getProvincenNameByCode(selectedProvince),
                appointmentCustomerDistrict: addressService.getDistrictNameByCode(selectedDistrict),
                appointmentCustomerWard: addressService.getWardNameByCode(selectedWard),
                appointmentCustomerDob: data.appointmentCustomerDob
                    ? dayjs(data.appointmentCustomerDob).format('DD-MM-YYYY')
                    : null,
                appointmentInjectionDate: data.appointmentInjectionDate
                    ? dayjs(data.appointmentInjectionDate).format('DD-MM-YYYY')
                    : null,
                apppointmentInjectionType: injectionType,
                appointmentBatchDetailId: batchDetailSelected,
                appointmentVaccinePackageId: vaccinePackageSelected,
            }

            const response = await appointmentService.createAppointmentWithOutCustCode(request)

            //console.log(response.data)
            if (response.data.code === 1000) {
                MyToast('success', 'Đăng Ký Thành Công')
            } else {
                MyToast('error', 'Đăng Ký Không Thành Công')
            }
        } catch (error) {
            console.error('Create Appointment Failed:', error)
            MyToast('error', 'Đăng Ký Không Thành Công')
        }
    }

    const onSubmitWithCode = async (data) => {
        try {
            const request = {
                ...data,
                customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
                injectionDate: data.injectionDate
                    ? dayjs(data.injectionDate).format('DD-MM-YYYY')
                    : null,
                injectionType: injectionType,
                batchDetailId: batchDetailSelected,
                vaccinePackageId: vaccinePackageSelected,
            }

            const response = await appointmentService.createAppointmentWithCustCode(request)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Đăng Ký Thành Công')
                }
            } else {
                MyToast('error', 'Xảy ra lỗi trong quá trình đăng ký')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) MyToast('error', 'Không tìm thấy khách hàng')
            }
        }
    }

    return (
        <div>
            <div className="relative">
                <div className="uppercase text-3xl text-blue-600 font-satoshi font-bold">
                    Đăng ký lịch tiêm chủng
                </div>
                <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
            </div>

            <div className="my-5 flex flex-col">
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="isCustomer"
                        className="radio radio-accent mr-4"
                        onChange={() => setIsCustomer(1)}
                        checked={isCustomer === 1}
                    />
                    <span>Bạn đã có mã khách hàng tại trung tâm.</span>
                </div>

                <div className="flex items-center">
                    <input
                        type="radio"
                        name="isCustomer"
                        className="radio radio-accent mr-4"
                        onChange={() => setIsCustomer(0)}
                        checked={isCustomer === 0}
                    />
                    <span>Bạn chưa có mã khách hàng tại trung tâm.</span>
                </div>
            </div>

            <div className="flex space-x-5 flex-wrap md:flex-nowrap">
                <div>
                    {isCustomer == 0 ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" text-blue-500 size-5 w-full font-bold text-2xl text-center">
                                Thông tin người tiêm
                            </div>

                            <div className="relative z-0 w-full mb-5 group mt-5">
                                <input
                                    type="text"
                                    {...register('appointmentCustomerFullName')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên
                                </label>
                                {errors.appointmentCustomerFullName && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentCustomerFullName.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="email"
                                    {...register('appointmentCustomerEmail')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                                {errors.appointmentCustomerEmail && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentCustomerEmail.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    {...register('appointmentCustomerPhone')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại
                                </label>
                                {errors.appointmentCustomerPhone && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentCustomerPhone.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-row gap-10">
                                <div className="relative z-0 w-full mb-5 group flex flex-col">
                                    <div>
                                        <label>Ngày sinh: </label>
                                        <DatePicker
                                            {...register('appointmentCustomerDob', {
                                                valueAsDate: true,
                                            })}
                                            format="DD-MM-YYYY"
                                            disabledDate={disabledDoB}
                                            onChange={(date) =>
                                                setValue(
                                                    'appointmentCustomerDob',
                                                    date?.toDate() || null,
                                                    {
                                                        shouldValidate: true,
                                                    }
                                                )
                                            }
                                        />
                                    </div>

                                    {errors.appointmentCustomerDob && (
                                        <span className="w-50 text-red-500 text-sm">
                                            {errors.appointmentCustomerDob.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group flex flex-col">
                                    <div className="flex flex-row gap-5  mt-2">
                                        <span>Giới tính: </span>
                                        <div className="flex space-x-2 justify-center">
                                            <label className="">Nam</label>
                                            <input
                                                type="radio"
                                                {...register('appointmentCustomerGender')}
                                                value="MALE"
                                                className="radio radio-accent"
                                            />
                                        </div>
                                        <div className="flex space-x-2 justify-center">
                                            <label className="">Nữ</label>
                                            <input
                                                type="radio"
                                                {...register('appointmentCustomerGender')}
                                                value="FEMALE"
                                                className="radio radio-accent"
                                            />
                                        </div>
                                    </div>
                                    {errors.appointmentCustomerGender && (
                                        <span className="w-50 text-red-500 text-sm">
                                            {errors.appointmentCustomerGender.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-0 w-full mb-2 group">
                                <label>Địa chỉ thường trú:</label>
                            </div>

                            <div className="flex flex-row space-x-2 w-125">
                                <div className="relative z-0 w-full mb-5 group flex flex-col flex-1">
                                    <label>Tỉnh/Thành:</label>
                                    <Select
                                        placeholder="Chọn Tỉnh/Thành"
                                        onChange={(provinceValue) => {
                                            setSelectedProvince(provinceValue)
                                            setValue('appointmentCustomerProvince', provinceValue)
                                            if (provinceValue)
                                                clearErrors('appointmentCustomerProvince')
                                        }}
                                        options={provinceList.map((province) => ({
                                            value: province.code,
                                            label: province.name,
                                        }))}
                                    />
                                    {errors.appointmentCustomerProvince && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.appointmentCustomerProvince.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group flex flex-col flex-1">
                                    <label>Quận/Huyện:</label>
                                    <Select
                                        placeholder="Chọn quận/huyện"
                                        value={selectedDistrict || undefined}
                                        onChange={(value) => {
                                            if (value !== selectedDistrict) {
                                                setSelectedDistrict(value)
                                                setValue('appointmentCustomerDistrict', value)
                                                if (value)
                                                    clearErrors('appointmentCustomerDistrict')
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
                                    {errors.appointmentCustomerDistrict && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.appointmentCustomerDistrict.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group text-nowrap flex flex-col flex-1">
                                    <label>Xã/Phường:</label>
                                    <Select
                                        placeholder="Chọn xã/phường"
                                        value={selectedWard || undefined}
                                        onChange={(value) => {
                                            setSelectedWard(value)
                                            setValue('appointmentCustomerWard', value)
                                            if (value) clearErrors('appointmentCustomerWard')
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

                                    {errors.appointmentCustomerWard && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.appointmentCustomerWard.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className=" text-blue-600 size-5 w-full font-bold my-5 text-2xl text-center">
                                Thông tin liên hệ
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    {...register('appointmentRelativesFullName')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên người liên hệ
                                </label>
                                {errors.appointmentRelativesFullName && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentRelativesFullName.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    {...register('appointmentRelativesPhone')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại người liên hệ
                                </label>
                                {errors.appointmentRelativesPhone && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentRelativesPhone.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <div className="flex items-center">
                                    <label className="w-2/3 ">Mối quan hệ với người tiêm:</label>
                                    <select
                                        {...register('appointmentRelativesRelationship')}
                                        className="block py-2.5 px-0 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                        <option value="">Chọn mối quan hệ</option>
                                        <option value="Bản Thân">Bản thân</option>
                                        <option value="Con">Con</option>
                                        <option value="Cha">Cha</option>
                                        <option value="Mẹ">Mẹ</option>
                                        <option value="Vợ">Vợ</option>
                                        <option value="Chồng">Chồng</option>
                                        <option value="Anh">Anh</option>
                                        <option value="Chị">Chị</option>
                                        <option value="Em">Em</option>
                                        <option value="Ông">Ông</option>
                                        <option value="Bà">Bà</option>
                                        <option value="Họ Hàng">Họ hàng</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>

                                {errors.appointmentRelativesRelationship && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentRelativesRelationship.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group space-x-2">
                                <label>Chọn ngày tiêm: </label>
                                <DatePicker
                                    {...register('appointmentInjectionDate', {
                                        valueAsDate: true,
                                    })}
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledPastDate}
                                    onChange={(date) =>
                                        setValue(
                                            'appointmentInjectionDate',
                                            date?.toDate() || null,
                                            {
                                                shouldValidate: true,
                                            }
                                        )
                                    }
                                />
                                {errors.appointmentInjectionDate && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errors.appointmentInjectionDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Hoàn Thành Đăng Ký
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form
                            className="max-w-full"
                            onSubmit={handleSubmitWithCode(onSubmitWithCode)}
                        >
                            <div className="text-blue-500 size-5 w-full font-bold text-2xl text-center">
                                Thông tin người tiêm
                            </div>

                            <div className="relative z-0 w-full mb-5 group mt-5">
                                <input
                                    type="text"
                                    {...registerWithCode('customerIdentifier')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Mã khách hàng
                                </label>
                                {errorsWithCode.customerIdentifier && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errorsWithCode.customerIdentifier.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-125 mb-5 group space-x-2">
                                <label>Ngày sinh: </label>
                                <DatePicker
                                    {...registerWithCode('customerDob', {
                                        valueAsDate: true,
                                    })}
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDoB}
                                    onChange={(date) =>
                                        setValueWithCode('customerDob', date?.toDate() || null, {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                                {errorsWithCode.customerDob && (
                                    <span className="w-50 text-red-500 text-sm">
                                        {errorsWithCode.customerDob.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-125 mb-5 group space-x-2">
                                <label>Chọn ngày tiêm: </label>
                                <DatePicker
                                    {...registerWithCode('injectionDate', {
                                        valueAsDate: true,
                                    })}
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledPastDate}
                                    onChange={(date) =>
                                        setValueWithCode('injectionDate', date?.toDate() || null, {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                                {errorsWithCode.injectionDate && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errorsWithCode.injectionDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Hoàn Thành Đăng Ký
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="flex flex-col ">
                    <span className="text-blue-500 size-5 w-full font-bold text-2xl text-center">
                        Chọn vắc xin muốn tiêm
                    </span>
                    <div role="tablist" className="tabs tabs-lifted mt-10">
                        <input
                            onChange={() => {
                                setInjectionType('SINGLE')
                                setVaccinePackageSelected(0)
                            }}
                            type="radio"
                            name="vaccine_tabs"
                            role="tab"
                            className="tab font-bold text-base text-nowrap [--tab-bg:yellow] [--tab-border-color:orange]"
                            aria-label="Vắc xin lẻ"
                            defaultChecked
                        />
                        <div
                            role="tabpanel"
                            className="tab-content bg-base-100 border-base-300 rounded-box p-6 "
                        >
                            <div className="flex flex-col ">
                                <div className="flex flex-wrap gap-2 flex-grow">
                                    {currentBatchDetails.map((batchDetail, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="card bg-base-100 w-70 shadow-xl flex-shrink-0 "
                                            >
                                                <div className="card-body">
                                                    <div className="flex space-x-2">
                                                        <h2 className="card-title ">
                                                            {batchDetail.vaccineResponse
                                                                ?.vaccineName ||
                                                                'Không có dữ liệu'}{' '}
                                                        </h2>
                                                        <input
                                                            type="radio"
                                                            name="radio-7"
                                                            className="radio radio-info "
                                                            value={batchDetail.batchDetailId}
                                                            onChange={(e) => {
                                                                setBatchDetailSelected(
                                                                    e.target.value
                                                                )
                                                            }}
                                                        />
                                                    </div>

                                                    <span>
                                                        Phòng:{' '}
                                                        {batchDetail.diseaseResponse?.diseaseName ||
                                                            'Không có dữ liệu'}
                                                    </span>

                                                    <p>
                                                        Giá:{' '}
                                                        {formatCurrency(
                                                            batchDetail.batchDetailVaccinePrice
                                                        )}
                                                    </p>
                                                    <div className="card-actions justify-end"></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {batchDetailList.length > pageSize && (
                                    <div className="pagination mx-auto mt-4">
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={batchDetailList.length}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <input
                            onChange={() => {
                                setInjectionType('PACKAGE')
                                setBatchDetailSelected(0)
                            }}
                            type="radio"
                            name="vaccine_tabs"
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
                                        return (
                                            <div
                                                key={index}
                                                className="card bg-base-100 w-70 shadow-xl flex-shrink-0 "
                                            >
                                                <div className="card-body">
                                                    <div className="flex space-x-2">
                                                        <h2 className="card-title ">
                                                            {pack.vaccinePackageName}
                                                        </h2>
                                                        <input
                                                            type="radio"
                                                            name="radio-7"
                                                            className="radio radio-info "
                                                            value={pack.vaccinePackageId}
                                                            onChange={(e) => {
                                                                setVaccinePackageSelected(
                                                                    e.target.value
                                                                )
                                                            }}
                                                        />
                                                    </div>

                                                    <p>
                                                        Giá:{' '}
                                                        {formatCurrency(pack.vaccinePackagePrice)}
                                                    </p>
                                                    <div className="card-actions justify-end"></div>
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
        </div>
    )
}
