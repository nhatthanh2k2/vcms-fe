import { batchDetailService } from '@/services'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

const priceColumns = [
    {
        title: 'STT',
        key: 'index',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Phòng bệnh',
        dataIndex: ['diseaseResponse', 'diseaseName'],
        key: 'diseaseName',
        width: 300,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: ['vaccineResponse', 'vaccineName'],
        key: 'vaccineName',
        width: 300,
    },
    {
        title: 'Nguồn gốc vắc xin',
        dataIndex: ['vaccineResponse', 'vaccineOrigin'],
        key: 'vaccineOrigin',
        width: 400,
    },
    {
        title: 'Giá bán lẻ / liều',
        dataIndex: 'batchDetailVaccinePrice',
        key: 'vaccinePrice',
        render: (price) => `${price.toLocaleString()} VNĐ`,
    },
]

export const VaccinePricingTable = () => {
    const [batchDetailList, setBatchDetailList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => {
                setLoading(false)
                setBatchDetailList(response.data.result)
            })
            .catch((err) => console.log('Get Batch Detail Failed!'))
    }, [])

    const sortedBatchDetail = batchDetailList.sort((a, b) => {
        return a.diseaseResponse.diseaseId - b.diseaseResponse.diseaseId
    })

    return (
        <div>
            <Table
                loading={loading}
                pagination={false}
                columns={priceColumns}
                dataSource={sortedBatchDetail}
            />
        </div>
    )
}
