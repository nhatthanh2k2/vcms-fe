import React, { useState, useEffect } from 'react'
import { addressService } from '@/services/addressService'
import { DatePicker, Pagination } from 'antd'
import dayjs from 'dayjs'
import { appointmentService, batchDetailService } from '@/services'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../common'
import { disabledDoB, formatCurrency, disabledPastDate } from '@/utils'

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
    appointmentBatchDetailId: z
        .number({ invalid_type_error: 'Bạn hãy chọn một vắc xin' })
        .min(1, { message: 'Bạn hãy chọn một vắc xin' }),
})

const appointmentSchema2 = z.object({
    appointmentCustomerCode: z.string().min(1, { message: 'Mã khách hàng là bắt buộc' }),
    appointmentInjectionDate: z.date({ invalid_type_error: 'Ngày tiêm không hợp lệ' }),
    appointmentBatchDetailId: z
        .number({ invalid_type_error: 'Bạn hãy chọn một vắc xin' })
        .min(1, { message: 'Bạn hãy chọn một vắc xin' }),
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

    useEffect(() => {
        addressService
            .getProvinceList()
            .then((response) => setProvinceList(response.data))
            .catch((error) => console.error('Error fetching provinces:', error))
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            addressService
                .getDistrictList()
                .then((response) => {
                    const filteredDistricts = response.data.filter(
                        (district) => district.province_code === Number(selectedProvince)
                    )
                    setDistrictList(filteredDistricts)
                    setSelectedDistrict('')
                    setSelectedWard('')
                    setValue('appointmentCustomerDistrict', '')
                    setValue('appointmentCustomerWard', '')
                })
                .catch((error) => console.error('Error fetching districts:', error))
        } else {
            setDistrictList([])
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedDistrict) {
            addressService
                .getWardList()
                .then((response) => {
                    const filteredWards = response.data.filter(
                        (ward) => ward.district_code === Number(selectedDistrict)
                    )
                    setWardList(filteredWards)
                    setSelectedWard('')
                })
                .catch((error) => console.error('Error fetching wards:', error))
        } else {
            setWardList([])
        }
    }, [selectedDistrict])

    useEffect(() => {
        batchDetailService
            .getDetail()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
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
        watch,
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
            appointmentBatchDetailId: 0,
        },
    })

    const {
        register: registerAppt2,
        handleSubmit: handleSubmitAppt2,
        formState: { errors: errorsAppt2 },
        setValue: setValueAppt2,
        clearErrors: clearErrorsAppt2,
    } = useForm({
        resolver: zodResolver(appointmentSchema2),
        defaultValues: {
            appointmentCustomerCode: '',
            appointmentInjectionDate: null,
            appointmentBatchDetailId: 0,
        },
    })

    const [provinceData, setProvinceData] = useState('')
    const [districtData, setDistrictData] = useState('')
    const [wardData, setWardData] = useState('')

    useEffect(() => {
        addressService
            .getProvinceByCode(selectedProvince)
            .then((response) => setProvinceData(response.data.name))
            .catch((err) => console.log('Get Province Failed!'))
    }, [selectedProvince])

    useEffect(() => {
        addressService
            .getDistrictByCode(selectedDistrict)
            .then((response) => setDistrictData(response.data.name))
            .catch((err) => console.log('Get District Failed!'))
    }, [selectedDistrict])

    useEffect(() => {
        addressService
            .getWardByCode(selectedWard)
            .then((response) => setWardData(response.data.name))
            .catch((err) => console.log('Get Ward Failed!'))
    }, [selectedWard])

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            appointmentCustomerProvince: provinceData,
            appointmentCustomerDistrict: districtData,
            appointmentCustomerWard: wardData,
            appointmentCustomerDob: data.appointmentCustomerDob
                ? dayjs(data.appointmentCustomerDob).format('DD-MM-YYYY')
                : null,
            appointmentInjectionDate: data.appointmentInjectionDate
                ? dayjs(data.appointmentInjectionDate).format('DD-MM-YYYY')
                : null,
        }

        try {
            const response = await appointmentService.createAppointmentWithOutCustCode(
                formattedData
            )
            console.log(response.data)

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

    const onSubmitAppt2 = async (data) => {
        const appointmentRequest = {
            ...data,
            appointmentInjectionDate: data.appointmentInjectionDate
                ? dayjs(data.appointmentInjectionDate).format('DD-MM-YYYY')
                : null,
        }
        try {
            const response = await appointmentService.createAppointmentWithCustCode(
                appointmentRequest
            )

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

    return (
        <div>
            <div className="mt-4 flex flex-col">
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary mr-4"
                        onChange={() => setIsCustomer(1)}
                    />
                    <span>Bạn đã có mã khách hàng tại trung tâm.</span>
                </div>

                <div className="flex items-center">
                    <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary mr-4"
                        onChange={() => setIsCustomer(0)}
                    />
                    <span>Bạn chưa có mã khách hàng tại trung tâm.</span>
                </div>
            </div>

            <div className="mt-5 space-x-5 w-full">
                {isCustomer == 0 ? (
                    <div className="flex flex-row space-x-5">
                        <form className=" max-w-full" onSubmit={handleSubmit(onSubmit)}>
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

                            <div className="relative z-0 w-full mb-5 group">
                                <label>Địa chỉ thường trú:</label>
                            </div>

                            <div className="flex flex-row space-x-4 w-125">
                                <div className="relative z-0 w-full mb-5 group">
                                    <label>Tỉnh/Thành:</label>
                                    <select
                                        {...register('appointmentCustomerProvince')}
                                        onChange={(e) => {
                                            const provinceValue = e.target.value
                                            setSelectedProvince(provinceValue)
                                            setValue('appointmentCustomerProvince', provinceValue)
                                            if (provinceValue)
                                                clearErrors('appointmentCustomerProvince')
                                        }}
                                        value={selectedProvince}
                                        className="max-h-20 overflow-y-auto block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                        <option value="">Chọn tỉnh thành</option>
                                        {provinceList.map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.appointmentCustomerProvince && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.appointmentCustomerProvince.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <label>Quận/Huyện:</label>
                                    <select
                                        {...register('appointmentCustomerDistrict')}
                                        onChange={(e) => {
                                            const districtValue = e.target.value
                                            setSelectedDistrict(districtValue)
                                            setValue('appointmentCustomerDistrict', districtValue)
                                            if (districtValue)
                                                clearErrors('appointmentCustomerDistrict')
                                        }}
                                        value={selectedDistrict}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        disabled={!selectedProvince}
                                    >
                                        <option value="">Chọn quận huyện</option>
                                        {selectedProvince &&
                                            districtList.map((district) => (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.appointmentCustomerDistrict && (
                                        <span className="w-40 text-red-500 text-sm">
                                            {errors.appointmentCustomerDistrict.message}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group text-nowrap">
                                    <label>Xã/Phường:</label>
                                    <select
                                        {...register('appointmentCustomerWard')}
                                        onChange={(e) => {
                                            const wardValue = e.target.value
                                            setSelectedWard(wardValue)
                                            setValue('appointmentCustomerWard', wardValue)
                                            if (wardValue) clearErrors('appointmentCustomerWard')
                                        }}
                                        value={selectedWard}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="">Chọn xã phường</option>
                                        {selectedDistrict &&
                                            wardList.map((ward) => (
                                                <option key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </option>
                                            ))}
                                    </select>
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
                                    {...register('appointmentInjectionDate', { valueAsDate: true })}
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

                        <div className="flex-1 max-w-full">
                            <div className="text-blue-500 size-5 w-full font-bold text-2xl text-center">
                                Thông tin vắc xin
                            </div>
                            {errors.appointmentBatchDetailId && (
                                <div className="text-red-500 text-sm w-full mt-2">
                                    {errors.appointmentBatchDetailId.message ||
                                        'Bạn chưa chọn vắc xin'}
                                </div>
                            )}
                            <div className="collapse collapse-arrow  bg-base-200 mt-10">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">Vắc xin lẻ</div>

                                <div className="collapse-content">
                                    <div className="flex flex-col min-h-[400px]">
                                        <div className="flex flex-wrap gap-2 flex-grow">
                                            {currentBatchDetails.map((batchDetail, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="card bg-base-100 w-72 shadow-xl flex-shrink-0"
                                                    >
                                                        <div className="card-body">
                                                            <h2 className="card-title ">
                                                                {batchDetail.vaccineResponse
                                                                    ?.vaccineName ||
                                                                    'Không có dữ liệu'}
                                                            </h2>
                                                            <span>
                                                                Phòng:{' '}
                                                                {batchDetail.diseaseResponse
                                                                    ?.diseaseName ||
                                                                    'Không có dữ liệu'}
                                                            </span>
                                                            <p>
                                                                Giá:{' '}
                                                                {formatCurrency(
                                                                    batchDetail.batchDetailVaccinePrice
                                                                )}
                                                            </p>
                                                            <div className="card-actions justify-end">
                                                                <input
                                                                    type="radio"
                                                                    name="radio-7"
                                                                    className="radio radio-info"
                                                                    value={
                                                                        batchDetail.batchDetailId
                                                                    }
                                                                    onChange={() => {
                                                                        setValue(
                                                                            'appointmentBatchDetailId',
                                                                            batchDetail.batchDetailId ||
                                                                                0
                                                                        )
                                                                        clearErrors(
                                                                            'appointmentBatchDetailId'
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
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
                            </div>

                            <div className="collapse collapse-arrow  bg-base-200 mt-5">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Gói vắc xin
                                </div>
                                <div className="collapse-content"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row space-x-5">
                        <form className="max-w-full" onSubmit={handleSubmitAppt2(onSubmitAppt2)}>
                            <div className="text-blue-500 size-5 w-full font-bold text-2xl text-center">
                                Thông tin người tiêm
                            </div>

                            <div className="relative z-0 w-full mb-5 group mt-5">
                                <input
                                    type="text"
                                    {...registerAppt2('appointmentCustomerCode')}
                                    placeholder=" "
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Mã khách hàng
                                </label>
                                {errorsAppt2.appointmentCustomerCode && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errorsAppt2.appointmentCustomerCode.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-125 mb-5 group space-x-2">
                                <label>Chọn ngày tiêm: </label>
                                <DatePicker
                                    {...registerAppt2('appointmentInjectionDate', {
                                        valueAsDate: true,
                                    })}
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledPastDate}
                                    onChange={(date) =>
                                        setValueAppt2(
                                            'appointmentInjectionDate',
                                            date?.toDate() || null,
                                            {
                                                shouldValidate: true,
                                            }
                                        )
                                    }
                                />
                                {errorsAppt2.appointmentInjectionDate && (
                                    <span className="w-70 text-red-500 text-sm">
                                        {errorsAppt2.appointmentInjectionDate.message}
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

                        <div className="flex-1 max-w-full">
                            <div className="text-blue-500 size-5 w-full font-bold text-2xl text-center">
                                Thông tin vắc xin
                            </div>
                            {errorsAppt2.appointmentBatchDetailId && (
                                <div className="text-red-500 text-sm w-full mt-2">
                                    {errorsAppt2.appointmentBatchDetailId.message ||
                                        'Bạn chưa chọn vắc xin'}
                                </div>
                            )}
                            <div className="collapse collapse-arrow  bg-base-200 mt-10">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">Vắc xin lẻ</div>

                                <div className="collapse-content">
                                    <div className="flex flex-col min-h-[400px]">
                                        <div className="flex flex-wrap gap-2 flex-grow">
                                            {currentBatchDetails.map((batchDetail, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="card bg-base-100 w-72 shadow-xl flex-shrink-0"
                                                    >
                                                        <div className="card-body">
                                                            <h2 className="card-title ">
                                                                {batchDetail.vaccineResponse
                                                                    ?.vaccineName ||
                                                                    'Không có dữ liệu'}
                                                            </h2>
                                                            <span>
                                                                Phòng:{' '}
                                                                {batchDetail.diseaseResponse
                                                                    ?.diseaseName ||
                                                                    'Không có dữ liệu'}
                                                            </span>
                                                            <p>
                                                                Giá:{' '}
                                                                {formatCurrency(
                                                                    batchDetail.batchDetailVaccinePrice
                                                                )}
                                                            </p>
                                                            <div className="card-actions justify-end">
                                                                <input
                                                                    type="radio"
                                                                    name="radio-7"
                                                                    className="radio radio-info"
                                                                    value={
                                                                        batchDetail.batchDetailId
                                                                    }
                                                                    onChange={() => {
                                                                        setValueAppt2(
                                                                            'appointmentBatchDetailId',
                                                                            batchDetail.batchDetailId ||
                                                                                0
                                                                        )
                                                                        clearErrorsAppt2(
                                                                            'appointmentBatchDetailId'
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
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
                            </div>

                            <div className="collapse collapse-arrow  bg-base-200 mt-5">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Gói vắc xin
                                </div>
                                <div className="collapse-content"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
