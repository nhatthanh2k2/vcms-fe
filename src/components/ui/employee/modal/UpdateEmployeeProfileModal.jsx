import Modal from 'antd/es/modal/Modal'
import React, { useRef, useState, useEffect } from 'react'
import { addressService } from '@/services'
import { convertQualification } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Select } from 'antd'

const updateInfoSchema = z.object({
    employeeFullName: z.string().nonempty('Họ và tên là bắt buộc'),
    employeeDob: z.string().nonempty('Ngày sinh là bắt buộc'),
    employeeEmail: z.string().email('Email không hợp lệ'),
    employeePhone: z.string().nonempty('Số điện thoại là bắt buộc'),
    employeeGender: z.enum(['MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'Giới tính là bắt buộc' }),
    }),
    employeeQualification: z.string().nonempty('Trình độ chuyên môn là bắt buộc'),
    employeePosition: z.string().nonempty('Chức vụ là bắt buộc'),
    employeeProvince: z.string().nonempty('Tỉnh/Thành là bắt buộc'),
    employeeDistrict: z.string().nonempty('Quận/Huyện là bắt buộc'),
    employeeWard: z.string().nonempty('Xã/Phường là bắt buộc'),
})

export const UpdateEmployeeProfileModal = ({
    employee,
    visibleUpdateEmployeeProfileModal,
    handleCloseUpdateEmployeeProfileModal,
}) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)
    const originalAvatar =
        import.meta.env.VITE_VCMS_IMAGE + '/avatars/' + employee?.employeeProfile.employeeAvatar

    const handleChoseFile = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleViewOldImage = () => {
        setSelectedImage(null)
    }

    // xu ly cap nhat thong tin
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
        getValues,
    } = useForm({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            employeeFullName: employee.employeeProfile.employeeFullName,
            employeeDob: employee.employeeProfile.employeeDob,
            employeeEmail: employee.employeeProfile.employeeEmail,
            employeePhone: employee.employeeProfile.employeePhone,
            employeeGender: employee.employeeProfile.employeeGender,
            employeeQualification: convertQualification(
                employee.employeeProfile.employeeQualification
            ),
            employeePosition: employee.employeeProfile.employeePosition,
            employeeProvince: employee.employeeProfile.employeeProvince,
            employeeDistrict: employee.employeeProfile.employeeDistrict,
            employeeWard: employee.employeeProfile.employeeWard,
        },
    })

    const onSubmit = (data) => {
        console.log(data)
    }

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
    }, [])
    // Khi province thay đổi, cập nhật mã quận
    useEffect(() => {
        const provinceCode = addressService.getProvinceCodeByName(getValues('employeeProvince'))
        setSelectedProvince(provinceCode)

        if (provinceCode) {
            const districtsForProvince = addressService
                .getDistrictList()
                .filter((district) => district.province_code === provinceCode)
            setDistrictList(districtsForProvince)

            const districtCode = addressService.getDistrictCodeByProvinceCodeAndDistrictName(
                provinceCode,
                getValues('employeeDistrict')
            )
            setSelectedDistrict(districtCode)
        }
    }, [getValues('employeeProvince')])

    useEffect(() => {
        const wardCode = addressService.getWardCodeByDistrictCodeAndWardName(
            selectedDistrict,
            getValues('employeeWard')
        )
        setSelectedWard(wardCode)
    }, [selectedDistrict])

    return (
        <Modal
            title={<div className="text-center font-bold text-xl">Cài đặt hồ sơ cá nhân</div>}
            open={visibleUpdateEmployeeProfileModal}
            onCancel={handleCloseUpdateEmployeeProfileModal}
            footer={null}
            width={1200}
            style={{
                top: 40,
            }}
        >
            <div className="flex flex-row space-x-5">
                <div className="flex flex-col">
                    <div className="flex items-center justify-center bg-gray-200">
                        <div className="relative">
                            <div className=" rounded-full bg-gray-300 flex items-center justify-center">
                                <img
                                    src={selectedImage || originalAvatar}
                                    alt="Avatar"
                                    className="w-72 h-72 rounded-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-2 hover:bg-teal-100 right-2 w-10 h-10 bg-base-100 rounded-full flex items-center justify-center border border-gray-300 ">
                                <svg
                                    onClick={handleChoseFile}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 5H9.328a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 5.672 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-3-7h6m-3 3V2m-9 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex space-x-2 mt-2 justify-center">
                        <div className="m-3">
                            <button
                                onClick={handleViewOldImage}
                                className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button"
                            >
                                <span className="mr-2">Xem ảnh cũ</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m14.264 15.938-1.668-1.655c-.805-.798-1.208-1.197-1.67-1.343a2 2 0 0 0-1.246.014c-.458.155-.852.563-1.64 1.379L4.045 18.28m10.22-2.343.341-.338c.806-.8 1.21-1.199 1.671-1.345a2 2 0 0 1 1.248.015c.458.156.852.565 1.64 1.382l.836.842m-5.736-.555 4.011 4.018m0 0c-.357.044-.82.044-1.475.044H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874 1.845 1.845 0 0 1-.174-.628m14.231 1.676a1.85 1.85 0 0 0 .633-.174 2 2 0 0 0 .874-.874C20 18.48 20 17.92 20 16.8v-.307M4.044 18.28C4 17.922 4 17.457 4 16.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 5.52 20 6.08 20 7.2v9.293M17 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="m-3">
                            <button className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button">
                                <span className="mr-2">Cập nhật ảnh</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m14.264 15.938-1.668-1.655c-.805-.798-1.208-1.197-1.67-1.343a2 2 0 0 0-1.246.014c-.458.156-.852.563-1.64 1.379L4.045 18.28m10.22-2.342.341-.339c.806-.8 1.21-1.199 1.671-1.345a2 2 0 0 1 1.248.015c.458.156.852.565 1.64 1.383l.836.842m-5.736-.556 4.011 4.019m0 0c-.357.043-.82.043-1.475.043H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874 1.845 1.845 0 0 1-.174-.628m14.231 1.677a1.85 1.85 0 0 0 .633-.175 2 2 0 0 0 .874-.874C20 18.48 20 17.92 20 16.8v-.306M12.5 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 .658 0 1.122.044 1.48M20 11.5v4.994M14 10l2.025-.405c.177-.035.265-.053.347-.085a1 1 0 0 0 .207-.11c.072-.051.136-.115.264-.242L21 5a1.414 1.414 0 0 0-2-2l-4.158 4.158c-.127.127-.19.19-.241.263a1.002 1.002 0 0 0-.11.207c-.033.082-.05.17-.086.347L14 10Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-10">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Họ và tên:</label>
                                <input
                                    {...register('employeeFullName')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Ngày sinh:</label>
                                <input
                                    {...register('employeeDob')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-10 mt-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Email:</label>
                                <input
                                    {...register('employeeEmail')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Số điện thoại:</label>
                                <input
                                    {...register('employeePhone')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-10 mt-5">
                            <div className="flex-1 flex flex-col space-y-2 font-semibold">
                                <label>Giới tính:</label>
                                <div className="flex gap-2">
                                    <div className="flex gap-2">
                                        <label htmlFor="">Nam</label>
                                        <input
                                            {...register('employeeGender')}
                                            type="radio"
                                            value="MALE"
                                            className="radio radio-info"
                                            checked={
                                                employee?.employeeProfile.employeeGender === 'MALE'
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <label htmlFor="">Nữ</label>
                                        <input
                                            {...register('employeeGender')}
                                            type="radio"
                                            value="FEMALE"
                                            className="radio radio-info"
                                            checked={
                                                employee?.employeeProfile.employeeGender ===
                                                'FEMALE'
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Trình độ chuyên môn:</label>
                                <input
                                    readOnly
                                    {...register('employeeQualification')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Chức vụ:</label>
                                <input
                                    readOnly
                                    {...register('employeePosition')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>

                        <div className="font-semibold mt-5">
                            <label>Địa chỉ thường trú:</label>
                        </div>

                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5 group flex flex-col flex-1">
                                <label>Tỉnh/Thành:</label>
                                <Select
                                    {...register('employeeProvince')}
                                    placeholder="Chọn Tỉnh/Thành"
                                    value={getValues('employeeProvince')}
                                    onChange={(provinceValue) => {
                                        setSelectedProvince(provinceValue)
                                        setValue(
                                            'employeeProvince',
                                            addressService.getProvincenNameByCode(provinceValue)
                                        )
                                        if (provinceValue) clearErrors('employeeProvince')
                                    }}
                                    options={provinceList.map((province) => ({
                                        value: province.code,
                                        label: province.name,
                                    }))}
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col flex-1">
                                <label>Quận/Huyện:</label>
                                <Select
                                    {...register('employeeDistrict')}
                                    placeholder="Chọn quận/huyện"
                                    value={getValues('employeeDistrict')}
                                    onChange={(districtValue) => {
                                        if (districtValue !== selectedDistrict) {
                                            setSelectedDistrict(districtValue)
                                            setValue(
                                                'employeeDistrict',
                                                addressService.getDistrictNameByCode(districtValue)
                                            )
                                            if (districtValue) clearErrors('employeeDistrict')
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
                            </div>

                            <div className="relative z-0 w-full mb-5 group flex flex-col   flex-1">
                                <label>Xã/Phường:</label>
                                <Select
                                    {...register('employeeWard')}
                                    placeholder="Chọn xã/phường"
                                    value={getValues('employeeWard')}
                                    onChange={(wardValue) => {
                                        setSelectedWard(wardValue)
                                        setValue(
                                            'employeeWard',
                                            addressService.getWardNameByCode(wardValue)
                                        )
                                        if (wardValue) clearErrors('employeeWard')
                                    }}
                                    options={wardList
                                        .filter((ward) => ward.district_code === selectedDistrict)
                                        .map((ward) => ({
                                            value: ward.code,
                                            label: ward.name,
                                        }))}
                                    style={{ opacity: !selectedDistrict ? 0.75 : 1 }}
                                />

                                {errors.employeeWard && (
                                    <span className="w-40 text-red-500 text-sm">
                                        {errors.employeeWard.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="bg-white font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button">
                                <span className="mr-2">Cập nhật thông tin</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 " // Thêm hiệu ứng chuyển màu
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M2 21h6a1 1 0 0 0 0-2H3.071A7.011 7.011 0 0 1 10 13a5.044 5.044 0 1 0-3.377-1.337A9.01 9.01 0 0 0 1 20a1 1 0 0 0 1 1Zm8-16a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm10.207 4.293a1 1 0 0 0-1.414 0l-6.25 6.25a1.011 1.011 0 0 0-.241.391l-1.25 3.75A1 1 0 0 0 12 21a1.014 1.014 0 0 0 .316-.051l3.75-1.25a1 1 0 0 0 .391-.242l6.25-6.25a1 1 0 0 0 0-1.414Zm-5 8.583-1.629.543.543-1.629 5.379-5.376 1.086 1.086Z"
                                        className="fill-current text-gray-800 group-hover:text-white" // Đặt màu mặc định và màu hover
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
