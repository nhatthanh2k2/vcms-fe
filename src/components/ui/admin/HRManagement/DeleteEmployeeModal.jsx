import { employeeService } from '@/services'
import React, { useRef } from 'react'
import { MyToast } from '../../common'

export const DeleteEmployeeModal = ({ employeeInfo, getEmployeeList }) => {
    const modalRef = useRef(null)

    const handleDeleteEmployee = async () => {
        try {
            const response = await employeeService.deleteEmployee(employeeInfo.employeeId)
            if (response.data.code === 1000) {
                MyToast('success', 'Xóa nhân viên thành công.')
                getEmployeeList()
                modalRef.current.close()
            } else MyToast('error', 'Xảy ra lỗi khi xóa nhân viên')
        } catch (error) {
            if (error.response)
                if (error.response.status === 400) MyToast('warn', 'Không thể xóa nhân viên.')
        }
    }

    return (
        <dialog ref={modalRef} id="delete_employee_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Xác nhận xóa nhân viên!</h3>
                <p className="py-4">
                    Bạn xác nhận xóa nhân viên {employeeInfo?.employeeFullName} ?
                </p>
                <div className="modal-action">
                    <button className="btn" onClick={() => handleDeleteEmployee()}>
                        Xác nhận
                    </button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Hủy bỏ</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
