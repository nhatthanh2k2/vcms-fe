import { addressService, employeeService } from '@/services'
import { disabledDoB } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyToast } from '../../common'

const employeeSchema = z.object({
    employeeFullName: z.string().min(1, { message: 'Họ và tên là bắt buộc' }),
    employeeDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
    employeeEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    employeePhone: z.string().regex(/^0[3-9]\d{8}$/, {
        message: 'SĐT không hợp lệ',
    }),
    employeeGender: z.enum(['MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'Giới tính là bắt buộc' }),
    }),
    employeeQualification: z.string().nonempty('Trình độ chuyên môn là bắt buộc'),
    employeePosition: z.string().nonempty('Chức vụ là bắt buộc'),
    employeeProvince: z.string().nonempty('Tỉnh/Thành là bắt buộc'),
    employeeDistrict: z.string().nonempty('Quận/Huyện là bắt buộc'),
    employeeWard: z.string().nonempty('Xã/Phường là bắt buộc'),
    roles: z.array(z.string()).nonempty('Chọn ý nhất 1 vai trò'),
})

const roleMapping = {
    'Bác sĩ': 'DOCTOR',
    'Điều dưỡng': 'NURSE',
    'Nhân viên lễ tân': 'RECEPTIONIST',
}

export const AddEmployeeModal = ({
    visibleAddEmployeeModal,
    handleCloseAddEmployeeModal,
    getEmployeeList,
}) => {
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            employeeFullName: '',
            employeeEmail: '',
            employeePhone: '',
            employeeGender: '',
            employeeDob: '',
            employeeQualification: '',
            employeePosition: '',
            employeeProvince: '',
            employeeDistrict: '',
            employeeWard: '',
            roles: [],
        },
    })

    const selectedRoles = watch('roles') || []
    const handleRoleChange = (role) => {
        const mappedRole = roleMapping[role]
        const currentRoles = [...selectedRoles]
        if (currentRoles.includes(mappedRole)) {
            setValue(
                'roles',
                currentRoles.filter((r) => r !== mappedRole)
            )
        } else {
            setValue('roles', [...currentRoles, mappedRole])
        }
    }

    const onSubmit = async (data) => {
        try {
            const request = {
                ...data,
                employeeDob: data.employeeDob ? dayjs(data.employeeDob).format('DD-MM-YYYY') : null,
            }
            const response = await employeeService.createEmployee(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Thêm nhân viên thành công.')
                getEmployeeList()
            }
        } catch {
            MyToast('error', 'Xảy ra lỗi khi thêm nhân viên thành công.')
        }
    }

    const handleCloseModal = () => {
        handleCloseAddEmployeeModal()
        reset()
    }

    return (
        <Modal
            title={
                <div className="text-center text-2xl text-teal-500 font-bold">
                    Thông tin nhân viên
                </div>
            }
            open={visibleAddEmployeeModal}
            onCancel={handleCloseModal}
            footer={false}
            width={1000}
            style={{
                top: 40,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-10">
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Họ và tên:</label>
                        <input
                            {...register('employeeFullName')}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />

                        {errors.employeeFullName && (
                            <span className="w-40 text-red-500 text-sm">
                                {errors.employeeFullName.message}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="font-semibold">Ngày sinh:</label>
                        <DatePicker
                            {...register('employeeDob', {
                                valueAsDate: true,
                            })}
                            format={'DD-MM-YYYY'}
                            disabledDate={disabledDoB}
                            onChange={(date) =>
                                setValue('employeeDob', date?.toDate() || null, {
                                    shouldValidate: true,
                                })
                            }
                        />
                        {errors.employeeDob && (
                            <span className="w-40 text-red-500 text-sm">
                                {errors.employeeDob.message}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col space-y-2 font-semibold">
                        <label>Giới tính:</label>
                        <div className="flex space-x-5">
                            <div className="flex space-x-2">
                                <label htmlFor="">Nam</label>
                                <input
                                    type="radio"
                                    value="MALE"
                                    className="radio radio-info"
                                    {...register('employeeGender')}
                                />
                            </div>
                            <div className="flex space-x-2">
                                <label htmlFor="">Nữ</label>
                                <input
                                    type="radio"
                                    value="FEMALE"
                                    className="radio radio-info"
                                    {...register('employeeGender')}
                                />
                            </div>
                        </div>
                        {errors.employeeGender && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeeGender.message}
                            </span>
                        )}
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
                        {errors.employeeEmail && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeeEmail.message}
                            </span>
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Số điện thoại:</label>
                        <input
                            {...register('employeePhone')}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                        {errors.employeePhone && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeePhone.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <label className="font-semibold">Trình độ chuyên môn:</label>
                        <Select
                            {...register('employeeQualification')}
                            placeholder="Chọn trình độ chuyên môn"
                            options={[
                                { value: 'ĐD', label: <span>Điều dưỡng</span> },
                                { value: 'BS', label: <span>Bác sĩ</span> },
                                { value: 'BS.CKI', label: <span>Bác sĩ chuyên khoa I</span> },
                                { value: 'BS.CKII', label: <span>Bác sĩ chuyên khoa II</span> },
                                { value: 'Ths.Bs', label: <span>Thạc sĩ, Bác sĩ</span> },
                                { value: 'Ts.Bs', label: <span>Tiến sĩ, Bác sĩ</span> },
                            ]}
                            onChange={(value) => setValue('employeeQualification', value)}
                        />
                        {errors.employeeQualification && (
                            <span className=" text-red-500 text-sm">
                                {errors.employeeQualification.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-10 mt-5">
                    <div className="flex flex-col flex-1 space-y-2">
                        <label className="font-semibold">Chức vụ:</label>
                        <Select
                            placeholder="Chọn chức vụ"
                            options={[
                                { value: 'Lễ tân', label: <span>Lễ tân</span> },
                                {
                                    value: 'Chuyên viên điều dưỡng',
                                    label: <span>Chuyên viên điều dưỡng</span>,
                                },
                                {
                                    value: 'Giám đốc điều dưỡng',
                                    label: <span>Giám đốc điều dưỡng</span>,
                                },
                                {
                                    value: 'Chuyên viên Y khoa',
                                    label: <span>Chuyên viên y khoa</span>,
                                },
                                {
                                    value: 'Bác sĩ khám sàng lọc',
                                    label: <span>Bác sĩ khám sàng lọc</span>,
                                },
                                { value: 'Quản lý Y khoa', label: <span>Quản lý Y khoa</span> },
                                { value: 'Giám đốc Y khoa', label: <span>Giám đốc Y khoa</span> },
                            ]}
                            {...register('employeePosition')}
                            onChange={(value) => setValue('employeePosition', value)}
                        />
                        {errors.employeePosition && (
                            <span className=" text-red-500 text-sm">
                                {errors.employeePosition.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 space-y-1 justify-center">
                        <label className="font-semibold">Vai trò:</label>
                        <div className="flex space-x-5">
                            {['Bác sĩ', 'Điều dưỡng', 'Nhân viên lễ tân'].map((role) => (
                                <div key={role} className="form-control">
                                    <label className="cursor-pointer label flex space-x-2">
                                        <span className="label-text">{role}</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                            onChange={() => handleRoleChange(role)}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.roles && <p className="text-red-500">{errors.roles.message}</p>}
                    </div>
                </div>

                <div className="font-semibold mt-5">
                    <label>Địa chỉ thường trú:</label>
                </div>

                <div className="flex flex-row space-x-4">
                    <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                        <label>Tỉnh/Thành:</label>
                        <Select
                            {...register('employeeProvince')}
                            placeholder="Chọn Tỉnh/Thành"
                            onChange={(provinceValue) => {
                                setSelectedProvince(provinceValue)
                                setValue(
                                    'employeeProvince',
                                    addressService.getProvincenNameByCode(provinceValue)
                                )
                            }}
                            options={provinceList.map((province) => ({
                                value: province.code,
                                label: province.name,
                            }))}
                        />
                        {errors.employeeProvince && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeeProvince.message}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                        <label>Quận/Huyện:</label>
                        <Select
                            {...register('employeeDistrict')}
                            placeholder="Chọn quận/huyện"
                            value={selectedDistrict || undefined}
                            disabled={!selectedProvince}
                            onChange={(value) => {
                                if (value !== selectedDistrict) {
                                    setSelectedDistrict(value)
                                    setValue(
                                        'employeeDistrict',
                                        addressService.getDistrictNameByCode(value)
                                    )
                                }
                            }}
                            options={
                                selectedProvince
                                    ? districtList
                                          .filter(
                                              (district) =>
                                                  district.province_code === selectedProvince
                                          )
                                          .map((district) => ({
                                              value: district.code,
                                              label: district.name,
                                          }))
                                    : []
                            }
                            style={{ opacity: !selectedProvince ? 0.75 : 1 }}
                        />
                        {errors.employeeDistrict && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeeDistrict.message}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                        <label>Xã/Phường:</label>
                        <Select
                            {...register('employeeWard')}
                            placeholder="Chọn xã/phường"
                            value={selectedWard || undefined}
                            disabled={!selectedDistrict}
                            onChange={(value) => {
                                setSelectedWard(value)
                                setValue('employeeWard', addressService.getWardNameByCode(value))
                            }}
                            options={
                                selectedDistrict
                                    ? wardList
                                          .filter((ward) => ward.district_code === selectedDistrict)
                                          .map((ward) => ({
                                              value: ward.code,
                                              label: ward.name,
                                          }))
                                    : []
                            }
                            style={{ opacity: !selectedDistrict ? 0.75 : 1 }}
                        />
                        {errors.employeeWard && (
                            <span className="w-50 text-red-500 text-sm">
                                {errors.employeeWard.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-white font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button"
                    >
                        <span className="mr-2">Thêm nhân viên</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 "
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M2 21h6a1 1 0 0 0 0-2H3.071A7.011 7.011 0 0 1 10 13a5.044 5.044 0 1 0-3.377-1.337A9.01 9.01 0 0 0 1 20a1 1 0 0 0 1 1Zm8-16a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm10.207 4.293a1 1 0 0 0-1.414 0l-6.25 6.25a1.011 1.011 0 0 0-.241.391l-1.25 3.75A1 1 0 0 0 12 21a1.014 1.014 0 0 0 .316-.051l3.75-1.25a1 1 0 0 0 .391-.242l6.25-6.25a1 1 0 0 0 0-1.414Zm-5 8.583-1.629.543.543-1.629 5.379-5.376 1.086 1.086Z"
                                className="fill-current text-gray-800 group-hover:text-white"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </Modal>
    )
}
