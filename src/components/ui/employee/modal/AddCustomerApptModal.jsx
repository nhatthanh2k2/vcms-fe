import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addressService, customerService } from '@/services'
import { useForm } from 'react-hook-form'
import { DatePicker, Modal, Select } from 'antd'
import { disabledDoB } from '@/utils'
import { MyToast } from '../../common'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const addCustomerApptSchema = z.object({
    customerFullName: z.string().min(1, { message: 'Họ và tên là bắt buộc' }),
    customerEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    customerPhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    customerDob: z.string().nonempty('Ngày sinh là bắt buộc'),
    customerGender: z.enum(['MALE', 'FEMALE'], { message: 'Giới tính là bắt buộc' }),
    customerProvince: z.string().min(1, { message: 'Tỉnh/Thành là bắt buộc' }),
    customerDistrict: z.string().min(1, { message: 'Quận/Huyện là bắt buộc' }),
    customerWard: z.string().min(1, { message: 'Xã/Phường là bắt buộc' }),
    relativesFullName: z.string().min(1, { message: 'Họ và tên người liên hệ là bắt buộc' }),
    relativesPhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    relativesRelationship: z.string().min(1, { message: 'Mối quan hệ là bắt buộc' }),
})

export const AddCustomerApptModal = ({
    visibleAddCustomerModal,
    handleCloseAddCustomerModal,
    appointmentRecord,
}) => {
    const formAddCustomer = useRef(null)

    const handleAddCustomer = () => {
        formAddCustomer.current.requestSubmit()
    }

    //console.log(appointmentRecord)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(addCustomerApptSchema),
        defaultValues: {
            customerFullName: '',
            customerEmail: '',
            customerPhone: '',
            customerDob: '',
            customerGender: '',
            customerProvince: '',
            customerDistrict: '',
            customerWard: '',
            relativesFullName: '',
            relativesPhone: '',
            relativesRelationship: '',
        },
    })

    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    useEffect(() => {
        setProvinceList(addressService.getProvinceList())
        setDistrictList(addressService.getDistrictList())
        setWardList(addressService.getWardList())
    }, [appointmentRecord])

    const [dob, setDob] = useState()
    useEffect(() => {
        if (appointmentRecord) {
            setDob(appointmentRecord?.appointmentCustomerDob)
            reset({
                customerFullName: appointmentRecord?.appointmentCustomerFullName,
                customerEmail: appointmentRecord?.appointmentCustomerEmail,
                customerPhone: appointmentRecord?.appointmentCustomerPhone,
                customerDob: appointmentRecord?.appointmentCustomerDob,
                customerGender: appointmentRecord?.appointmentCustomerGender,
                customerProvince: appointmentRecord?.appointmentCustomerProvince,
                customerDistrict: appointmentRecord?.appointmentCustomerDistrict,
                customerWard: appointmentRecord?.appointmentCustomerWard,
                relativesFullName: appointmentRecord?.appointmentRelativesFullName,
                relativesPhone: appointmentRecord?.appointmentRelativesPhone,
                relativesRelationship: appointmentRecord?.appointmentRelativesRelationship,
            })
        }
    }, [appointmentRecord, reset])

    useEffect(() => {
        if (appointmentRecord) {
            const provinceCode = addressService.getProvinceCodeByName(getValues('customerProvince'))
            setSelectedProvince(provinceCode)
            if (provinceCode) {
                const districtsForProvince = addressService
                    .getDistrictList()
                    .filter((district) => district.province_code === provinceCode)
                setDistrictList(districtsForProvince)

                const districtCode = addressService.getDistrictCodeByProvinceCodeAndDistrictName(
                    provinceCode,
                    getValues('customerDistrict')
                )
                setSelectedDistrict(districtCode)
            }
        }
    }, [appointmentRecord, getValues('customerProvince')])

    useEffect(() => {
        const wardCode = addressService.getWardCodeByDistrictCodeAndWardName(
            selectedDistrict,
            getValues('customerWard')
        )
        setSelectedWard(wardCode)
    }, [selectedDistrict])

    const onSubmit = async (data) => {
        const customerData = {
            ...data,
            customerProvince: addressService.getProvincenNameByCode(selectedProvince),
            customerDistrict: addressService.getDistrictNameByCode(selectedDistrict),
            customerWard: addressService.getWardNameByCode(selectedWard),
            customerDob: data.customerDob,
        }

        try {
            const response = await customerService.createCustomer(customerData)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Thêm khách hàng thành công.')
                }
            } else MyToast('error', 'Xảy ra lỗi khi thêm khách hàng.')
        } catch (error) {
            MyToast('warn', 'Khách hàng đã có thông tin tại trung tâm.')
        }
    }

    const handleCancel = () => {
        handleCloseAddCustomerModal()
        reset()
        setSelectedProvince('')
        setSelectedDistrict('')
        setSelectedWard('')
    }

    const parsedDob = dob ? dayjs(dob, 'DD-MM-YYYY') : null

    return (
        <Modal
            key={'add_customer_modal'}
            title={
                <div className="text-center font-bold text-xl">Thêm khách hàng mới từ lịch hẹn</div>
            }
            open={visibleAddCustomerModal}
            onCancel={handleCancel}
            footer={false}
            width={1200}
            style={{
                top: 40,
            }}
        >
            <div>
                <form
                    className=" max-w-full flex flex-row gap-5 mt-5"
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formAddCustomer}
                >
                    <div className="flex-1">
                        <div className=" text-blue-500 size-5 w-full font-bold text-base text-center">
                            Thông tin khách hàng
                        </div>

                        <div className="relative z-0 w-full mb-5 group ">
                            <input
                                type="text"
                                {...register('customerFullName')}
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Họ và tên
                            </label>
                            {errors.customerFullName && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.customerFullName.message}
                                </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                {...register('customerEmail')}
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email
                            </label>
                            {errors.customerEmail && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.customerEmail.message}
                                </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                {...register('customerPhone')}
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Số điện thoại
                            </label>
                            {errors.customerPhone && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.customerPhone.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-row gap-10">
                            <div className="relative z-0 w-full mb-5 group flex flex-col">
                                <div className="flex space-x-5">
                                    <label>Ngày sinh: </label>
                                    {parsedDob && (
                                        <DatePicker
                                            {...register('customerDob')}
                                            format="DD-MM-YYYY"
                                            defaultValue={parsedDob}
                                            onChange={(date) => {
                                                const formattedDate =
                                                    dayjs(date).format('DD-MM-YYYY')
                                                setDob(formattedDate)
                                                setValue('customerDob', formattedDate)
                                            }}
                                            disabledDate={disabledDoB}
                                        />
                                    )}
                                    {/* <DatePicker
                                        {...register('customerDob')}
                                        format={'DD-MM-YYYY'}
                                        defaultValue={parsedDob}
                                        onChange={(date) => {
                                            setDob(dayjs(date).format('DD-MM-YYYY'))
                                            setValue(
                                                'customerDob',
                                                dayjs(date).format('DD-MM-YYYY')
                                            )
                                        }}
                                        disabledDate={disabledDoB}
                                    /> */}
                                </div>

                                {errors.customerDob && (
                                    <span className="w-50 text-red-500 text-sm">
                                        {errors.customerDob.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col">
                                <div className="flex flex-row gap-5  mt-2">
                                    <label htmlFor="">Giới tính: </label>
                                    <div className="flex space-x-2 justify-center">
                                        <label className="">Nam</label>
                                        <input
                                            type="radio"
                                            {...register('customerGender')}
                                            value="MALE"
                                            className="radio radio-accent"
                                        />
                                    </div>
                                    <div className="flex space-x-2 justify-center">
                                        <label className="">Nữ</label>
                                        <input
                                            type="radio"
                                            {...register('customerGender')}
                                            value="FEMALE"
                                            className="radio radio-accent"
                                        />
                                    </div>
                                </div>
                                {errors.customerGender && (
                                    <span className="w-50 text-red-500 text-sm">
                                        {errors.customerGender.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-1 group">
                            <label>Địa chỉ thường trú:</label>
                        </div>

                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                                <label>Tỉnh/Thành:</label>
                                <Select
                                    {...register('customerProvince')}
                                    placeholder="Chọn Tỉnh/Thành"
                                    value={selectedProvince ? selectedProvince : 'Chọn Tỉnh/Thành'}
                                    onChange={(provinceValue) => {
                                        setSelectedProvince(provinceValue)
                                        setValue(
                                            'customerProvince',
                                            addressService.getProvincenNameByCode(provinceValue)
                                        )
                                        if (provinceValue) clearErrors('customerProvince')
                                    }}
                                    options={provinceList.map((province) => ({
                                        value: province.code,
                                        label: province.name,
                                    }))}
                                />
                                {errors.customerProvince && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerProvince.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                                <label>Quận/Huyện:</label>
                                <Select
                                    {...register('customerDistrict')}
                                    placeholder="Chọn quận/huyện"
                                    value={selectedDistrict || undefined}
                                    onChange={(districtValue) => {
                                        if (districtValue !== selectedDistrict) {
                                            setSelectedDistrict(districtValue)
                                            setValue(
                                                'customerDistrict',
                                                addressService.getDistrictNameByCode(districtValue)
                                            )
                                            if (districtValue) clearErrors('customerDistrict')
                                        }
                                    }}
                                    options={districtList
                                        .filter(
                                            (district) =>
                                                district.province_code === selectedProvince
                                        )
                                        .map((district) => ({
                                            value: district.code,
                                            label: district.name,
                                        }))}
                                    style={{ opacity: !selectedProvince ? 0.75 : 1 }}
                                />
                                {errors.customerDistrict && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerDistrict.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                                <label>Xã/Phường:</label>
                                <Select
                                    {...register('customerWard')}
                                    placeholder="Chọn xã/phường"
                                    value={selectedWard || undefined}
                                    onChange={(wardValue) => {
                                        setSelectedWard(wardValue)
                                        setValue(
                                            'customerWard',
                                            addressService.getWardNameByCode(wardValue)
                                        )
                                        if (wardValue) clearErrors('customerWard')
                                    }}
                                    options={wardList
                                        .filter((ward) => ward.district_code === selectedDistrict)
                                        .map((ward) => ({
                                            value: ward.code,
                                            label: ward.name,
                                        }))}
                                    style={{ opacity: !selectedDistrict ? 0.75 : 1 }}
                                />

                                {errors.customerWard && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerWard.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className=" text-blue-600 size-5 w-full font-bold  text-base text-center">
                            Thông tin liên hệ
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                {...register('relativesFullName')}
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Họ và tên người liên hệ
                            </label>
                            {errors.relativesFullName && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.relativesFullName.message}
                                </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                {...register('relativesPhone')}
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Số điện thoại người liên hệ
                            </label>
                            {errors.relativesPhone && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.relativesPhone.message}
                                </span>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <div className="flex items-center">
                                <label className="w-2/3 ">Mối quan hệ với người tiêm:</label>
                                <select
                                    {...register('relativesRelationship')}
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

                            {errors.relativesRelationship && (
                                <span className="w-70 text-red-500 text-sm">
                                    {errors.relativesRelationship.message}
                                </span>
                            )}
                        </div>
                    </div>
                </form>
                <div className="flex justify-center gap-5">
                    <div className="m-3">
                        <button
                            onClick={handleAddCustomer}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Lưu khách hàng</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <g
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.16}
                                >
                                    <path d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className="m-3">
                        <button
                            onClick={handleCancel}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Đóng</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentcolor"
                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
