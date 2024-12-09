import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SidebarLinkGroup } from './Sidebar'
import { ChangePasswordModal, UpdateEmployeeProfileModal } from '../employee'

export const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation()
    const { pathname } = location

    const trigger = useRef(null)
    const sidebar = useRef(null)

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    )

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebarOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded')
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded')
        }
    }, [sidebarExpanded])

    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState(false)
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    const handleOpenChangePasswordModal = () => {
        setIsOpenChangePasswordModal(true)
    }

    const handleCloseChangePasswordModal = () => {
        setIsOpenChangePasswordModal(false)
    }

    const [isOpenUpdateEmployeeProfileModal, setIsOpenUpdateEmployeeProfileModal] = useState(false)

    const handleOpenUpdateEmployeeProfileModal = () => {
        setIsOpenUpdateEmployeeProfileModal(true)
    }

    const handleCloseUpdateEmployeeProfileModal = () => {
        setIsOpenUpdateEmployeeProfileModal(false)
    }

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-30 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-4">
                <img className="w-50" src="/images/logo2.png"></img>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden "
                >
                    <svg
                        className="fill-current w-4 h-4"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/admin/trang-chu"
                                    //className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 "
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('trang-chu') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        className="fill-current w-5 h-5"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                                            fill=""
                                        />
                                        <path
                                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                                            fill=""
                                        />
                                        <path
                                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                                            fill=""
                                        />
                                        <path
                                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                                            fill=""
                                        />
                                    </svg>
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/admin/quan-ly/nhan-su"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('nhan-su') && 'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="#DEE4EE"
                                        stroke="#DEE4EE"
                                        viewBox="0 0 36 36"
                                    >
                                        <title>{'employee_line'}</title>
                                        <g data-name="Layer 3">
                                            <path d="M16.43 16.69a7 7 0 1 1 7-7 7 7 0 0 1-7 7Zm0-11.92a5 5 0 1 0 5 5 5 5 0 0 0-5-5ZM22 17.9a25.41 25.41 0 0 0-16.12 1.67 4.06 4.06 0 0 0-2.31 3.68v5.95a1 1 0 1 0 2 0v-5.95a2 2 0 0 1 1.16-1.86 22.91 22.91 0 0 1 9.7-2.11 23.58 23.58 0 0 1 5.57.66ZM22.14 27.41h6.14v1.4h-6.14z" />
                                            <path d="M33.17 21.47H28v2h4.17v8.37H18v-8.37h6.3v.42a1 1 0 0 0 2 0V20a1 1 0 0 0-2 0v1.47H17a1 1 0 0 0-1 1v10.37a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.47a1 1 0 0 0-1-1Z" />
                                        </g>
                                    </svg>
                                    Nhân sự
                                </NavLink>
                            </li>

                            <SidebarLinkGroup
                                activeCondition={
                                    pathname.includes('vac-xin-le') ||
                                    pathname.includes('goi-vac-xin')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === 'admin/quan-ly/vac-xin' ||
                                                        pathname === 'admin/quan-ly/goi-vac-xin' ||
                                                        pathname.includes('vac-xin-le') ||
                                                        pathname.includes('goi-vac-xin')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g fill="#DEE4EE">
                                                        <path d="M12 11a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1Z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2v2.382l-2.342 1.17A3 3 0 0 0 4 12.237V20a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7.764a3 3 0 0 0-1.658-2.683L16 8.382V6a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H8Zm6 5h-4v2.382a2 2 0 0 1-1.106 1.789l-2.341 1.17a1 1 0 0 0-.553.895V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7.764a1 1 0 0 0-.553-.894l-2.341-1.171A2 2 0 0 1 14 8.382V6ZM8 4h8V3H8v1Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </g>
                                                </svg>
                                                Vắc xin
                                                <svg
                                                    className={` w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>

                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    !open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/quan-ly/vac-xin-le/danh-muc"
                                                            className={({ isActive }) => {
                                                                const baseClass =
                                                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white'
                                                                const activeClass =
                                                                    isActive ||
                                                                    pathname.includes('vac-xin-le')
                                                                        ? '!text-white'
                                                                        : ''

                                                                return `${baseClass} ${activeClass}`
                                                            }}
                                                        >
                                                            Vắc xin lẻ
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/quan-ly/goi-vac-xin/danh-muc"
                                                            className={({ isActive }) => {
                                                                const baseClass =
                                                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white'
                                                                const activeClass =
                                                                    isActive ||
                                                                    pathname.includes('goi-vac-xin')
                                                                        ? '!text-white'
                                                                        : ''

                                                                return `${baseClass} ${activeClass}`
                                                            }}
                                                        >
                                                            Gói vắc xin
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>

                            <li>
                                <NavLink
                                    to="/admin/quan-ly/lo-vac-xin/danh-muc"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('lo-vac-xin') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        className="w-5 h-5"
                                        fill="#DEE4EE"
                                        stroke="#DEE4EE"
                                        baseProfile="tiny"
                                        viewBox="0 0 256 219.3"
                                    >
                                        <path d="M118.8 209.6h-59v-59h22.7v18.8H96v-18.8h22.7v59zm77.1 0h-59v-59h22.7v18.8h13.5v-18.8h22.7v59zm-38.1-77.1h-59v-59h22.7v18.8H135V73.5h22.7v59zm88.8-53.6-16.1-7.5v139.9h-18.2V62.6l-84.5-39.9-84.3 39.9v148.5H25.3V71.3L9.2 78.9 1.4 62.4 127.8 2.7l126.7 59.6-7.9 16.6z" />
                                    </svg>
                                    Lô vắc xin
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/admin/quan-ly/bang-gia-vac-xin"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('bang-gia-vac-xin') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        fill="#DEE4EE"
                                        stroke="#DEE4EE"
                                        strokeWidth={1.2}
                                        viewBox="0 0 59.998 59.998"
                                        className="w-5 h-5"
                                    >
                                        <path d="M59.206.293a.999.999 0 0 0-1.414 0L54.085 4H30.802L1.532 33.511c-.666.666-1.033 1.553-1.033 2.495s.367 1.829 1.033 2.495l20.466 20.466a3.51 3.51 0 0 0 2.491 1.031 3.54 3.54 0 0 0 2.509-1.041l28.501-29.271V5.414l3.707-3.707a.999.999 0 0 0 0-1.414zm-5.707 28.581L25.574 57.553a1.53 1.53 0 0 1-2.162 0L2.946 37.087a1.532 1.532 0 0 1 .003-2.165L31.636 6h20.449l-4.833 4.833A4.969 4.969 0 0 0 44.499 10c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5a4.969 4.969 0 0 0-.833-2.753l4.833-4.833v21.46zm-6-13.874c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3c.462 0 .894.114 1.285.301l-1.992 1.992a.999.999 0 1 0 1.414 1.414l1.992-1.992c.188.391.301.823.301 1.285z" />
                                        <path d="M42.246 31.281 31.64 41.888a.999.999 0 1 0 1.414 1.414L43.66 32.695a.999.999 0 1 0-1.414-1.414zM45.779 27.74a1.012 1.012 0 0 0 0 1.42c.189.189.449.29.71.29.26 0 .52-.101.699-.29a.985.985 0 0 0 0-1.42c-.37-.37-1.029-.37-1.409 0zM37.296 19.26a.999.999 0 1 0-1.414-1.414L25.275 28.453a.999.999 0 1 0 1.414 1.414L37.296 19.26zM33.761 31.281a.997.997 0 0 0 1.414 0l7.071-7.071a.999.999 0 1 0-1.414-1.414l-7.071 7.071a.999.999 0 0 0 0 1.414zM28.104 35.523l-1.414 1.414a.999.999 0 1 0 1.414 1.414l1.414-1.414a.999.999 0 1 0-1.414-1.414zM17.497 28.745a.997.997 0 0 0 .707-.293L28.81 17.846a.999.999 0 1 0-1.414-1.414L16.79 27.038a.999.999 0 0 0 .707 1.707zM31.639 14.6c.26 0 .521-.1.71-.29.181-.189.29-.439.29-.71 0-.26-.109-.52-.3-.71-.37-.37-1.03-.37-1.41.01-.18.181-.29.44-.29.7s.11.521.29.71c.19.19.45.29.71.29zM22.449 31.28a.986.986 0 0 0-.29.71c0 .27.1.52.29.699.18.19.439.301.71.301.26 0 .52-.11.699-.29.19-.19.301-.45.301-.71 0-.261-.11-.521-.301-.71-.369-.37-1.04-.37-1.409 0zM32.349 34.109c.181-.18.29-.439.29-.71 0-.26-.109-.52-.29-.71-.38-.37-1.04-.37-1.42 0-.18.19-.29.45-.29.71 0 .271.11.521.29.71.19.19.45.29.71.29s.52-.099.71-.29zM24.651 47.627a4.983 4.983 0 0 0 .814-3.172 3.438 3.438 0 0 0-1.28-2.403 3.66 3.66 0 0 0-2.738-.781l-2.802.35-3.846-3.846a2.995 2.995 0 0 1 3.406.577.999.999 0 1 0 1.414-1.414 5.01 5.01 0 0 0-6.293-.635l-.779-.779a.999.999 0 1 0-1.414 1.414l.781.781a4.986 4.986 0 0 0-.813 3.172 3.438 3.438 0 0 0 1.279 2.402 3.66 3.66 0 0 0 2.739.783l2.802-.35 3.836 3.836c-1.111.501-2.51.318-3.396-.568a.999.999 0 1 0-1.414 1.414 4.965 4.965 0 0 0 3.535 1.465c.996 0 1.946-.291 2.757-.829l.622.622a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-.624-.625zm-9.78-5.535a1.637 1.637 0 0 1-1.231-.352 1.462 1.462 0 0 1-.547-1.016 2.99 2.99 0 0 1 .295-1.532l2.742 2.742-1.259.158zm6.824 1.163c.433-.059.886.072 1.229.351.32.26.515.62.548 1.016a2.981 2.981 0 0 1-.296 1.532l-2.741-2.741 1.26-.158z" />
                                    </svg>
                                    Giá vắc xin
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/admin/quan-ly/danh-muc-benh"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('danh-muc-benh') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="#DEE4EE"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 12a6 6 0 0 1-6 6m6-6a6 6 0 0 0-6-6m6 6h3m-9 6a6 6 0 0 1-6-6m6 6v3m-6-9a6 6 0 0 1 6-6m-6 6H3m9-6V3m9 7.5v3m-18-3v3M10.5 3h3m-3 18h3m3.804-16.425 2.121 2.122M4.575 17.304l2.122 2.121m11.667-13.79-2.121 2.122m-8.485 8.485-2.122 2.121M4.576 6.696l2.12-2.121m10.608 14.85 2.121-2.122M5.635 5.636l2.122 2.121m8.485 8.485 2.121 2.121M14 14h.01m-3.51-2.5h.01m.99 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                        />
                                    </svg>
                                    Danh mục bệnh
                                </NavLink>
                            </li>

                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === '/forms' ||
                                                        pathname.includes('forms')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <svg
                                                    className="fill-current w-5 h-5"
                                                    viewBox="0 0 18 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_130_9763)">
                                                        <path
                                                            d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_130_9763">
                                                            <rect
                                                                width="18"
                                                                height="18"
                                                                fill="white"
                                                                transform="translate(0 0.052124)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Cài đặt tài khoản
                                                <svg
                                                    className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>

                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    !open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <div
                                                            onClick={
                                                                handleOpenUpdateEmployeeProfileModal
                                                            }
                                                            className="group cursor-pointer relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "
                                                        >
                                                            Cập nhật hồ sơ
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={handleOpenChangePasswordModal}
                                                            className="group cursor-pointer relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white "
                                                        >
                                                            Đổi mật khẩu
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">OTHERS</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/admin/quan-ly/khach-hang"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('khach-hang') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="#DEE4EE"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 21a7 7 0 1 1 14 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                                        />
                                    </svg>
                                    Khách hàng
                                </NavLink>
                            </li>

                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    pathname.includes('cuoc-hen') &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#DEE4EE"
                                                    data-name="Layer 1"
                                                    viewBox="0 0 24 24"
                                                    className="w-5 h-5"
                                                >
                                                    <title />
                                                    <path d="M18 5V3a1 1 0 0 0-2 0v2H8V3a1 1 0 0 0-2 0v2H2v16h20V5Zm2 14H4V7h16Zm-8-7a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 12 12Zm3 2.21a5.35 5.35 0 0 0-6 0V16h6Z" />
                                                </svg>
                                                Cuộc hẹn
                                                <svg
                                                    className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>

                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    !open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/thong-ke/cuoc-hen"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Danh sách cuộc hẹn
                                                        </NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink
                                                            to="/admin/thong-ke/cuoc-hen-bi-huy"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Cuộc hẹn bị hủy
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>

                            <li>
                                <NavLink
                                    to="/admin/thong-ke/don-hang"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('don-hang') &&
                                        'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#DEE4EE"
                                        data-name="Layer 1"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                    >
                                        <path d="M9.5 10.5H12a1 1 0 0 0 0-2h-1V8a1 1 0 0 0-2 0v.55a2.5 2.5 0 0 0 .5 4.95h1a.5.5 0 0 1 0 1H8a1 1 0 0 0 0 2h1v.5a1 1 0 0 0 2 0v-.55a2.5 2.5 0 0 0-.5-4.95h-1a.5.5 0 0 1 0-1ZM21 12h-3V3a1 1 0 0 0-.5-.87 1 1 0 0 0-1 0l-3 1.72-3-1.72a1 1 0 0 0-1 0l-3 1.72-3-1.72a1 1 0 0 0-1 0A1 1 0 0 0 2 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1ZM5 20a1 1 0 0 1-1-1V4.73l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72 3 1.72a1.08 1.08 0 0 0 1 0l2-1.14V19a3 3 0 0 0 .18 1Zm15-1a1 1 0 0 1-2 0v-5h2Z" />
                                    </svg>
                                    Đơn hàng
                                </NavLink>
                            </li>

                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/forms' || pathname.includes('forms')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname.includes('doanh-thu') ||
                                                        pathname.includes('so-luot-tiem')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <svg
                                                    className="fill-current w-5 h-5"
                                                    viewBox="0 0 18 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_130_9801)">
                                                        <path
                                                            d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_130_9801">
                                                            <rect
                                                                width="18"
                                                                height="18"
                                                                fill="white"
                                                                transform="translate(0 0.052124)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Thống kê
                                                <svg
                                                    className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>

                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    !open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/thong-ke/doanh-thu"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Doanh thu
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/thong-ke/so-mui-tiem"
                                                            className={({ isActive }) =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Số lượt tiêm
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>

                            <li>
                                <NavLink
                                    to="/nhan-vien"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            stroke="#DEE4EE"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 4h3a2 2 0 0 1 2 2v1m-5 13h3a2 2 0 0 0 2-2v-1M4.425 19.428l6 1.8A2 2 0 0 0 13 19.312V4.688a2 2 0 0 0-2.575-1.916l-6 1.8A2 2 0 0 0 3 6.488v11.024a2 2 0 0 0 1.425 1.916zM9.001 12H9m12 0h-5m0 0 2-2m-2 2 2 2"
                                        />
                                    </svg>
                                    Đến trang nhân viên
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <UpdateEmployeeProfileModal
                employeeInfo={employee}
                visibleUpdateEmployeeProfileModal={isOpenUpdateEmployeeProfileModal}
                handleCloseUpdateEmployeeProfileModal={handleCloseUpdateEmployeeProfileModal}
            />

            <ChangePasswordModal
                visibleChangePasswordModal={isOpenChangePasswordModal}
                handleCloseChangePasswordModal={handleCloseChangePasswordModal}
            />
        </aside>
    )
}
