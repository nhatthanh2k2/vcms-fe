import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertQualification } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { employeeService } from '@/services'
import { MyToast } from '../../common'

const updateInfoSchema = z.object({
    // employeeFullName: z.string().nonempty('Họ và tên là bắt buộc'),
    // employeeDob: z.string().nonempty('Ngày sinh là bắt buộc'),
    // employeeEmail: z.string().email('Email không hợp lệ'),
    // employeePhone: z.string().nonempty('Số điện thoại là bắt buộc'),
    // employeeGender: z.enum(['MALE', 'FEMALE'], {
    //     errorMap: () => ({ message: 'Giới tính là bắt buộc' }),
    // }),
    employeeQualification: z.string().nonempty('Trình độ chuyên môn là bắt buộc'),
    employeePosition: z.string().nonempty('Chức vụ là bắt buộc'),
    // employeeProvince: z.string().nonempty('Tỉnh/Thành là bắt buộc'),
    // employeeDistrict: z.string().nonempty('Quận/Huyện là bắt buộc'),
    // employeeWard: z.string().nonempty('Xã/Phường là bắt buộc'),
})

export const EditEmployeeModal = ({
    employeeInfo,
    visibleEditEmployeeModal,
    handleCloseEditEmployeeModal,
    getEmployeeList,
}) => {
    const [qualSelected, setQualSelected] = useState(null)
    const [positionSelected, setPositionSelected] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
    } = useForm({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            // employeeFullName: '',
            // employeeDob: '',
            // employeeEmail: '',
            // employeePhone: '',
            // employeeGender: '',
            employeeQualification: '',
            employeePosition: '',
            // employeeProvince: '',
            // employeeDistrict: '',
            // employeeWard: '',
        },
    })

    useEffect(() => {
        if (employeeInfo) {
            reset({
                // employeeFullName: employeeInfo.employeeFullName,
                // employeeDob: employeeInfo.employeeDob,
                // employeeEmail: employeeInfo.employeeEmail,
                // employeePhone: employeeInfo.employeePhone,
                // employeeGender: employeeInfo.employeeGender,
                employeeQualification: employeeInfo.employeeQualification,
                employeePosition: employeeInfo.employeePosition,
                // employeeProvince: employeeInfo.employeeProvince,
                // employeeDistrict: employeeInfo.employeeDistrict,
                // employeeWard: employeeInfo.employeeWard,
            })
        }
    }, [employeeInfo, reset])

    const handleCloseModal = () => {
        handleCloseEditEmployeeModal()
        reset()
    }

    const onSubmit = async (data) => {
        const request = {
            ...data,
            employeeUsername: employeeInfo.employeeUsername,
        }
        try {
            const response = await employeeService.updateQualificationAndPosition(request)

            if (response.data.code === 1000) {
                MyToast('success', 'Cập nhật trình độ chuyên môn và chức vụ  thành công.')
                handleCloseEditEmployeeModal()
                getEmployeeList()
            } else MyToast('error', 'Xảy ra lỗi khi cập nhật.')
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Không tìm thấy nhân viên.')
            }
        }
    }
    return (
        <Modal
            title={
                <div className="text-center font-bold text-2xl text-teal-500">
                    Cập nhật trình độ, chức vụ
                </div>
            }
            open={visibleEditEmployeeModal}
            onCancel={handleCloseModal}
            footer={null}
            width={800}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-10">
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Họ và tên:</label>
                        <input
                            readOnly
                            //{...register('employeeFullName')}
                            value={employeeInfo?.employeeFullName}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="font-semibold">Ngày sinh:</label>
                        <input
                            readOnly
                            //{...register('employeeDob')}
                            value={employeeInfo?.employeeDob}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-10 mt-5">
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Email:</label>
                        <input
                            readOnly
                            //{...register('employeeEmail')}
                            value={employeeInfo?.employeeEmail}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Số điện thoại:</label>
                        <input
                            readOnly
                            //{...register('employeePhone')}
                            value={employeeInfo?.employeePhone}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-10 mt-5">
                    <div className="flex-1 flex flex-col space-y-2 font-semibold">
                        <label>Giới tính:</label>
                        <div className="flex space-x-5">
                            <div className="flex gap-2">
                                <label htmlFor="">Nam</label>
                                <input
                                    // {...register('employeeGender')}
                                    type="radio"
                                    value="MALE"
                                    className="radio radio-info"
                                    checked={employeeInfo?.employeeGender === 'MALE'}
                                />
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="">Nữ</label>
                                <input
                                    // {...register('employeeGender')}
                                    type="radio"
                                    value="FEMALE"
                                    className="radio radio-info"
                                    checked={employeeInfo?.employeeGender === 'FEMALE'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-2 flex flex-col">
                        <label className="font-semibold">Trình độ chuyên môn:</label>
                        <Select
                            placeholder="Chọn trình độ chuyên môn"
                            options={[
                                { value: 'ĐD', label: <span>Điều dưỡng</span> },
                                { value: 'BS', label: <span>Bác sĩ</span> },
                                { value: 'BS.CKI', label: <span>Bác sĩ chuyên khoa I</span> },
                                { value: 'BS.CKII', label: <span>Bác sĩ chuyên khoa II</span> },
                                { value: 'Ths.Bs', label: <span>Thạc sĩ, Bác sĩ</span> },
                                { value: 'Ts.Bs', label: <span>Tiến sĩ, Bác sĩ</span> },
                            ]}
                            {...register('employeeQualification')}
                            value={getValues('employeeQualification') || qualSelected}
                            onChange={(value) => {
                                setQualSelected(value)
                                setValue('employeeQualification', value)
                            }}
                        />
                    </div>
                    <div className="flex-1 space-y-2 flex flex-col">
                        <label className="font-semibold">Chức vụ:</label>
                        <Select
                            placeholder="Chọn chức vụ"
                            options={[
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
                            value={getValues('employeePosition') || positionSelected}
                            onChange={(value) => {
                                setPositionSelected(value)
                                setValue('employeePosition', value)
                            }}
                        />
                    </div>
                </div>

                <div className="font-semibold mt-5">
                    <label>Địa chỉ thường trú:</label>
                </div>

                <div className="flex flex-row space-x-4">
                    <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                        <label className="font-semibold">Tỉnh/Thành:</label>
                        <input
                            readOnly
                            //{...register('employeeProvince')}
                            value={employeeInfo?.employeeProvince}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>

                    <div className="relative z-0 w-full mb-5 group flex flex-col flex-1 space-y-1">
                        <label className="font-semibold">Quận/Huyện:</label>
                        <input
                            readOnly
                            //{...register('employeeDistrict')}
                            value={employeeInfo?.employeeDistrict}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>

                    <div className="relative z-0 w-full mb-5 group flex flex-col  space-y-1 flex-1">
                        <label className="font-semibold">Xã/Phường:</label>
                        <input
                            readOnly
                            //{...register('employeeWard')}
                            value={employeeInfo?.employeeWard}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-white font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button">
                        <span className="mr-2">Cập nhật</span>
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
