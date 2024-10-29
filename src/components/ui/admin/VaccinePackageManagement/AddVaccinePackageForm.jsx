// import { vaccineService } from '@/services'
// import { Select, Table, Tooltip } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { MyToast } from '../../common'

// export const AddVaccinePackageForm = () => {
//     const [vaccineList, setVaccineList] = useState([])
//     const [vaccineSelectedList, setVaccineSelectedList] = useState([])

//     useEffect(() => {
//         vaccineService
//             .getAllVaccines()
//             .then((response) => setVaccineList(response.data.result))
//             .catch((error) => MyToast('error', 'Lỗi khi lấy danh mục vắc xin.'))
//     }, [])

//     const addVaccineToPackage = (record) => {
//         if (!vaccineSelectedList.includes(record)) {
//             setVaccineSelectedList((prev) => [...prev, record])
//         }
//     }

//     const removeVaccineFromPackage = (record) => {
//         setVaccineSelectedList((prev) =>
//             prev.filter((vaccine) => vaccine.vaccineName !== record.vaccineName)
//         )
//     }

//     const vaccineColumns = [
//         {
//             title: 'Tên vắc xin',
//             dataIndex: 'vaccineName',
//             key: 'vaccineName',
//         },
//         {
//             title: 'Phòng bệnh',
//             dataIndex: ['diseaseResponse', 'diseaseName'],
//             key: 'diseaseName',
//         },
//         {
//             title: 'Số mũi tiêm trẻ em',
//             dataIndex: 'vaccineChildDoseCount',
//             key: 'vaccineChildDoseCount',
//         },
//         {
//             title: 'Số mũi tiêm người lớn',
//             dataIndex: 'vaccineAdultDoseCount',
//             key: 'vaccineAdultDoseCount',
//         },
//         {
//             title: '',
//             dataIndex: 'action',
//             key: 'action',
//             render: (text, record) => (
//                 <div>
//                     {vaccineSelectedList.includes(record) ? (
//                         <Tooltip placement="top" title="Xóa khỏi vào gói">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-7 h-7"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 onClick={() => removeVaccineFromPackage(record)}
//                             >
//                                 <g fill="red">
//                                     <path d="M17 12a1 1 0 0 0-1-1H8a1 1 0 1 0 0 2h8a1 1 0 0 0 1-1Z" />
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-2.007a8.993 8.993 0 1 1 0-17.986 8.993 8.993 0 0 1 0 17.986Z"
//                                         clipRule="evenodd"
//                                     />
//                                 </g>
//                             </svg>
//                         </Tooltip>
//                     ) : (
//                         <Tooltip placement="top" title="Thêm vào gói">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-7 h-7 cursor-pointer"
//                                 onClick={() => addVaccineToPackage(record)}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <g stroke="#006400" strokeLinecap="round" strokeWidth={1.5}>
//                                     <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
//                                 </g>
//                             </svg>
//                         </Tooltip>
//                     )}
//                 </div>
//             ),
//         },
//     ]

//     const sortedVaccineList = vaccineList.sort((a, b) => {
//         return a.diseaseResponse.diseaseId - b.diseaseResponse.diseaseId
//     })

//     const [filteredVaccineList, setFilteredVaccineList] = useState([])
//     const [searchQuery, setSearchQuery] = useState('')

//     useEffect(() => {
//         if (searchQuery) {
//             const filtered = sortedVaccineList.filter((vaccine) =>
//                 vaccine.diseaseResponse.diseaseName
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase())
//             )

//             setFilteredVaccineList(filtered)
//         } else {
//             setFilteredVaccineList(vaccineList)
//         }
//     }, [searchQuery, vaccineList])

//     return (
//         <form action="" className="flex flex-col space-y-3">
//             <div className="flex space-x-5">
//                 <div className="flex-1 space-y-2">
//                     <label className="font-semibold">Tên gói vắc xin:</label>
//                     <input
//                         type="text"
//                         className="input input-bordered input-success w-full input-sm"
//                     />
//                 </div>
//                 <div className="flex flex-col flex-1 space-y-2">
//                     <label className="font-semibold">Loại gói vắc xin:</label>
//                     <Select
//                         placeholder="Chọn loại gói vắc xin"
//                         options={[
//                             {
//                                 value: 'ADULT',
//                                 label: 'Gói vắc xin dành cho người trưởng thành',
//                             },
//                             {
//                                 value: 'ADOLESCNET',
//                                 label: 'Gói vắc xin dành cho tuổi vị thành niên và thanh niên',
//                             },
//                             {
//                                 value: 'CHILD',
//                                 label: 'Gói vắc xin dành cho trẻ em',
//                             },
//                         ]}
//                     />
//                 </div>
//             </div>

