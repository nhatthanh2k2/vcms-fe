import React, { useState } from 'react'
import { DatePicker, Modal } from 'antd'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MyToast } from '../common'
import { employeeService } from '@/services'

dayjs.extend(localeData)
dayjs.extend(weekday)

const forgotPasswordSchema = z
    .object({
        employeeUsername: z.string().min(1, { message: 'Tên đăng nhập không được trống.' }),
        employeeEmail: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
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

export const ForgotPasswordModal = ({
    visibleForgotPasswordModal,
    handleCloseForgotPasswordModal,
}) => {
    const [selectedDate, setSelectedDate] = useState(dayjs('2023-10-08'))

    const handleDateChange = (date) => {
        if (date && dayjs(date).isValid()) {
            setSelectedDate(date)
        } else {
            console.log('Ngày không hợp lệ')
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            employeeUsername: '',
            employeeEmail: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data) => {
        const resetData = {
            employeeUsername: data.employeeUsername,
            employeeEmail: data.employeeEmail,
            newPassword: data.newPassword,
        }
        try {
            const response = await employeeService.resetPassword(resetData)
            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Làm mới mật khẩu thành công')
                    reset()
                } else {
                    MyToast('error', 'Xảy ra lỗi trong quá trình làm mới mật khẩu')
                }
            } else MyToast('error', 'Làm mới mật khẩu không thành công')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast('error', 'Tài khoản không tồn tại')
                }
            }
        }
    }

    return (
        <Modal
            title={
                <div className="text-center text-2xl text-blue-500 font-bold">Quên mật khẩu?</div>
            }
            open={visibleForgotPasswordModal}
            footer={null}
            width={700}
            onCancel={handleCloseForgotPasswordModal}
        >
            <div className=" flex flex-row justify-center space-x-5 m-5">
                <div className="flex items-center bg-yellow-50 rounded-xl">
                    <img src="/images/panda-fw.png" alt="Bạn quên mật khẩu" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <div
                            className="flex items-center border-2 h-12 p-4 rounded-2xl  transition duration-300
                                     hover:border-blue-500 focus:bg-blue-50"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <circle
                                        cx="12"
                                        cy="9"
                                        r="3"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                    ></circle>
                                    <path
                                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></path>
                                    <path
                                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></path>
                                </g>
                            </svg>

                            <input
                                {...register('employeeUsername')}
                                className="pl-4 flex-grow outline-none border-none "
                                type="text"
                                placeholder="Tên đăng nhập"
                            />
                        </div>
                        {errors.employeeUsername && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.employeeUsername.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div
                            className="flex items-center border-2 h-12 p-4 rounded-2xl  transition duration-300
                                     hover:border-blue-500 focus:bg-blue-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                viewBox="0 0 512 512"
                                className="w-6 h-6"
                            >
                                <path
                                    d="M510.678 112.275a70.823 70.823 0 0 0-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557 0-37.395 7.996-50.21 20.814-1.715 1.715-3.301 3.43-4.823 5.345-7.203 8.788-12.358 19.428-14.602 31.054A68.69 68.69 0 0 0 0 126.087V385.92c0 9.968 2.114 19.55 5.884 28.203 3.497 8.26 8.653 15.734 14.926 22.001a77.4 77.4 0 0 0 4.892 4.494 70.957 70.957 0 0 0 45.319 16.32h369.958c17.18 0 33.108-6.145 45.323-16.384 1.718-1.386 3.305-2.844 4.891-4.43 6.27-6.267 11.425-13.741 14.994-22.001v-.064c3.769-8.653 5.812-18.171 5.812-28.138V126.087a72.986 72.986 0 0 0-1.321-13.812zM46.509 101.571c6.345-6.338 14.866-10.175 24.512-10.175h369.958c9.646 0 18.242 3.837 24.512 10.175a34.402 34.402 0 0 1 3.112 3.637L274.696 274.203c-5.348 4.687-11.954 7.002-18.696 7.002-6.674 0-13.276-2.315-18.695-7.002L43.472 105.136c.858-1.25 1.915-2.436 3.037-3.565zM36.334 385.92V142.735L176.658 265.15 36.405 387.435c-.071-.464-.071-.986-.071-1.515zm404.645 34.677H71.021c-6.281 0-12.158-1.651-17.174-4.552l147.978-128.959 13.815 12.018c11.561 10.046 26.028 15.134 40.36 15.134a61.64 61.64 0 0 0 40.432-15.134l13.808-12.018 147.92 128.959c-5.023 2.901-10.9 4.552-17.181 4.552zm34.687-34.677c0 .529 0 1.051-.068 1.515L335.346 265.221 475.666 142.8v243.12z"
                                    style={{
                                        fill: '#000',
                                    }}
                                />
                            </svg>
                            <input
                                {...register('employeeEmail')}
                                className="pl-4 flex-grow outline-none border-none"
                                type="text"
                                placeholder="Email nhân viên"
                            />
                        </div>
                        {errors.employeeEmail && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.employeeEmail.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div
                            className="flex items-center border-2  h-12 p-4 rounded-2xl transition duration-300
                                     hover:border-blue-500 focus:bg-blue-50"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                        d="M21.0667 5C21.6586 5.95805 22 7.08604 22 8.29344C22 11.7692 19.1708 14.5869 15.6807 14.5869C15.0439 14.5869 13.5939 14.4405 12.8885 13.8551L12.0067 14.7333C11.272 15.465 11.8598 15.465 12.1537 16.0505C12.1537 16.0505 12.8885 17.075 12.1537 18.0995C11.7128 18.6849 10.4783 19.5045 9.06754 18.0995L8.77362 18.3922C8.77362 18.3922 9.65538 19.4167 8.92058 20.4412C8.4797 21.0267 7.30403 21.6121 6.27531 20.5876C6.22633 20.6364 5.952 20.9096 5.2466 21.6121C4.54119 22.3146 3.67905 21.9048 3.33616 21.6121L2.45441 20.7339C1.63143 19.9143 2.1115 19.0264 2.45441 18.6849L10.0963 11.0743C10.0963 11.0743 9.3615 9.90338 9.3615 8.29344C9.3615 4.81767 12.1907 2 15.6807 2C16.4995 2 17.282 2.15509 18 2.43738"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{' '}
                                    <path
                                        d="M17.8851 8.29353C17.8851 9.50601 16.8982 10.4889 15.6807 10.4889C14.4633 10.4889 13.4763 9.50601 13.4763 8.29353C13.4763 7.08105 14.4633 6.09814 15.6807 6.09814C16.8982 6.09814 17.8851 7.08105 17.8851 8.29353Z"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                    ></path>{' '}
                                </g>
                            </svg>
                            <input
                                {...register('newPassword')}
                                className="pl-4 outline-none border-none flex-grow"
                                type="password"
                                placeholder="Mật khẩu mới"
                            />
                        </div>
                        {errors.newPassword && (
                            <span className="w-fit text-red-500 text-sm">
                                {errors.newPassword.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div
                            className="flex items-center border-2  h-12 p-4 rounded-2xl transition duration-300
                                     hover:border-blue-500 focus:bg-blue-50"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                        d="M21.0667 5C21.6586 5.95805 22 7.08604 22 8.29344C22 11.7692 19.1708 14.5869 15.6807 14.5869C15.0439 14.5869 13.5939 14.4405 12.8885 13.8551L12.0067 14.7333C11.272 15.465 11.8598 15.465 12.1537 16.0505C12.1537 16.0505 12.8885 17.075 12.1537 18.0995C11.7128 18.6849 10.4783 19.5045 9.06754 18.0995L8.77362 18.3922C8.77362 18.3922 9.65538 19.4167 8.92058 20.4412C8.4797 21.0267 7.30403 21.6121 6.27531 20.5876C6.22633 20.6364 5.952 20.9096 5.2466 21.6121C4.54119 22.3146 3.67905 21.9048 3.33616 21.6121L2.45441 20.7339C1.63143 19.9143 2.1115 19.0264 2.45441 18.6849L10.0963 11.0743C10.0963 11.0743 9.3615 9.90338 9.3615 8.29344C9.3615 4.81767 12.1907 2 15.6807 2C16.4995 2 17.282 2.15509 18 2.43738"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{' '}
                                    <path
                                        d="M17.8851 8.29353C17.8851 9.50601 16.8982 10.4889 15.6807 10.4889C14.4633 10.4889 13.4763 9.50601 13.4763 8.29353C13.4763 7.08105 14.4633 6.09814 15.6807 6.09814C16.8982 6.09814 17.8851 7.08105 17.8851 8.29353Z"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                    ></path>{' '}
                                </g>
                            </svg>
                            <input
                                className="pl-4 outline-none border-none flex-grow"
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                {...register('confirmPassword')}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red-500">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-gray-800 font-bold rounded border-b-2 border-pink-500 hover:border-pink-600 hover:bg-pink-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Làm mới mật khẩu</span>
                            <svg
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 52 52"
                                enableBackground="new 0 0 52 52"
                                xmlSpace="preserve"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path d="M42,23H10c-2.2,0-4,1.8-4,4v19c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V27C46,24.8,44.2,23,42,23z M31,44.5 c-1.5,1-3.2,1.5-5,1.5c-0.6,0-1.2-0.1-1.8-0.2c-2.4-0.5-4.4-1.8-5.7-3.8l3.3-2.2c0.7,1.1,1.9,1.9,3.2,2.1c1.3,0.3,2.6,0,3.8-0.8 c2.3-1.5,2.9-4.7,1.4-6.9c-0.7-1.1-1.9-1.9-3.2-2.1c-1.3-0.3-2.6,0-3.8,0.8c-0.3,0.2-0.5,0.4-0.7,0.6L26,37h-9v-9l2.6,2.6 c0.4-0.4,0.9-0.8,1.3-1.1c2-1.3,4.4-1.8,6.8-1.4c2.4,0.5,4.4,1.8,5.7,3.8C36.2,36.1,35.1,41.7,31,44.5z" />
                                        <path d="M10,18.1v0.4C10,18.4,10,18.3,10,18.1C10,18.1,10,18.1,10,18.1z" />
                                        <path d="M11,19h4c0.6,0,1-0.3,1-0.9V18c0-5.7,4.9-10.4,10.7-10C32,8.4,36,13,36,18.4v-0.3c0,0.6,0.4,0.9,1,0.9h4 c0.6,0,1-0.3,1-0.9V18c0-9.1-7.6-16.4-16.8-16c-8.5,0.4-15,7.6-15.2,16.1C10.1,18.6,10.5,19,11,19z" />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
