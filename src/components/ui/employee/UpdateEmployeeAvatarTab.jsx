import React, { useRef, useState } from 'react'

export const UpdateEmployeeAvatarTab = () => {
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))
    const upLoadRef = useRef()
    const handleButtonClick = () => {
        upLoadRef.current.click()
    }
    const [avatar, setAvatar] = useState(null)
    const [avatarURL, setAvatarURL] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setAvatar(file)
        const url = URL.createObjectURL(file)
        setAvatarURL(url)
    }
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
