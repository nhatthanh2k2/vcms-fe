import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="border-t-2 mt-auto">
            <div>
                <div className="flex flex-row justify-center items-center space-x-10 space-y-10">
                    <div className="">
                        <img className=" w-56" src="/images/logo.png"></img>
                    </div>
                    <div className="flex flex-row gap-20">
                        <div className="space-y-3 ">
                            <h3 className="tracking-wide uppercase  text-black font-semibold">
                                Công ty
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="/#">
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="/#">
                                        Đội ngũ bác sĩ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="tracking-wide uppercase  text-black font-semibold">
                                Dịch vụ
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="/#">
                                        Gói tiêm người lớn
                                    </a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="/#">
                                        Gói tiêm trẻ em
                                    </a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="/#">
                                        Tư vấn{' '}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="tracking-wide uppercase  text-black font-semibold">
                                Cẩm nang
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        rel="noopener noreferrer"
                                        href="/luu-y-truoc-khi-tiem"
                                    >
                                        Lưu ý trước khi tiêm
                                    </a>
                                </li>
                                <li>
                                    <a
                                        rel="noopener noreferrer"
                                        href="/luu-y-sau-khi-tiem"
                                    >
                                        Lưu ý sau khi tiêm
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3 ">
                            <h3 className="tracking-wide uppercase  text-black font-semibold">
                                Theo dõi chúng tôi
                            </h3>

                            <div className="flex flex-row gap-2">
                                <Link to={'/'}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12"
                                        fill="none"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle
                                            cx={16}
                                            cy={16}
                                            r={14}
                                            fill="url(#a)"
                                        />
                                        <path
                                            fill="#fff"
                                            d="m21.214 20.282.622-3.952h-3.89v-2.563c0-1.081.542-2.136 2.284-2.136H22V8.267S20.395 8 18.86 8c-3.205 0-5.298 1.893-5.298 5.318v3.012H10v3.952h3.562v9.552a14.468 14.468 0 0 0 4.383 0v-9.552h3.269Z"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="a"
                                                x1={16}
                                                x2={16}
                                                y1={2}
                                                y2={29.917}
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#18ACFE" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#0163E0"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </Link>

                                <Link to="/">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12"
                                        preserveAspectRatio="xMidYMid"
                                        viewBox="0 -38 256 256"
                                    >
                                        <path
                                            fill="red"
                                            d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
                                        />
                                        <path
                                            fill="#FFF"
                                            d="m102.42 128.06 66.329-38.418-66.328-38.418z"
                                        />
                                    </svg>
                                </Link>

                                <Link to={'/'}>
                                    <svg
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        ></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {' '}
                                            <rect
                                                x="2"
                                                y="2"
                                                width="28"
                                                height="28"
                                                rx="6"
                                                fill="url(#paint0_radial_87_7153)"
                                            ></rect>{' '}
                                            <rect
                                                x="2"
                                                y="2"
                                                width="28"
                                                height="28"
                                                rx="6"
                                                fill="url(#paint1_radial_87_7153)"
                                            ></rect>{' '}
                                            <rect
                                                x="2"
                                                y="2"
                                                width="28"
                                                height="28"
                                                rx="6"
                                                fill="url(#paint2_radial_87_7153)"
                                            ></rect>{' '}
                                            <path
                                                d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                                                fill="white"
                                            ></path>{' '}
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                                                fill="white"
                                            ></path>{' '}
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                                                fill="white"
                                            ></path>{' '}
                                            <defs>
                                                {' '}
                                                <radialGradient
                                                    id="paint0_radial_87_7153"
                                                    cx="0"
                                                    cy="0"
                                                    r="1"
                                                    gradientUnits="userSpaceOnUse"
                                                    gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                                                >
                                                    {' '}
                                                    <stop stopColor="#B13589"></stop>{' '}
                                                    <stop
                                                        offset="0.79309"
                                                        stopColor="#C62F94"
                                                    ></stop>{' '}
                                                    <stop
                                                        offset="1"
                                                        stopColor="#8A3AC8"
                                                    ></stop>{' '}
                                                </radialGradient>{' '}
                                                <radialGradient
                                                    id="paint1_radial_87_7153"
                                                    cx="0"
                                                    cy="0"
                                                    r="1"
                                                    gradientUnits="userSpaceOnUse"
                                                    gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                                                >
                                                    {' '}
                                                    <stop stopColor="#E0E8B7"></stop>{' '}
                                                    <stop
                                                        offset="0.444662"
                                                        stopColor="#FB8A2E"
                                                    ></stop>{' '}
                                                    <stop
                                                        offset="0.71474"
                                                        stopColor="#E2425C"
                                                    ></stop>{' '}
                                                    <stop
                                                        offset="1"
                                                        stopColor="#E2425C"
                                                        stopOpacity="0"
                                                    ></stop>{' '}
                                                </radialGradient>{' '}
                                                <radialGradient
                                                    id="paint2_radial_87_7153"
                                                    cx="0"
                                                    cy="0"
                                                    r="1"
                                                    gradientUnits="userSpaceOnUse"
                                                    gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                                                >
                                                    {' '}
                                                    <stop
                                                        offset="0.156701"
                                                        stopColor="#406ADC"
                                                    ></stop>{' '}
                                                    <stop
                                                        offset="0.467799"
                                                        stopColor="#6A45BE"
                                                    ></stop>{' '}
                                                    <stop
                                                        offset="1"
                                                        stopColor="#6A45BE"
                                                        stopOpacity="0"
                                                    ></stop>{' '}
                                                </radialGradient>{' '}
                                            </defs>{' '}
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" border border-b-2 border-gray mx-40"></div>

                <div className="py-6 text-sm text-center dark:text-gray-600 font-bold">
                    © Bản quyền thuộc về T-Vax Company 2024.
                </div>
            </div>
        </footer>
    )
}
