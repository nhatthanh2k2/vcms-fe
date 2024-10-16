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
                    <div className="m-3">
                        <button
                            onClick={handleViewOldImage}
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button"
                        >
                            <span className="mr-2">Xem ảnh cũ</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m14.264 15.938-1.668-1.655c-.805-.798-1.208-1.197-1.67-1.343a2 2 0 0 0-1.246.014c-.458.155-.852.563-1.64 1.379L4.045 18.28m10.22-2.343.341-.338c.806-.8 1.21-1.199 1.671-1.345a2 2 0 0 1 1.248.015c.458.156.852.565 1.64 1.382l.836.842m-5.736-.555 4.011 4.018m0 0c-.357.044-.82.044-1.475.044H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874 1.845 1.845 0 0 1-.174-.628m14.231 1.676a1.85 1.85 0 0 0 .633-.174 2 2 0 0 0 .874-.874C20 18.48 20 17.92 20 16.8v-.307M4.044 18.28C4 17.922 4 17.457 4 16.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 5.52 20 6.08 20 7.2v9.293M17 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="m-3">
                        <button className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center hover-button">
                            <span className="mr-2">Cập nhật ảnh</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m14.264 15.938-1.668-1.655c-.805-.798-1.208-1.197-1.67-1.343a2 2 0 0 0-1.246.014c-.458.156-.852.563-1.64 1.379L4.045 18.28m10.22-2.342.341-.339c.806-.8 1.21-1.199 1.671-1.345a2 2 0 0 1 1.248.015c.458.156.852.565 1.64 1.383l.836.842m-5.736-.556 4.011 4.019m0 0c-.357.043-.82.043-1.475.043H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874 1.845 1.845 0 0 1-.174-.628m14.231 1.677a1.85 1.85 0 0 0 .633-.175 2 2 0 0 0 .874-.874C20 18.48 20 17.92 20 16.8v-.306M12.5 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 .658 0 1.122.044 1.48M20 11.5v4.994M14 10l2.025-.405c.177-.035.265-.053.347-.085a1 1 0 0 0 .207-.11c.072-.051.136-.115.264-.242L21 5a1.414 1.414 0 0 0-2-2l-4.158 4.158c-.127.127-.19.19-.241.263a1.002 1.002 0 0 0-.11.207c-.033.082-.05.17-.086.347L14 10Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
