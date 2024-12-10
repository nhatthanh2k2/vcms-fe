import { employeeService } from '@/services'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table, Tooltip } from 'antd'
import { convertQualification } from '@/utils'
import { AddEmployeeModal, DeleteEmployeeModal, EditEmployeeModal } from '.'
import { MyToast } from '../../common'

export const EmployeeTable = () => {
    const [employeeList, setEmployeeList] = useState([])
    const [isOpenAddEmployeeModal, SetIsOpenAddEmployeeModal] = useState(false)
    const [filteredEmployeeList, setFilteredEmployeeList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const getEmployeeList = () => {
        employeeService
            .getAllEmployees()
            .then((response) => {
                setEmployeeList(response.data.result)
                setFilteredEmployeeList(response.data.result)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi lấy danh sách nhân viên.'))
    }

    useEffect(() => {
        getEmployeeList()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const filtered = employeeList.filter((employee) =>
                employee.employeeFullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredEmployeeList(filtered)
        } else {
            setFilteredEmployeeList(employeeList)
        }
    }, [searchQuery, employeeList])

    const handleOpenAddEmployeeModal = () => {
        SetIsOpenAddEmployeeModal(true)
    }

    const handleCloseAddEmployeeModal = () => {
        SetIsOpenAddEmployeeModal(false)
    }

    const [employeeInfo, setEmployeeInfo] = useState(null)
    const [isOpenDeleteEmployeeModal, setIsOpenDeleteEmployeeModal] = useState(false)

    const handleOpenDeleteEmployeeModal = (record) => {
        setEmployeeInfo(record)
        setIsOpenDeleteEmployeeModal(true)
    }

    const handleCloseDeleteEmployeeModal = (record) => {
        setIsOpenDeleteEmployeeModal(false)
        setEmployeeInfo(null)
    }

    const [isOpenEditEmployeeModal, setIsOpenEditEmployeeModal] = useState(false)

    const handleOpenEditEmployeeModal = (record) => {
        setEmployeeInfo(record)
        setIsOpenEditEmployeeModal(true)
    }

    const handleCloseEditEmployeeModal = () => {
        setIsOpenEditEmployeeModal(false)
        setEmployeeInfo(null)
    }

    const handleDeactivateEmployee = async (employeeId) => {
        setLoading(true)
        try {
            const response = await employeeService.deactivateEmployee(employeeId)
            if (response.data.code === 1000) {
                MyToast('success', 'Khóa tài khoản thành công.')
                getEmployeeList()
                setLoading(false)
            } else {
                MyToast('error', 'Không thể khóa tài khoản.')
            }
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi khóa tài khoản.')
        }
    }

    const handleActiveEmployee = async (employeeId) => {
        setLoading(true)
        try {
            const response = await employeeService.activeEmployee(employeeId)
            if (response.data.code === 1000) {
                MyToast('success', 'Kích hoạt tài khoản thành công.')
                getEmployeeList()
                setLoading(false)
            } else {
                MyToast('error', 'Không thể kích hoạt tài khoản.')
            }
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi kích hoạt tài khoản.')
        }
    }

    const employeeColumns = [
        {
            title: '',
            key: 'status',
            render: (text, record) => (
                <div>
                    {record.employeeActive ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    ) : (
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    )}
                </div>
            ),
            width: 50,
        },
        {
            title: 'Ảnh',
            dataIndex: 'employeeAvatar',
            key: 'employeeAvatar',
            render: (avatar) => (
                <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={import.meta.env.VITE_VCMS_IMAGE + '/avatars/' + avatar}
                />
            ),
            width: 100,
        },
        {
            title: 'Họ tên',
            dataIndex: 'employeeFullName',
            key: 'employeeFullName',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'employeeUsername',
            key: 'employeeUsername',
        },
        {
            title: 'Giới tính',
            dataIndex: 'employeeGender',
            key: 'employeeGender',
            render: (gender) => (gender === 'MALE' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Trình độ',
            dataIndex: 'employeeQualification',
            key: 'employeeQualification',
            render: (qual) => convertQualification(qual),
        },
        {
            title: 'Chức vụ',
            dataIndex: 'employeePosition',
            key: 'employeePosition',
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-2 justify-center items-center">
                    <div onClick={() => handleOpenEditEmployeeModal(record)}>
                        <Tooltip placement="top" title="Chỉnh sửa thông tin">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon line-color w-6 h-6"
                                data-name="Line Color"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M20.71 16.09 15.8 21H13v-2.8l4.91-4.91a1 1 0 0 1 1.4 0l1.4 1.4a1 1 0 0 1 0 1.4Z"
                                    style={{
                                        fill: 'none',
                                        stroke: '#2ca9bc',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                                <circle
                                    cx={11}
                                    cy={7}
                                    r={4}
                                    style={{
                                        fill: 'none',
                                        stroke: '#000',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                                <path
                                    d="M11 15H8a5 5 0 0 0-5 5 1 1 0 0 0 1 1h5"
                                    data-name="primary"
                                    style={{
                                        fill: 'none',
                                        stroke: '#000',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                            </svg>
                        </Tooltip>
                    </div>

                    {/* <div onClick={() => handleOpenDeleteEmployeeModal(record)}>
                        <Tooltip placement="top" title="Xóa nhân viên">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                viewBox="0 0 512 512"
                                className="w-6 h-6"
                            >
                                <circle
                                    cx={187.056}
                                    cy={88.72}
                                    r={88.72}
                                    style={{
                                        fill: '#00000a',
                                    }}
                                />
                                <path
                                    d="m182.864 383.584-85.704-185.8s-89.904 1.2-89.904 83.912v101.888h175.608zM191.256 383.584l85.704-185.8s89.904 1.2 89.904 83.912v101.888H191.256z"
                                    style={{
                                        fill: '#00000a',
                                    }}
                                />
                                <path
                                    d="M187.056 197.784h-61.728l61.728 136.656 61.736-136.656z"
                                    style={{
                                        fill: '#e21b1b',
                                    }}
                                />
                                <circle
                                    cx={388.744}
                                    cy={396}
                                    r={116}
                                    style={{
                                        fill: '#e21b1b',
                                    }}
                                />
                                <path
                                    d="M324.061 383.992h129.447v24H324.061z"
                                    style={{
                                        fill: '#fff',
                                    }}
                                    transform="rotate(-45.001 388.782 395.999)"
                                />
                                <path
                                    d="M376.802 331.246h24v129.447h-24z"
                                    style={{
                                        fill: '#fff',
                                    }}
                                    transform="rotate(-45.001 388.799 395.976)"
                                />
                            </svg>
                        </Tooltip>
                    </div> */}

                    <div>
                        {record.employeeActive ? (
                            <div onClick={() => handleDeactivateEmployee(record.employeeId)}>
                                <Tooltip placement="top" title="Khóa tài khoản">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        className="w-6 h-6"
                                    >
                                        <g data-name="Layer 2">
                                            <path
                                                fill="none"
                                                d="M0 0h48v48H0z"
                                                data-name="invisible box"
                                            />
                                            <path d="m3 30.5-1 .6V39a2 2 0 0 0 2 2h20v-4H6v-3.6A21.7 21.7 0 0 1 16 31a21.5 21.5 0 0 1 8 1.5v-4.2a24.4 24.4 0 0 0-8-1.3 25.6 25.6 0 0 0-13 3.5ZM16 5a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 14a5 5 0 1 1 5-5 5 5 0 0 1-5 5ZM44 28h-1v-3a6 6 0 0 0-12 0v3h-1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Zm-9-3a2 2 0 0 1 4 0v3h-4Zm7 14H32v-7h10Z" />
                                        </g>
                                    </svg>
                                </Tooltip>
                            </div>
                        ) : (
                            <div onClick={() => handleActiveEmployee(record.employeeId)}>
                                <Tooltip placement="top" title="Kích hoạt tài khoản">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 48 48"
                                    >
                                        <g data-name="Layer 2">
                                            <path
                                                fill="none"
                                                d="M0 0h48v48H0z"
                                                data-name="invisible box"
                                            />
                                            <path d="m3 30.5-1 .6V39a2 2 0 0 0 2 2h20v-4H6v-3.6A21.7 21.7 0 0 1 16 31a21.5 21.5 0 0 1 8 1.5v-4.2a24.4 24.4 0 0 0-8-1.3 25.6 25.6 0 0 0-13 3.5ZM16 23a9 9 0 1 0-9-9 9 9 0 0 0 9 9Zm0-14a5 5 0 1 1-5 5 5 5 0 0 1 5-5ZM44 28h-8v-3a6 6 0 0 0-12 0h4a2 2 0 0 1 4 0v3h-2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Zm-2 11H32v-7h10Z" />
                                        </g>
                                    </svg>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ]

    const pagination = {
        current: currentPage,
        pageSize: pageSize,
        showSizeChanger: true,
        total: employeeList.length,
        onChange: (page, pageSize) => {
            setCurrentPage(page)
            setPageSize(pageSize)
        },
    }

    return (
        <div className="flex flex-col space-y-5 bg-white shadow-default">
            <Table
                title={() => (
                    <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-xl">
                            <input
                                placeholder="Tìm kiếm..."
                                className="rounded-full w-full bg-white py-2 px-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200 h-12"
                                type="text"
                                name="query"
                                id="query"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute inline-flex items-center px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full right-3 top-2 h-8 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <svg
                                    className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                Search
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => handleOpenAddEmployeeModal()}
                                className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                            >
                                <span className="mr-2">Thêm nhân viên</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon line-color w-6 h-6"
                                    data-name="Line Color"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M17 17h4m-2-2v4M15 13.1a4.71 4.71 0 0 0-1-.1H8a5 5 0 0 0-5 5v1s2 2 8 2a22 22 0 0 0 3-.19c.35 0 .69-.1 1-.17"
                                        style={{
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <circle
                                        cx={11}
                                        cy={8}
                                        r={5}
                                        data-name="primary"
                                        style={{
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                        }}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                bordered
                columns={employeeColumns}
                dataSource={filteredEmployeeList}
                rowKey="employeeId"
                loading={loading}
                pagination={pagination}
            />

            <AddEmployeeModal
                visibleAddEmployeeModal={isOpenAddEmployeeModal}
                handleCloseAddEmployeeModal={handleCloseAddEmployeeModal}
                getEmployeeList={getEmployeeList}
            />

            <EditEmployeeModal
                employeeInfo={employeeInfo}
                visibleEditEmployeeModal={isOpenEditEmployeeModal}
                handleCloseEditEmployeeModal={handleCloseEditEmployeeModal}
                getEmployeeList={getEmployeeList}
            />

            <DeleteEmployeeModal
                visibleDeleteEmployeeModal={isOpenDeleteEmployeeModal}
                handleCloseDeleteEmployeeModal={handleCloseDeleteEmployeeModal}
                employeeInfo={employeeInfo}
                getEmployeeList={getEmployeeList}
            />
        </div>
    )
}
