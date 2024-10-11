import { convertQualification } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export const EmployeeProfileTab = ({ employee }) => {
    const { register, handleSubmit, setValue } = useForm({
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

            <div className="flex gap-10 ">
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
            </div>

            <div></div>
            <button type="submit" className="btn btn-primary mt-5">
                Cập nhật
            </button>
        </form>
    )
}
