import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addressService, customerService } from '@/services'
import { useForm } from 'react-hook-form'
import { DatePicker, Table, Modal } from 'antd'
import { disabledDoB, disabledPastDate } from '@/utils'
import { AlertModal, MyToast } from '../common'

const addCustomerSchema = z.object({
    customerFullName: z.string().min(1, { message: 'Họ và tên là bắt buộc' }),
    customerEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    customerPhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
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

export const AddCustomerModal = ({ visibleAddCustomerModal, handleCloseAddCustomerModal }) => {
    const formAddCustomer = useRef(null)

    const handleAddCustomer = () => {
        formAddCustomer.current.requestSubmit()
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(addCustomerSchema),
        defaultValues: {
            customerFullName: '',
            customerEmail: '',
            customerPhone: '',
            customerDob: null,
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

    const [provinceData, setProvinceData] = useState('')
    const [districtData, setDistrictData] = useState('')
    const [wardData, setWardData] = useState('')

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
        const customerData = {
            ...data,
            customerProvince: provinceData,
            customerDistrict: districtData,
            customerWard: wardData,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
        }
        try {
            const response = await customerService.createCustomer(customerData)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Thêm khách hàng thành công.')
                }
            } else MyToast('error', 'Xảy ra lỗi khi thêm khách hàng.')
        } catch (error) {
            if (error.response)
                if (error.response.status === 409)
                    MyToast('warn', 'Khách hàng đã có thông tin tại trung tâm.')
        }
    }

    const handleCancel = () => {
        handleCloseAddCustomerModal()
        reset()
    }

    return (
        <Modal
            title={<div className="text-center font-bold text-xl">Thêm khách hàng mới</div>}
            open={visibleAddCustomerModal}
            onCancel={handleCancel}
            footer={false}
            width={1200}
            style={{
                top: 40,
            }}
        >
            <div className="">
                <form
                    className=" max-w-full flex flex-row gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formAddCustomer}
                >
                    <div className="flex-1">
                        <div className=" text-blue-500 size-5 w-full font-bold text-base text-center">
                            Thông tin khách hàng
                        </div>

                        <div className="relative z-0 w-full mb-5 group mt-5">
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
                                <div>
                                    <label>Ngày sinh: </label>
                                    <DatePicker
                                        {...register('customerDob', {
                                            valueAsDate: true,
                                        })}
                                        format="DD-MM-YYYY"
                                        disabledDate={disabledDoB}
                                        onChange={(date) =>
                                            setValue('customerDob', date?.toDate() || null, {
                                                shouldValidate: true,
                                            })
                                        }
                                    />
                                </div>

                                {errors.customerDob && (
                                    <span className="w-50 text-red-500 text-sm">
                                        {errors.customerDob.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col">
                                <div className="flex flex-row gap-5  mt-2">
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

                        <div className="relative z-0 w-full mb-5 group">
                            <label>Địa chỉ thường trú:</label>
                        </div>

                        <div className="flex flex-row space-x-4 w-125">
                            <div className="relative z-0 w-full mb-5 group">
                                <label>Tỉnh/Thành:</label>
                                <select
                                    {...register('customerProvince')}
                                    onChange={(e) => {
                                        const provinceValue = e.target.value
                                        setSelectedProvince(provinceValue)
                                        setValue('customerProvince', provinceValue)
                                        if (provinceValue) clearErrors('customerProvince')
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
                                {errors.customerProvince && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerProvince.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label>Quận/Huyện:</label>
                                <select
                                    {...register('customerDistrict')}
                                    onChange={(e) => {
                                        const districtValue = e.target.value
                                        setSelectedDistrict(districtValue)
                                        setValue('customerDistrict', districtValue)
                                        if (districtValue) clearErrors('customerDistrict')
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
                                {errors.customerDistrict && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerDistrict.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group text-nowrap">
                                <label>Xã/Phường:</label>
                                <select
                                    {...register('customerWard')}
                                    onChange={(e) => {
                                        const wardValue = e.target.value
                                        setSelectedWard(wardValue)
                                        setValue('customerWard', wardValue)
                                        if (wardValue) clearErrors('customerWard')
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
                                {errors.customerWard && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.customerWard.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className=" text-blue-600 size-5 w-full font-bold my-5 text-base text-center">
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
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentcolor"
                                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                ></path>
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
