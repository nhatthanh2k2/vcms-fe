import React, { useRef, useState } from 'react'

export const UpdateEmployeeAvatarTab = () => {
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    return (
        <div className="flex flex-row">
            <div>
                <img
                    src={
                        import.meta.env.VITE_VCMS_IMAGE +
                        '/avatars/' +
                        employee?.employeeProfile.employeeAvatar
                    }
                    alt=""
                />
            </div>
        </div>
    )
}
