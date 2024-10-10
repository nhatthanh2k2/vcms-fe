import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
                <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                    <div className="w-full md:w-1/2">
                        <div className="mb-10 lg:mb-20">
                            <img
                                src="/images/logo.png"
                                className="w-40 h-40 object-contain"
                                alt=""
                            />
                        </div>
                        <div className="mb-10 md:mb-20 text-gray-600 font-light">
                            <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
                                Bạn bị lạc rồi!
                            </h1>
                            <p className="text-black font-semibold">
                                Trang bạn đang tìm kiếm không có sẵn.
                            </p>
                            <p className="text-black font-semibold">
                                Hãy thử tìm kiếm lại hoặc sử dụng nút "Về Trang Chủ" bên dưới.
                            </p>
                        </div>
                        <div className="mb-20 md:mb-0">
                            <button
                                onClick={() => navigate('/')}
                                className="text-lg font-semibold bg-white outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-yellow-600"
                            >
                                Về Trang Chủ
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center">
                        <img src="/images/404.jpg" alt="" />
                    </div>
                </div>
                <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform" />
                <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform" />
            </div>
        </div>
    )
}
