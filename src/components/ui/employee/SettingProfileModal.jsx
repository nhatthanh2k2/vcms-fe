import React from 'react'
import { Modal } from 'antd'
import { ChangePasswordTab, EmployeeProfileTab, UpdateEmployeeAvatarTab } from '.'

export const SettingProfileModal = ({ handleCloseModal, visibleProfileModal }) => {
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    return (
        <Modal
            title={<div className="text-center font-bold text-xl">Cài đặt hồ sơ cá nhân</div>}
            open={visibleProfileModal}
            onCancel={handleCloseModal}
            onOk={handleCloseModal}
            footer={null}
            width={800}
            style={{
                top: 40,
            }}
        >
            <div role="tablist" className="tabs tabs-lifted ">
                <input
                    type="radio"
                    name="employee_profile_tab"
                    role="tab"
                    className="tab text-nowrap font-semibold"
                    aria-label="Thông tin cá nhân"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <EmployeeProfileTab employee={employee} />
                </div>

                <input
                    type="radio"
                    name="employee_profile_tab"
                    role="tab"
                    className="tab text-nowrap font-semibold"
                    aria-label="Cập nhật ảnh đại diện"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <UpdateEmployeeAvatarTab employee={employee} />
                </div>

                <input
                    type="radio"
                    name="employee_profile_tab"
                    role="tab"
                    className="tab text-nowrap font-semibold"
                    aria-label="Đổi mật khẩu"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <ChangePasswordTab employee={employee} />
                </div>
            </div>
        </Modal>
    )
}
