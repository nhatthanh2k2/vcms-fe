import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyToast } from '../../common'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailOfSampleBatch } from '@/redux'
import { Select, Table } from 'antd'

export const EditVaccinePackageForm = () => {
    const dispatch = useDispatch()
    const { batchDetailList } = useSelector((state) => state.batchDetail)
    const navigate = useNavigate()
    const location = useLocation()
    const record = location.state?.record

    const [packageDetailList, setPackageDetailList] = useState([])
    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [packagePrice, setPackagePrice] = useState(record.vaccinePackagePrice)
    const [packageName, setPackageName] = useState(record.vaccinePackageName)
    const [packageType, setPackageType] = useState(record.vaccinePackageType)

    useEffect(() => {
        dispatch(fetchDetailOfSampleBatch())
    }, [dispatch])

    useEffect(() => {
        vaccinePackageService
            .getDetailsOfPackage(record.vaccinePackageId)
            .then((response) => setPackageDetailList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy chi tiết gói vắc xin.'))
    }, [])

    useEffect(() => {
        const filteredData = batchDetailList.filter(
            (detail) =>
                !packageDetailList.some(
                    (packageDetail) =>
                        packageDetail.vaccineResponse.vaccineId === detail.vaccineResponse.vaccineId
                )
        )
        setFilteredVaccineList(filteredData)
    }, [packageDetailList, batchDetailList])

    const addVaccineToPackage = (batchDetailId) => {
        const batchDetailToAdd = batchDetailList.find(
            (detail) => detail.batchDetailId === batchDetailId
        )

        if (batchDetailToAdd) {
            const doseCount =
                record.vaccinePackageType === 'ADULT'
                    ? batchDetailToAdd.vaccineResponse.vaccineAdultDoseCount
                    : batchDetailToAdd.vaccineResponse.vaccineChildDoseCount

            const vaccinePrice = batchDetailToAdd.batchDetailVaccinePrice

            setPackagePrice((prevPrice) => prevPrice + doseCount * vaccinePrice)

            setPackageDetailList((prev) => [
                ...prev,
                {
                    vaccineResponse: batchDetailToAdd.vaccineResponse,
                    doseCount: doseCount,
                    diseaseResponse: batchDetailToAdd.diseaseResponse,
                },
            ])

            setFilteredVaccineList((prev) =>
                prev.filter(
                    (vaccine) => vaccine.vaccineId !== batchDetailToAdd.vaccineResponse.vaccineId
                )
            )
        }
    }

    const removeVaccineFromPackage = (vaccineId) => {
        const vaccineToRemove = packageDetailList.find(
            (packageDetail) => packageDetail.vaccineResponse.vaccineId === vaccineId
        )

        if (vaccineToRemove) {
            const { doseCount } = vaccineToRemove

            const batchDetail = batchDetailList.find(
                (detail) => detail.vaccineResponse.vaccineId === vaccineId
            )

            if (batchDetail) {
                const vaccinePrice = batchDetail.batchDetailVaccinePrice
                setPackagePrice((prevPrice) => prevPrice - doseCount * vaccinePrice)
            }

            setFilteredVaccineList((prev) => [
                ...prev,
                {
                    vaccineResponse: vaccineToRemove.vaccineResponse,
                },
            ])

            setPackageDetailList((prev) =>
                prev.filter(
                    (packageDetail) => packageDetail.vaccineResponse.vaccineId !== vaccineId
                )
            )
        }
    }

    const packageDetailColumns = [
        {
            title: 'Tên Vắc Xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
            width: 150,
        },
        {
            title: 'Nguồn gốc',
            dataIndex: ['vaccineResponse', 'vaccineOrigin'],
            key: 'vaccineOrigin',
            width: 150,
        },
        {
            title: 'Phòng bệnh',
            dataIndex: ['diseaseResponse', 'diseaseName'],
            key: 'diseaseName',
            width: 150,
        },

        {
            key: 'action',
            width: 50,
            render: (text, record) => (
                <svg
                    onClick={() => removeVaccineFromPackage(record.vaccineResponse.vaccineId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 stroke-current text-black hover:text-red-500 transition-colors duration-300 ease-in-out"
                >
                    <g strokeLinecap="round" strokeWidth={1.5}>
                        <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />

                        <path d="M15 9L9 15" />
                        <path d="M9 9l6 6" />
                    </g>
                </svg>
            ),
        },
    ]

    const batchDetailColumns = [
        {
            title: 'Tên Vắc Xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
            width: 150,
            render: (text, record) => text,
        },
        {
            title: 'Nguồn gốc',
            dataIndex: ['vaccineResponse', 'vaccineOrigin'],
            key: 'vaccineOrigin',
            width: 150,
        },
        {
            title: 'Phòng bệnh',
            dataIndex: ['diseaseResponse', 'diseaseName'],
            key: 'diseaseName',
            width: 150,
        },
        {
            key: 'action',
            width: 50,
            render: (text, record) => (
                <svg
                    onClick={() => addVaccineToPackage(record.batchDetailId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 stroke-current text-black hover:text-green-500 transition-colors duration-300 ease-in-out"
                >
                    <g strokeLinecap="round" strokeWidth={1.5}>
                        <path d="M15 12h-3m0 0H9m3 0V9m0 3v3" />

                        <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                    </g>
                </svg>
            ),
        },
    ]

    const handleBackToPackageTable = () => {
        navigate('/admin/quan-ly/goi-vac-xin/danh-muc')
    }

    const handleUpdateVaccinePackage = async () => {
        const request = {
            vaccinePackageId: record.vaccinePackageId,
            vaccinePackageName: packageName,
            vaccinePackageType: packageType,
            vaccinePackagePrice: packagePrice,
            vaccineIdList: packageDetailList.map((detail) => detail.vaccineResponse.vaccineId),
            doseCountList: packageDetailList.map((detail) => detail.doseCount),
        }
        try {
            const response = await vaccinePackageService.updateVaccinePackage(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Cập nhật gói thành công.')
            } else MyToast('error', 'Xảy ra lỗi trong quá trình cập nhật.')
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Không tìm thấy vắc xin hoặc gói tương ứng.')
            }
        }
    }

    return (
        <div>
            <div className="flex flex-col space-y-5">
                <div className="flex space-x-5">
                    <div className="flex-grow space-y-2">
                        <label className="font-semibold">Tên gói vắc xin:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm"
                            value={record.vaccinePackageName}
                            onChange={(e) => setPackageName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-grow  space-y-2">
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
                            onChange={(value) => setPackageType(value)}
                            value={record.vaccinePackageType}
                        />
                    </div>
                </div>

                <div>
                    <Table
                        columns={packageDetailColumns}
                        dataSource={packageDetailList}
                        rowKey={'vaccinePkgDetailId'}
                        pagination={false}
                        scroll={{
                            y: 400,
                        }}
                        title={() => (
                            <div className="text-center text-lg text-orange-500 font-semibold">
                                Vắc Xin Trong Gói
                            </div>
                        )}
                        footer={() => (
                            <div className="text-center text-xl font-semibold">
                                Tổng giá: {packagePrice?.toLocaleString()} VND
                            </div>
                        )}
                    />
                </div>

                <div>
                    <Table
                        columns={batchDetailColumns}
                        dataSource={filteredVaccineList}
                        rowKey={'batchDetailId'}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: false,
                            showQuickJumper: false,
                        }}
                        scroll={{
                            y: 400,
                        }}
                        title={() => (
                            <div className="text-center text-lg text-orange-500 font-semibold">
                                Danh Mục Vắc Xin
                            </div>
                        )}
                    />
                </div>

                <div className="flex justify-center space-x-5">
                    <button
                        onClick={handleBackToPackageTable}
                        type="button"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="m4 10-.707.707L2.586 10l.707-.707L4 10Zm17 8a1 1 0 1 1-2 0h2ZM8.293 15.707l-5-5 1.414-1.414 5 5-1.414 1.414Zm-5-6.414 5-5 1.414 1.414-5 5-1.414-1.414ZM4 9h10v2H4V9Zm17 7v2h-2v-2h2Zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V9Z"
                            />
                        </svg>
                        <span className="ml-2">Quay lại</span>
                    </button>
                    <button
                        onClick={handleUpdateVaccinePackage}
                        type="button"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Cập nhật gói</span>
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
            </div>
        </div>
    )
}