//             <div>
//                 <Table
//                     title={() => (
//                         <div className="flex items-center justify-between">
//                             <div className=" text-xl text-orange-500 font-semibold">
//                                 Chọn các vắc xin muốn thêm vào gói
//                             </div>
//                             <div className="relative w-full max-w-xl">
//                                 <input
//                                     placeholder="Tìm kiếm..."
//                                     className="rounded-full w-full bg-white py-2 px-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200 h-12"
//                                     type="text"
//                                     name="query"
//                                     id="query"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="absolute inline-flex items-center px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full right-3 top-2 h-8 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//                                 >
//                                     <svg
//                                         className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                         ></path>
//                                     </svg>
//                                     Search
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     columns={vaccineColumns}
//                     dataSource={filteredVaccineList}
//                     rowKey={'vaccineId'}
//                 />
//             </div>

//             <div className="mx-20 mb-5">
//                 <h3>Các vắc xin đã chọn:</h3>
//                 <ul>
//                     {vaccineSelectedList.map((vaccine) => (
//                         <li key={vaccine.id} className="flex justify-between items-center">
//                             <span className="flex items-center">
//                                 {vaccine.vaccineName}
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     className="ml-2 w-16 border rounded px-1"
//                                     placeholder="Số lượng"
//                                 />
//                             </span>
//                             <Tooltip placement="top" title="Xóa khỏi gói">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="w-5 h-5 text-red-600 cursor-pointer"
//                                     onClick={() => removeVaccineFromPackage(vaccine)}
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <g stroke="#ff0000" strokeLinecap="round" strokeWidth={1.5}>
//                                         <path d="M3 3h18m-18 0v18h18V3M8 9v6m4-6v6" />
//                                     </g>
//                                 </svg>
//                             </Tooltip>
//                         </li>
//                     ))}
//                 </ul>
//                 <button type="button">Xác nhận chọn vắc xin</button>
//             </div>
//         </form>
//     )
// }

