import { diseaseService, vaccineService } from '@/services'
import React, { useEffect, useState } from 'react'
import { VaccineCard } from '.'
import { Pagination, Row, Col, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVaccines, fetchAllVaccinesOfDisease } from '@/redux'

const ageRanges = [
    '0-2 tháng',
    '2-6 tháng',
    '7-12 tháng',
    '13-24 tháng',
    '4-6 tuổi',
    '9-18 tuổi',
    'Phụ nữ trước mang thai',
    'Người trưởng thành',
]

export const VaccineList = () => {
    const dispatch = useDispatch()
    const { vaccineList, vaccineOfDiseaseList } = useSelector((state) => state.vaccine)
    const [diseaseList, setDiseaseList] = useState([])
    const [diseaseSelected, setDiseaseSelected] = useState(null)
    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [ageRangeSelected, setAgeRangeSelected] = useState(null)

    useEffect(() => {
        dispatch(fetchAllVaccines())
    }, [dispatch])

    useEffect(() => {
        setFilteredVaccineList(vaccineList)
    }, [vaccineList])

    useEffect(() => {
        diseaseService
            .getAllDiseases()
            .then((response) => setDiseaseList(response.data.result))
            .catch((err) => console.log('Get disaeses failed!'))
    }, [])

    const handleChoseDisease = (option) => {
        setDiseaseSelected(option)
        setAgeRangeSelected(null)

        if (option === 0) {
            setFilteredVaccineList(vaccineList)
        } else {
            dispatch(fetchAllVaccinesOfDisease(option))
        }
    }

    useEffect(() => {
        if (diseaseSelected && diseaseSelected !== 0) {
            setFilteredVaccineList(vaccineOfDiseaseList)
        }
    }, [vaccineOfDiseaseList, diseaseSelected])

    const handleChoseAgeRange = (option) => {
        setAgeRangeSelected(option)
        setDiseaseSelected(null)

        if (option === 'Tất cả') {
            setFilteredVaccineList(vaccineList)
        } else {
            const filteredVaccines = option
                ? vaccineList.filter((vaccine) => vaccine.vaccineAgeRange.includes(option))
                : vaccineList
            setFilteredVaccineList(filteredVaccines)
        }
    }

    const handleSearch = (event) => {
        const value = event.target.value
        setSearchTerm(value)

        if (value === '') {
            setFilteredVaccineList(vaccineList)
        } else {
            const filteredList = vaccineList.filter(
                (vaccine) =>
                    vaccine.vaccineDescription &&
                    vaccine.vaccineDescription.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredVaccineList(filteredList)
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 12

    const paginatedVaccines = filteredVaccineList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col items-center bg-bg-vaccination shadow-default p-10">
                <div className="text-2xl text-blue-700 font-bold mb-4">
                    Thông tin sản phẩm vắc xin
                </div>
                <div className=" flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                    <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <svg
                            onClick={handleSearch}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 opacity-30 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            className="bg-gray-100 outline-none"
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                        <Select
                            onChange={handleChoseDisease}
                            value={diseaseSelected}
                            placeholder="Chọn bệnh để xem vắc xin"
                            options={[
                                {
                                    value: 0,
                                    label: <span>Tất cả</span>,
                                },
                                ...diseaseList.map((disease) => ({
                                    value: disease.diseaseId,
                                    label: <span>{disease.diseaseName}</span>,
                                })),
                            ]}
                            style={{
                                width: 500,
                                height: 40,
                            }}
                        />
                    </div>

                    <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                        <Select
                            onChange={handleChoseAgeRange}
                            value={ageRangeSelected}
                            placeholder="Chọn nhóm tuổi để xem vắc xin"
                            options={[
                                {
                                    value: 'Tất cả',
                                    label: <span>Tất cả</span>,
                                },
                                ...ageRanges.map((ageRange) => ({
                                    value: ageRange,
                                    label: <span>{ageRange}</span>,
                                })),
                            ]}
                            style={{
                                width: 250,
                                height: 40,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mx-20">
                <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {paginatedVaccines.map((vaccine, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={8}
                            style={{ display: 'flex', alignItems: 'stretch' }}
                        >
                            <VaccineCard vaccineDetail={vaccine} style={{ flex: 1 }} />
                        </Col>
                    ))}
                </Row>

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredVaccineList.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    style={{ marginTop: '20px', textAlign: 'center' }}
                />
            </div>
        </div>
    )
}
