import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const CustomerHeader = () => {
    const location = useLocation()

    return (
        <header className="w-full h-32 sticky top-0 z-50 bg-white border-b-2 rounded-b-xl shadow-lg font-semibold">
            <div className="flex flex-row items-center justify-center space-x-10 m-5">
                <Link to="/" className="">
                    <img className="h-20" src="/images/logo.png" alt="Logo" />
                </Link>

                <nav className="mx-auto flex flex-row space-x-10 text-xl">
                    <div>
                        <Link
                            to="/trang-chu"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                    after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                    after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                        location.pathname === '/trang-chu' ? 'after:scale-x-100 text-blue-700' : ''
                    }`}
                        >
                            Trang chủ
                        </Link>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <Link
                            to="/gioi-thieu"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                                after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                                after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                                    location.pathname.startsWith('/gioi-thieu')
                                        ? 'after:scale-x-100 text-blue-700'
                                        : ''
                                }`}
                        >
                            Giới thiệu
                        </Link>
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow  text-base mt-1">
                            <li>
                                <Link
                                    to="/gioi-thieu/trung-tam"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Về trung tâm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gioi-thieu/doi-ngu-bac-si"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Đội ngũ bác sĩ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <Link
                            to="/goi-tiem"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                                after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                                after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                                    location.pathname.startsWith('/goi-tiem')
                                        ? 'after:scale-x-100 text-blue-700'
                                        : ''
                                }`}
                        >
                            Gói tiêm
                        </Link>
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-gray-700 text-base mt-1">
                            <li>
                                <Link
                                    to="/goi-tiem/goi-tiem-tre-em"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Gói tiêm trẻ em
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/goi-tiem/goi-tiem-nguoi-lon"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Gói tiêm người lớn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-hover relative">
                        <Link
                            to="/cam-nang"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                    after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                    after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                        location.pathname.startsWith('/cam-nang')
                            ? 'after:scale-x-100 text-blue-700'
                            : ''
                    }`}
                        >
                            Cẩm nang
                        </Link>
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-gray-700 text-base mt-1">
                            <li>
                                <Link
                                    to="/cam-nang/luu-y-truoc-tiem"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Lưu ý trước tiêm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cam-nang/luu-y-sau-tiem"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Lưu ý sau tiêm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cam-nang/thong-tin-vac-xin"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Thông tin vắc xin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cam-nang/tra-cuu-lich-su-tiem"
                                    className="text-black hover:text-black hover:bg-blue-100"
                                >
                                    Tra cứu lịch sử tiêm
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Link
                            to="/trang-chu/dang-ky-lich-tiem"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                    after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                    after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                        location.pathname === '/trang-chu/dang-ky-lich-tiem'
                            ? 'after:scale-x-100 text-blue-700'
                            : ''
                    }`}
                        >
                            Đăng ký lịch tiêm
                        </Link>
                    </div>

                    <div>
                        <Link
                            to="/trang-chu/dat-mua-vac-xin"
                            className={`text-gray-700 relative md:hover:text-blue-700 hover:after:scale-x-100 after:absolute
                    after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-[#10b981]
                    after:scale-x-0 after:origin-left after:transition-transform after:duration-500 ${
                        location.pathname === '/trang-chu/dat-mua-vac-xin'
                            ? 'after:scale-x-100 text-blue-700'
                            : ''
                    }`}
                        >
                            Đặt mua vắc xin
                        </Link>
                    </div>
                </nav>

                <div className="w-80">
                    <div className=" font-bold flex flex-row gap-2 justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon w-10 h-10"
                            viewBox="0 0 1024 1024"
                        >
                            <path
                                fill="#CFD8DC"
                                d="M106.667 810.667v-512h810.666v512C917.333 857.6 878.933 896 832 896H192c-46.933 0-85.333-38.4-85.333-85.333z"
                            />
                            <path
                                fill="#F44336"
                                d="M917.333 213.333v128H106.667v-128C106.667 166.4 145.067 128 192 128h640c46.933 0 85.333 38.4 85.333 85.333z"
                            />
                            <path
                                fill="#B71C1C"
                                d="M640 213.333a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM256 213.333a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                            />
                            <path
                                fill="#B0BEC5"
                                d="M704 64c-23.467 0-42.667 19.2-42.667 42.667v106.666C661.333 236.8 680.533 256 704 256s42.667-19.2 42.667-42.667V106.667C746.667 83.2 727.467 64 704 64zm-384 0c-23.467 0-42.667 19.2-42.667 42.667v106.666C277.333 236.8 296.533 256 320 256s42.667-19.2 42.667-42.667V106.667C362.667 83.2 343.467 64 320 64z"
                            />
                            <path
                                fill="#90A4AE"
                                d="M277.333 426.667h85.334V512h-85.334zm128 0h85.334V512h-85.334zm128 0h85.334V512h-85.334zm128 0h85.334V512h-85.334zm-384 128h85.334V640h-85.334zm128 0h85.334V640h-85.334zm128 0h85.334V640h-85.334zm128 0h85.334V640h-85.334zm-384 128h85.334V768h-85.334zm128 0h85.334V768h-85.334zm128 0h85.334V768h-85.334zm128 0h85.334V768h-85.334z"
                            />
                        </svg>
                        <span className="flex-1">
                            Làm việc : Từ thứ 2 đến chủ nhật. Từ 7h30 đến 17h.
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            id="Layer_1"
                            className="w-10 h-10"
                            fill="#000"
                            viewBox="0 0 120 120"
                        >
                            <g id="SVGRepo_iconCarrier">
                                <style>{'.st1{fill:#6d6}'}</style>
                                <path
                                    d="M69.6 79.5 65.9 82c-5.7 3.9-11.1 6.1-14.3 1.5L33.3 56.8c-3.3-4.8.7-9 6.6-12.8l3.7-2.5-12.5-18.4-5.3 3.6c-9.4 6.4-11.8 19-5.4 28.3l27.9 40.9c6.4 9.4 19 11.8 28.3 5.4l5.3-3.6-12.3-18.2z"
                                    style={{
                                        fill: '#6cef6f',
                                    }}
                                />
                                <path
                                    d="M45.4 38.9 34.3 22.8c-1.8-2.7-5.5-3.4-8.2-1.5-2.7 1.8-3.4 5.5-1.5 8.2l11 16.1c1.8 2.7 5.5 3.4 8.2 1.5 2.7-1.9 3.4-5.5 1.6-8.2zM83.5 94.9 72.4 78.7c-1.8-2.7-5.5-3.4-8.2-1.5-2.7 1.8-3.4 5.5-1.5 8.2l11.1 16.1c1.8 2.7 5.5 3.4 8.2 1.5 2.7-1.8 3.4-5.4 1.5-8.1z"
                                    className="st1"
                                />
                                <path
                                    d="M102.8 44C101 56.4 90 65.8 77.5 65.5c-3.5-.1-6.9-.9-9.9-2.2-1.6-.7-8.1 1.8-11.9 3.3-1 .4-2-.6-1.5-1.6 1.6-3.3 4.1-8.8 3.3-9.8-3.8-5.3-5.5-12-4.4-19.1 2.1-12.4 13.5-21.5 26-20.8 14.9.7 25.8 14 23.7 28.7z"
                                    style={{
                                        fill: '#3db2ff',
                                    }}
                                />
                                <path
                                    d="M78.5 47.9H76c-.8 0-1.4-.7-1.4-1.4 0-1.7.3-3.1.8-4.2.6-1.1 1.7-2.3 3.4-3.7 1.7-1.4 2.7-2.3 3-2.7.5-.7.8-1.4.8-2.3 0-1.1-.5-2.1-1.3-2.9-.9-.8-2.1-1.2-3.7-1.2-1.5 0-2.7.4-3.7 1.2-.6.5-1 1.1-1.4 1.9-.5 1.1-1.6 1.8-2.8 1.7-1.9-.3-3-2.3-2.1-4 .5-.9 1.2-1.8 2.1-2.6 2-1.7 4.5-2.5 7.6-2.5 3.3 0 5.9.8 7.9 2.6 2 1.7 2.9 3.8 2.9 6 0 1.3-.4 2.4-1 3.6-.7 1.1-2.3 2.7-4.6 4.6-1.2 1-2 1.8-2.3 2.4-.2.5-.4 1.1-.4 2.1 0 .8-.5 1.4-1.3 1.4zm-3.8 5v-.3c0-1.5 1.2-2.7 2.7-2.7h.3c1.5 0 2.7 1.2 2.7 2.7v.3c0 1.5-1.2 2.7-2.7 2.7h-.3c-1.5 0-2.7-1.2-2.7-2.7z"
                                    style={{
                                        fill: '#fff',
                                    }}
                                />
                            </g>
                        </svg>
                        <span className="inline text-lg text-orange-400 font-bold">
                            Hotline: 039 6868 999
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
