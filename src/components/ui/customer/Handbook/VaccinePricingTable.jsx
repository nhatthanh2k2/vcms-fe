import { fetchDetailOfSampleBatch } from '@/redux'
import { batchDetailService } from '@/services'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
        width: 400,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: ['vaccineResponse', 'vaccineName'],
        key: 'vaccineName',
        width: 400,
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
        sorter: (a, b) => a.batchDetailVaccinePrice - b.batchDetailVaccinePrice,
        width: 200,
    },
]

export const VaccinePricingTable = () => {
    const [loading, setLoading] = useState(true)
    const { batchDetailList } = useSelector((state) => state.batchDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDetailOfSampleBatch())
        setLoading(false)
    }, [dispatch])

    const sortedBatchDetail = [...batchDetailList].sort((a, b) => {
        return a.diseaseResponse.diseaseId - b.diseaseResponse.diseaseId
    })

    return (
        <div>
            <Table
                loading={loading}
                pagination={false}
                columns={priceColumns}
                dataSource={sortedBatchDetail}
                bordered
                rowKey={'batchDetailId'}
            />
        </div>
    )
}
