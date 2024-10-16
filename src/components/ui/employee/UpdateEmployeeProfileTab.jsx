import { addressService } from '@/services'
import { convertQualification } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
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

export const UpdateEmployeeProfileTab = ({ employee }) => {
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

    return (
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
                                checked={employee?.employeeProfile.employeeGender === 'MALE'}
                            />
                        </div>
                        <div className="flex gap-2">
                            <label htmlFor="">Nữ</label>
                            <input
                                {...register('employeeGender')}
                                type="radio"
                                value="FEMALE"
                                className="radio radio-info"
                                checked={employee?.employeeProfile.employeeGender === 'FEMALE'}
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

            {/* <div className="flex gap-10 ">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Tỉnh/Thành:</label>
                    <input
                        {...register('employeeProvince')}
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Quận/Huyện:</label>
                    <input
                        {...register('employeeDistrict')}
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Xã/Phường:</label>
                    <input
                        {...register('employeeWard')}
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
            </div> */}

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
                    {errors.employeeProvince && (
                        <span className="w-40 text-red-500 text-sm">
                            {errors.employeeProvince.message}
                        </span>
                    )}
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
                        //disabled={!selectedProvince}
                        options={districtList
                            .filter((district) => district.province_code === selectedProvince)
                            .map((district) => ({
                                value: district.code,
                                label: district.name,
                            }))}
                        style={{ opacity: !selectedProvince ? 0.75 : 1 }}
                    />
                    {errors.employeeDistrict && (
                        <span className="w-40 text-red-500 text-sm">
                            {errors.employeeDistrict.message}
                        </span>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group flex flex-col   flex-1">
                    <label>Xã/Phường:</label>
                    <Select
                        {...register('employeeWard')}
                        placeholder="Chọn xã/phường"
                        value={getValues('employeeWard')} // Hiển thị placeholder khi chưa chọn phường/xã
                        onChange={(wardValue) => {
                            setSelectedWard(wardValue)
                            setValue('employeeWard', addressService.getWardNameByCode(wardValue))
                            if (wardValue) clearErrors('employeeWard')
                        }}
                        //disabled={!selectedDistrict} // Vô hiệu hóa nếu chưa chọn quận/huyện
                        options={wardList
                            .filter((ward) => ward.district_code === selectedDistrict) // Lọc danh sách xã/phường theo quận/huyện đã chọn
                            .map((ward) => ({
                                value: ward.code,
                                label: ward.name,
                            }))}
                        style={{ opacity: !selectedDistrict ? 0.75 : 1 }} // Giảm độ mờ khi bị disabled để dễ nhìn placeholder
                    />

                    {errors.employeeWard && (
                        <span className="w-40 text-red-500 text-sm">
                            {errors.employeeWard.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <button type="submit" className="btn btn-primary mt-5">
                    Cập nhật
                </button>
            </div>
        </form>
    )
}