import { vaccinePackageService, vaccineService } from '@/services'
import { Select, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'

export const AddVaccinePackageForm = () => {
    const [vaccineList, setVaccineList] = useState([])
    const [vaccineSelectedList, setVaccineSelectedList] = useState([])
    const [vaccineQuantities, setVaccineQuantities] = useState({}) // Trạng thái số lượng

    useEffect(() => {
        vaccineService
            .getAllVaccines()
            .then((response) => setVaccineList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi khi lấy danh mục vắc xin.'))
    }, [])

    const addVaccineToPackage = (record) => {
        if (!vaccineSelectedList.includes(record)) {
            setVaccineSelectedList((prev) => [...prev, record])
            setVaccineQuantities((prev) => ({ ...prev, [record.vaccineId]: 0 })) // Khởi tạo số lượng cho vắc xin mới
        }
    }

    const removeVaccineFromPackage = (record) => {
        setVaccineSelectedList((prev) =>
            prev.filter((vaccine) => vaccine.vaccineId !== record.vaccineId)
        )
        setVaccineQuantities((prev) => {
            const newQuantities = { ...prev }
            delete newQuantities[record.vaccineId] // Xóa số lượng khi xóa vắc xin
            return newQuantities
        })
    }

    const handleQuantityChange = (vaccineId, quantity) => {
        setVaccineQuantities((prev) => ({ ...prev, [vaccineId]: Number(quantity) }))
    }

    const [vaccinePackageName, setVaccinePackageName] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = async () => {
        const vaccineIds = Object.keys(vaccineQuantities)
        const dosesList = vaccineIds.map((id) => vaccineQuantities[id])

        const request = {
            vaccinePackageName: vaccinePackageName,
            vaccinePackageType: type,
            vaccineIdList: vaccineIds,
            doseCountList: dosesList,
        }

        try {
            const response = await vaccinePackageService.addVaccinePackage(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Thêm gói vắc xin thành công.')
            } else MyToast('error', 'Thêm gói vắc xin không thành công.')
        } catch (error) {
            MyToast('error', 'Thêm gói vắc xin không thành công.')
        }
    }

    const vaccineColumns = [
        {
            title: 'Tên vắc xin',
            dataIndex: 'vaccineName',
            key: 'vaccineName',
        },
        {
            title: 'Phòng bệnh',
            dataIndex: ['diseaseResponse', 'diseaseName'],
            key: 'diseaseName',
        },
        {
            title: 'Số mũi tiêm trẻ em',
            dataIndex: 'vaccineChildDoseCount',
            key: 'vaccineChildDoseCount',
        },
        {
            title: 'Số mũi tiêm người lớn',
            dataIndex: 'vaccineAdultDoseCount',
            key: 'vaccineAdultDoseCount',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div>
                    {vaccineSelectedList.includes(record) ? (
                        <Tooltip placement="top" title="Xóa khỏi vào gói">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                onClick={() => removeVaccineFromPackage(record)}
                            >
                                <g fill="red">
                                    <path d="M17 12a1 1 0 0 0-1-1H8a1 1 0 1 0 0 2h8a1 1 0 0 0 1-1Z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-2.007a8.993 8.993 0 1 1 0-17.986 8.993 8.993 0 0 1 0 17.986Z"
                                        clipRule="evenodd"
                                    />
                                </g>
                            </svg>
                        </Tooltip>
                    ) : (
                        <Tooltip placement="top" title="Thêm vào gói">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 cursor-pointer"
                                onClick={() => addVaccineToPackage(record)}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <g stroke="#006400" strokeLinecap="round" strokeWidth={1.5}>
                                    <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                                </g>
                            </svg>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ]

    const sortedVaccineList = vaccineList.sort((a, b) => {
        return a.diseaseResponse.diseaseId - b.diseaseResponse.diseaseId
    })

    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (searchQuery) {
            const filtered = sortedVaccineList.filter((vaccine) =>
                vaccine.diseaseResponse.diseaseName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )

            setFilteredVaccineList(filtered)
        } else {
            setFilteredVaccineList(vaccineList)
        }
    }, [searchQuery, vaccineList])

    return (
        <form action="" className="flex flex-col space-y-3">
            <div className="flex space-x-5">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Tên gói vắc xin:</label>
                    <input
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                        onChange={(e) => setVaccinePackageName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                    <label className="font-semibold">Loại gói vắc xin:</label>
                    <Select
                        placeholder="Chọn loại gói vắc xin"
                        options={[
                            {
                                value: 'ADULT',
                                label: 'Gói vắc xin dành cho người trưởng thành',
                            },
                            {
                                value: 'ADOLESCNET',
                                label: 'Gói vắc xin dành cho tuổi vị thành niên và thanh niên',
                            },
                            {
                                value: 'CHILD',
                                label: 'Gói vắc xin dành cho trẻ em',
                            },
                        ]}
                        onChange={(value) => setType(value)}
                    />
                </div>
            </div>

            <div>
                <Table
                    title={() => (
                        <div className="flex items-center justify-between">
                            <div className=" text-xl text-orange-500 font-semibold">
                                Chọn các vắc xin muốn thêm vào gói
                            </div>
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
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    )}
                    columns={vaccineColumns}
                    dataSource={filteredVaccineList}
                    rowKey="vaccineId"
                />
            </div>

            {vaccineSelectedList.length > 0 && (
                <div className="flex flex-col space-y-3">
                    <h2 className="text-lg font-semibold">Danh sách vắc xin đã chọn</h2>
                    <ul>
                        {vaccineSelectedList.map((vaccine) => (
                            <li key={vaccine.vaccineId} className="flex justify-between">
                                <span>{vaccine.vaccineName}</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={vaccineQuantities[vaccine.vaccineId] || 0}
                                    onChange={(e) =>
                                        handleQuantityChange(vaccine.vaccineId, e.target.value)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                >
                    <span className="mr-2">Thêm gói mới</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g stroke="currentColor" strokeLinecap="round" strokeWidth={1.7}>
                            <path d="M17.837 2.792H6.656c-1.03 0-1.864.834-1.864 1.864v14.136c0 .495.196.969.546 1.318l.235.235a1.532 1.532 0 0 0 2.166 0 1.532 1.532 0 0 1 1.768-.287l1.906.953a1.864 1.864 0 0 0 1.667 0l2.06-1.03a1.864 1.864 0 0 1 1.667 0l.197.098a1.864 1.864 0 0 0 2.697-1.666V4.656c0-1.03-.835-1.864-1.864-1.864Z" />
                            <path d="m10.183 11.045.511.511a.723.723 0 0 0 1.023 0L14.273 9M8.52 15.837h7.454" />
                        </g>
                    </svg>
                </button>
            </div>
        </form>
    )
}
