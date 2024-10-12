import React, { useRef, useState } from 'react'

export const UpdateEmployeeAvatarTab = ({ employee }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)
    const originalAvatar =
        import.meta.env.VITE_VCMS_IMAGE + '/avatars/' + employee?.employeeProfile.employeeAvatar

    const handleChoseFile = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleViewOldImage = () => {
        setSelectedImage(null)
    }

    return (
        <div className="flex flex-row">
            <div>
                <img
                    src={selectedImage || originalAvatar}
                    alt="Avatar"
                    className="w-72 h-72 rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-center mx-auto">
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                        <div className="h-full w-full text-center flex flex-col justify-center items-center">
                            <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                <img
                                    className="has-mask h-36 object-center"
                                    src="/images/update-avatar.png"
                                    alt="freepik image"
                                />
                            </div>
                            <p className="pointer-none text-gray-500 ">
                                <span className="text-sm">Kéo và thả</span> tệp vào đây <br />
                                <a
                                    href="#"
                                    onClick={handleChoseFile}
                                    className="text-blue-600 hover:underline"
                                >
                                    chọn một tệp{' '}
                                </a>
                                từ máy tính của bạn
                            </p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="flex space-x-2 mt-2 justify-center">
                    <button
                        onClick={handleViewOldImage}
                        className="bg-gray-300 text-black rounded px-4 py-2"
                    >
                        Xem ảnh cũ
                    </button>
                    <button className="bg-blue-600 text-white rounded px-4 py-2">
                        Cập nhật ảnh
                    </button>
                </div>
            </div>
        </div>
    )
}
