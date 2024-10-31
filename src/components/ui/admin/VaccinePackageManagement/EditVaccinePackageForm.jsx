import { vaccinePackageService } from '@/services'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MyToast } from '../../common'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailOfSampleBatch } from '@/redux'
import { Select, Table } from 'antd'
import { convertVaccineType } from '@/utils'

export const EditVaccinePackageForm = () => {
    const dispatch = useDispatch()
    const { batchDetailList } = useSelector((state) => state.batchDetail)
    const location = useLocation()
    const record = location.state?.record

    const [packageDetailList, setPackageDetailList] = useState([])
    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [packagePrice, setPackagePrice] = useState(record.vaccinePackagePrice)

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
            onFilter: (value, record) => {
                if (value === 'CHILD') {
                    return record.vaccineResponse.vaccineAdultDoseCount === 0
                }

                if (value === 'ADULT') {
                    return record.vaccineResponse.vaccineAdultDoseCount > 0
                }
                return false
            },
            filters: [
                { text: 'Trẻ Em', value: 'CHILD' },
                { text: 'Người Lớn', value: 'ADULT' },
            ],
            filterMultiple: false,
            render: (text, record) => text + ' ' + convertVaccineType(record.vaccineType),
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
                                Tổng giá: {packagePrice.toLocaleString()} VND
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
            </div>
        </div>
    )
}
