import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordModal, MyToast } from '@/components'
import { authService } from '@/services'
import { jwtDecode } from 'jwt-decode'

export const Login = () => {
    const [account, setAccount] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAccount((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        const authEmployeeDTO = {
            username: account.username,
            password: account.password,
        }

        try {
            const response = await authService.login(authEmployeeDTO)
            const { token, employeeResponse } = response.data.result
            const employeeProfile = {
                ...employeeResponse,
            }
            sessionStorage.setItem('token', JSON.stringify({ token }))
            sessionStorage.setItem('employeeProfile', JSON.stringify({ employeeProfile }))
            MyToast('success', 'Đăng Nhập Thành Công')

            const decodedToken = jwtDecode(token)
            const role = decodedToken.scope

            setTimeout(() => {
                if (role === 'ADMIN') navigate('/admin/trang-chu')
                else navigate('/nhan-vien')
            }, 2000)
        } catch (error) {
            MyToast('error', 'Đăng Nhập Không Thành Công')
        }
    }

    const [isOpenForgetPasswordModal, setIsOpenForgetPasswordModal] = useState(false)

    const handleOpenForgotPasswordModal = () => {
        setIsOpenForgetPasswordModal(true)
    }

    const handleCloseForgotPasswordModal = () => {
        setIsOpenForgetPasswordModal(false)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin(event)
        }
    }

    return (
        <div className="relative py-8 min-h-screen bg-modal bg-cover from-sky-50 to-gray-200">
            <div className="relative container m-auto px-6 md:px-12 xl:px-40">
                <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-xl">
                        <div className="p-6 sm:p-16">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2">
                                    <img src="/images/logo.png" className="h-20 grid-cols-1 "></img>
                                    <img
                                        src="/icon.svg"
                                        loading="lazy"
                                        className="w-10 grid-cols-1 justify-self-end mt-4"
                                    />
                                </div>

                                <h2 className="mb-8 text-2xl text-cyan-900 font-bold text-center">
                                    <br />
                                    Đăng nhập hệ thống
                                </h2>
                            </div>

                            <div className="mt-14 flex flex-col space-y-4">
                                <div
                                    className="flex items-center border-2 h-12 p-4 rounded-2xl mb-4 transition duration-300 
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
                                        className="pl-4 flex-grow outline-none border-none"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Mã nhân viên"
                                        value={account.username}
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>

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
                                        name="password"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        value={account.password}
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>

                                <div className="flex space-x-4 justify-end">
                                    <span
                                        onClick={handleOpenForgotPasswordModal}
                                        className="text-blue-600 text-sm hover:text-blue-700 cursor-pointer"
                                    >
                                        Bạn quên mật khẩu?
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="h-12 px-6 border-2 border-graydark rounded-full transition duration-300 group
                                         hover:border-blue-500 focus:bg-blue-50 "
                                >
                                    <div className="relative flex items-center space-x-4 justify-center">
                                        <span className="block w-max font-semibold  text-gray-700 text-sm transition duration-300 group-hover:text-blue-700 sm:text-base">
                                            Đăng nhập
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-24 space-y-4 text-black text-center sm:-mb-8">
                                <p className="text-xs">© Bản quyền thuộc về T-Vax Company</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal
                visibleForgotPasswordModal={isOpenForgetPasswordModal}
                handleCloseForgotPasswordModal={handleCloseForgotPasswordModal}
            />
        </div>
    )
}
