import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: 'Mật khẩu hiện tại không được trống' }),
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

export const ChangePasswordTab = () => {
    const {
        register: registerChange,
        handleSubmit: handleSubmitChange,
        formState: { errors: errorsChange },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmitChange = (data) => {
        console.log(data)
    }

    return (
        <div className="flex flex-row justify-center gap-5 items-center ">
            <div>
                <img src="/images/change-password.jpg" />
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmitChange(onSubmitChange)}>
                <label className="input input-bordered  flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 opacity-70"
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
                        className="h-8 w-8 opacity-70"
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
                        className="h-8 w-8 opacity-70"
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

                <div className="flex justify-center">
                    <button className=" bg-white tracking-wide  text-gray-800 font-bold rounded-full border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md  h-12">
                        Đổi mật khẩu
                    </button>
                </div>
            </form>
        </div>
    )
}
