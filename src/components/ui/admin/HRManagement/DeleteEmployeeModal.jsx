import { employeeService } from '@/services'
import React from 'react'
import { MyToast } from '../../common'
import { Modal } from 'antd'
import { convertQualification } from '@/utils'

export const DeleteEmployeeModal = ({
    employeeInfo,
    getEmployeeList,
    visibleDeleteEmployeeModal,
    handleCloseDeleteEmployeeModal,
}) => {
    const handleDeleteEmployee = async () => {
        try {
            const response = await employeeService.deleteEmployee(employeeInfo.employeeId)
            if (response.data.code === 1000) {
                MyToast('success', 'Xóa nhân viên thành công.')
                getEmployeeList()
                handleCloseDeleteEmployeeModal()
            } else MyToast('error', 'Xảy ra lỗi khi xóa nhân viên')
        } catch (error) {
            if (error.response)
                if (error.response.status === 400) MyToast('warn', 'Không thể xóa nhân viên.')
        }
    }

    return (
        <Modal
            title={<div className="text-center text-2xl  font-bold">Xác nhận xóa nhân viên</div>}
            open={visibleDeleteEmployeeModal}
            onCancel={handleCloseDeleteEmployeeModal}
            footer={[
                <div className="flex justify-end space-x-2">
                    <div className="m-3">
                        <button
                            onClick={handleDeleteEmployee}
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
                            onClick={handleCloseDeleteEmployeeModal}
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
        >
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-1">
                    <span className="font-semibold"> Họ và tên: </span>
                    <span>{employeeInfo?.employeeFullName}</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-semibold">Trình độ:</span>
                    <span>{convertQualification(employeeInfo?.employeeQualification)}</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-semibold">Chức vụ: </span>
                    <span>{employeeInfo?.employeePosition}</span>
                </div>
            </div>
        </Modal>
    )
}
