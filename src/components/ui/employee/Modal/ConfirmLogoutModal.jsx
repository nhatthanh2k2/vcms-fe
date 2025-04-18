import { Modal } from 'antd'
import React from 'react'
import { MyToast } from '../../common'
import { authService } from '@/services'
import { useNavigate } from 'react-router-dom'

export const ConfirmLogoutModal = ({
    visibleConfirmLogoutModal,
    handleCloseConfirmLogoutModal,
}) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const token = JSON.parse(sessionStorage.getItem('token'))

        try {
            const response = await authService.logout(token)
            if (response.status === 200) {
                MyToast('success', 'Đăng xuất thành công')
                sessionStorage.clear()
                navigate('/dang-nhap')
            }
        } catch (error) {
            console.log(error)
            MyToast('error', 'Xảy ra lỗi khi đăng xuất')
        }
    }

    return (
        <Modal
            open={visibleConfirmLogoutModal}
            onCancel={handleCloseConfirmLogoutModal}
            title={<div className="text-center font-bold text-2xl">Xác nhận đăng xuất?</div>}
            footer={[
                <div key="footer-buttons" className="flex justify-center space-x-2">
                    <div className="m-3">
                        <button
                            onClick={handleLogout}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Xác nhận</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 5 8 15l-5-4"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="m-3">
                        <button
                            onClick={handleCloseConfirmLogoutModal}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Hủy bỏ</span>
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
                </div>,
            ]}
        />
    )
}
