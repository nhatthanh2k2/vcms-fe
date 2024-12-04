import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeService } from '@/services'
import { MyToast } from '../../common'
import { Modal } from 'antd'
import emailjs from '@emailjs/browser'
import { generateOTP } from '@/utils'

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: 'Mật khẩu hiện tại không được trống' }),
        employeeOTP: z.string().min(1, { message: 'OTP không được trống.' }),
        newPassword: z
            .string()
            .min(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự.' })
            .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ cái in hoa.' })
            .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ cái thường.' })
            .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số.' })
            .regex(/[\W_]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Xác nhận mật khẩu không khớp.',
        path: ['confirmPassword'],
    })

export const ChangePasswordModal = ({
    visibleChangePasswordModal,
    handleCloseChangePasswordModal,
    employee,
}) => {
    const [otp, setOtp] = useState(null)

    const {
        register: registerChange,
        handleSubmit: handleSubmitChange,
        reset: resetChange,
        formState: { errors: errorsChange },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            employeeOTP: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const handleSendOTP = (e) => {
        e.preventDefault()
        const email = employee?.employeeProfile.employeeEmail
        console.log(email)

        try {
            if (!email) {
                MyToast('error', 'Vui lòng nhập email để gửi OTP.')
            } else {
                const otp = generateOTP()
                setOtp(otp)
                const templateParams = {
                    otp: otp,
                    employeeEmail: email,
                }
                console.log(templateParams)
                emailjs
                    .send('service_e54eizs', 'template_omyd5ht', templateParams, {
                        publicKey: 'KUsvkeW08x-_y8Ns2',
                    })
                    .then(
                        (response) => {
                            MyToast('success', 'OTP đã được gửi qua email.')
                        },
                        (error) => {
                            MyToast('error', 'Xảy ra lỗi khi gửi OTP.')
                        }
                    )
            }
        } catch (error) {
            MyToast('error', 'Không thể gửi mã OTP.')
        }
    }

    const onSubmitChange = async (data) => {
        if (otp !== data.employeeOTP) {
            MyToast('error', 'Mã OTP không đúng.')
            return
        }
        const changeData = {
            employeeUsername: employee.employeeProfile.employeeUsername,
            employeePassword: data.currentPassword,
            newPassword: data.newPassword,
        }
        try {
            const response = await employeeService.changePassword(changeData)
            if (response.status === 200) {
                if (response.data.code == 1000) {
                    MyToast('success', 'Đổi mật khẩu thành công')
                    setOtp(null)
                    resetChange()
                } else {
                    MyToast('success', 'Có lỗi xảy ra khi đổi mật khẩu')
                }
            } else {
                MyToast('success', 'Đổi mật khẩu không thành công')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Không tìm thấy người dùng')
                } else if (error.response.status === 400) {
                    MyToast('error', 'Mật khẩu hiện tại không khớp')
                }
            }
        }
    }

    const handleCloseModal = () => {
        handleCloseChangePasswordModal()
        resetChange()
    }

    return (
        <Modal
            title={
                <div className="text-center font-bold text-xl text-orange-500">Đổi Mật Khẩu</div>
            }
            open={visibleChangePasswordModal}
            onCancel={handleCloseModal}
            //onOk={handleCloseModal}
            footer={null}
            width={800}
        >
            <div className="flex flex-row justify-center  items-center ">
                <div>
                    <img className="w-100 h-100" src="/images/change-password.jpg" />
                </div>
                <form
                    className="flex flex-col space-y-1"
                    onSubmit={handleSubmitChange(onSubmitChange)}
                >
                    <label className="input input-bordered  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <g stroke="#000" strokeWidth={1.5}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.067 5c.592.958.933 2.086.933 3.293 0 3.476-2.83 6.294-6.32 6.294-.636 0-2.086-.146-2.791-.732l-.882.878c-.735.732-.147.732.147 1.317 0 0 .735 1.025 0 2.05-.441.585-1.676 1.404-3.086 0l-.294.292s.881 1.025.147 2.05c-.441.585-1.617 1.17-2.646.146l-1.028 1.024c-.706.703-1.568.293-1.91 0l-.883-.878c-.823-.82-.343-1.708 0-2.05l7.642-7.61s-.735-1.17-.735-2.78c0-3.476 2.83-6.294 6.32-6.294.819 0 1.601.155 2.319.437"
                                />
                                <path d="M17.885 8.294a2.2 2.2 0 0 1-2.204 2.195 2.2 2.2 0 0 1-2.205-2.195 2.2 2.2 0 0 1 2.205-2.196 2.2 2.2 0 0 1 2.204 2.196Z" />
                            </g>
                        </svg>
                        <input
                            {...registerChange('currentPassword')}
                            type="password"
                            className="grow"
                            placeholder="Mật khẩu hiện tại"
                        />
                    </label>
                    {errorsChange.currentPassword && (
                        <span className="w-fit text-red-500 text-sm">
                            {errorsChange.currentPassword.message}
                        </span>
                    )}

                    <label className="input input-bordered  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 opacity-70"
                            viewBox="0 -1 16 16"
                        >
                            <path
                                d="M6.5 11h5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1h-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5ZM8 5a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1H8ZM7 7h4v3H7Zm9 0a7.008 7.008 0 0 1-7 7 7.008 7.008 0 0 1-7-7V5.707L.854 6.854A.5.5 0 0 1 .5 7a.5.5 0 0 1-.354-.146.5.5 0 0 1 0-.708l2-2a.518.518 0 0 1 .163-.109.505.505 0 0 1 .382 0 .518.518 0 0 1 .163.109l2 2a.5.5 0 0 1 0 .708A.5.5 0 0 1 4.5 7a.5.5 0 0 1-.354-.146L3 5.707V7a6.006 6.006 0 0 0 6 6 6.006 6.006 0 0 0 6-6 6.006 6.006 0 0 0-6-6 .5.5 0 0 1-.5-.5A.5.5 0 0 1 9 0a7.008 7.008 0 0 1 7 7Z"
                                data-name="Path 64"
                            />
                        </svg>
                        <input
                            {...registerChange('newPassword')}
                            type="password"
                            className="grow"
                            placeholder="Mật khẩu mới"
                        />
                    </label>
                    {errorsChange.newPassword && (
                        <span className="w-fit text-red-500 text-sm">
                            {errorsChange.newPassword.message}
                        </span>
                    )}

                    <label className="input input-bordered  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 opacity-70"
                            viewBox="0 -1 16 16"
                        >
                            <path
                                d="M6.5 11h5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1h-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5ZM8 5a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1H8ZM7 7h4v3H7Zm9 0a7.008 7.008 0 0 1-7 7 7.008 7.008 0 0 1-7-7V5.707L.854 6.854A.5.5 0 0 1 .5 7a.5.5 0 0 1-.354-.146.5.5 0 0 1 0-.708l2-2a.518.518 0 0 1 .163-.109.505.505 0 0 1 .382 0 .518.518 0 0 1 .163.109l2 2a.5.5 0 0 1 0 .708A.5.5 0 0 1 4.5 7a.5.5 0 0 1-.354-.146L3 5.707V7a6.006 6.006 0 0 0 6 6 6.006 6.006 0 0 0 6-6 6.006 6.006 0 0 0-6-6 .5.5 0 0 1-.5-.5A.5.5 0 0 1 9 0a7.008 7.008 0 0 1 7 7Z"
                                data-name="Path 64"
                            />
                        </svg>
                        <input
                            {...registerChange('confirmPassword')}
                            type="password"
                            className="grow"
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </label>
                    {errorsChange.confirmPassword && (
                        <span className="text-red-500">{errorsChange.confirmPassword.message}</span>
                    )}

                    <label className="input input-bordered  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 15 15"
                            className="w-6 h-6"
                        >
                            <path
                                stroke="#000"
                                d="M6 5.5h3m-1.5 0V10m3 0V7.5m0 0v-2h1a1 1 0 1 1 0 2h-1Zm-6-1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 2 0Zm-3-6h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z"
                            />
                        </svg>
                        <input
                            className="pl-4 outline-none border-none flex-grow"
                            type="text"
                            placeholder="Mã OTP"
                            {...registerChange('employeeOTP')}
                        />
                    </label>
                    {errorsChange.employeeOTP && (
                        <span className="text-red-500">{errorsChange.employeeOTP.message}</span>
                    )}

                    <div className="flex space-x-2 justify-center pt-5">
                        <button className=" bg-white tracking-wide  text-gray-800 font-bold rounded-full border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md  h-12">
                            Đổi mật khẩu
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSendOTP(e)}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-teal-500 hover:border-teal-600 hover:bg-teal-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Nhận OTP</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path
                                    stroke="CurrentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.5 12H5.42m-.173.797L4.242 15.8c-.55 1.643-.826 2.465-.628 2.971.171.44.54.773.994.9.523.146 1.314-.21 2.894-.92l10.135-4.561c1.543-.695 2.314-1.042 2.553-1.524a1.5 1.5 0 0 0 0-1.33c-.239-.482-1.01-.83-2.553-1.524L7.485 5.243c-1.576-.71-2.364-1.064-2.887-.918a1.5 1.5 0 0 0-.994.897c-.198.505.074 1.325.618 2.966l1.026 3.091c.094.282.14.423.159.567a1.5 1.5 0 0 1 0 .385c-.02.144-.066.285-.16.566Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
