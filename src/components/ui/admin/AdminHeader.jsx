import React from 'react'
import { useState, useEffect, useRef } from 'react'

export const AdminHeader = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)

    const [darkMode, setDarkMode] = useState(false)

    const handleChange = () => {
        setDarkMode(!darkMode)
    }

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [notifying, setNotifying] = useState(true)
    const dropdownRef = useRef(null)

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    // Hàm xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* Hamburger Toggle Button */}
                    <button
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSidebarToggle(!sidebarToggle)
                        }}
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="absolute right-0 h-full w-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                                        !sidebarToggle
                                            ? '!w-full delay-300'
                                            : ''
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarToggle
                                            ? '!w-full delay-400'
                                            : ''
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarToggle
                                            ? '!w-full delay-500'
                                            : ''
                                    }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarToggle ? '!h-0 delay-[0]' : ''
                                    }`}
                                ></span>
                                <span
                                    className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white delay-400 ${
                                        !sidebarToggle ? '!h-0 delay-200' : ''
                                    }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    {/* Hamburger Toggle Button */}
                    <a
                        className="block flex-shrink-0 lg:hidden"
                        href="index.html"
                    >
                        <img src="./images/logo/logo-icon.svg" alt="Logo" />
                    </a>
                </div>

                <div className="hidden sm:block">
                    <form
                        action="https://formbold.com/s/unique_form_id"
                        method="POST"
                    >
                        <div className="relative flex">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <svg
                                    className="w-3 h-3 fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                        fill=""
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                        fill=""
                                    />
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li>
                            {/* Dark Mode Toggler */}
                            <label
                                className={`relative m-0 block h-7.5 w-14 rounded-full ${
                                    darkMode ? 'bg-primary' : 'bg-stroke'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={handleChange}
                                    className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                                />
                                <span
                                    className={`absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 transition-transform duration-75 ease-linear rounded-full bg-white shadow-switcher ${
                                        darkMode
                                            ? 'translate-x-full right-1'
                                            : 'translate-x-0'
                                    }`}
                                >
                                    <span className="dark:hidden">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z"
                                                fill="#969AA1"
                                            />
                                            <path
                                                d="M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z"
                                                fill="#969AA1"
                                            />
                                        </svg>
                                    </span>
                                    <span className="hidden dark:inline-block">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z"
                                                fill="#969AA1"
                                            />
                                        </svg>
                                    </span>
                                </span>
                            </label>
                            {/* Dark Mode Toggler */}
                        </li>

                        {/* Notification Menu Area */}
                        <li className="relative" ref={dropdownRef}>
                            <a
                                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDropdownOpen(!dropdownOpen)
                                    setNotifying(false)
                                }}
                            >
                                <span
                                    className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
                                        !notifying ? 'hidden' : ''
                                    }`}
                                >
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                </span>

                                <svg
                                    className="fill-current duration-300 ease-in-out"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                                        fill=""
                                    />
                                </svg>
                            </a>

                            {/* Dropdown Start */}
                            {dropdownOpen && (
                                <div className="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
                                    <div className="px-4.5 py-3">
                                        <h5 className="text-sm font-medium text-bodydark2">
                                            Notification
                                        </h5>
                                    </div>

                                    <ul className="flex h-auto flex-col overflow-y-auto">
                                        <li>
                                            <a
                                                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                                                href="#"
                                            >
                                                <p className="text-sm">
                                                    <span className="text-black dark:text-white">
                                                        Edit your information in
                                                        a swipe
                                                    </span>
                                                    Sint occaecat cupidatat non
                                                    proident, sunt in culpa qui
                                                    officia deserunt mollit
                                                    anim.
                                                </p>

                                                <p className="text-xs">
                                                    12 May, 2025
                                                </p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                                                href="#"
                                            >
                                                <p className="text-sm">
                                                    <span className="text-black dark:text-white">
                                                        It is a long established
                                                        fact
                                                    </span>
                                                    that a reader will be
                                                    distracted by the readable.
                                                </p>

                                                <p className="text-xs">
                                                    24 Feb, 2025
                                                </p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                                                href="#"
                                            >
                                                <p className="text-sm">
                                                    <span className="text-black dark:text-white">
                                                        There are many
                                                        variations
                                                    </span>
                                                    of passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered
                                                </p>

                                                <p className="text-xs">
                                                    04 Jan, 2025
                                                </p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                                                href="#"
                                            >
                                                <p className="text-sm">
                                                    <span className="text-black dark:text-white">
                                                        There are many
                                                        variations
                                                    </span>
                                                    of passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered
                                                </p>

                                                <p className="text-xs">
                                                    01 Dec, 2024
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {/* Dropdown End */}
                        </li>
                        {/* Notification Menu Area */}
                    </ul>

                    {/* User Area */}
                    <div className="relative" ref={dropdownRef}>
                        <a
                            className="flex items-center gap-4"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setDropdownOpen((prev) => !prev)
                            }}
                        >
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black dark:text-white">
                                    Nguyễn Văn A
                                </span>
                                <span className="block text-xs font-medium">
                                    GĐ.Trung Tâm
                                </span>
                            </span>

                            <span className="h-12 w-12 rounded-full">
                                <img
                                    className=" rounded-full"
                                    src={'./images/admin_avatar.png'}
                                    alt="User"
                                />
                            </span>

                            <svg
                                className={`hidden fill-current sm:block ${
                                    dropdownOpen ? 'rotate-180' : ''
                                }`}
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                                    fill=""
                                />
                            </svg>
                        </a>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                                    <li>
                                        <a
                                            href="profile.html"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* SVG path omitted for brevity */}
                                            </svg>
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="messages.html"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* SVG path omitted for brevity */}
                                            </svg>
                                            My Contacts
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="settings.html"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* SVG path omitted for brevity */}
                                            </svg>
                                            Account Settings
                                        </a>
                                    </li>
                                </ul>
                                <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                    <svg
                                        className="fill-current"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* SVG path omitted for brevity */}
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    {/* User Area */}
                </div>
            </div>
        </header>
    )
}
