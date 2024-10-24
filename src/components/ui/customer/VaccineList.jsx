import { diseaseService, vaccineService } from '@/services'
import React, { useEffect, useState } from 'react'
import { VaccineCard } from '.'
import { Pagination, Row, Col, Select } from 'antd'

export const VaccineList = () => {
    const [vaccineList, setVaccineList] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const [diseaseSelected, setDiseaseSelected] = useState(0)
    const [filteredVaccineList, setFilteredVaccineList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        vaccineService
            .getAllVaccines()
            .then((respone) => {
                setVaccineList(respone.data.result)
                setFilteredVaccineList(respone.data.result)
            })
            .catch((err) => console.log('Get vaccines failed!'))
        diseaseService
            .getAllDiseases()
            .then((response) => setDiseaseList(response.data.result))
            .catch((err) => console.log('Get disaeses failed!'))
    }, [])

    const handleChoseDisease = (option) => {
        setDiseaseSelected(option)
    }

    useEffect(() => {
        if (diseaseSelected === 0) {
            vaccineService
                .getAllVaccines()
                .then((response) => setVaccineList(response.data.result))
                .catch((err) => console.log('Get all vaccines failed!'))
        } else {
            diseaseService
                .getVaccinesOfDisease(diseaseSelected)
                .then((response) => setVaccineList(response.data.result))
                .catch((err) => console.log('Get vaccines of disease failed!'))
        }
    }, [diseaseSelected])

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

    console.log(vaccineList)

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 12

    const paginatedVaccines = filteredVaccineList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col items-center bg-bg-vaccination p-10">
                <div className="text-2xl text-blue-700 font-bold mb-4">
                    Thông tin sản phẩm vắc xin
                </div>
                <div className=" w-fit flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
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
                                width: 384,
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
