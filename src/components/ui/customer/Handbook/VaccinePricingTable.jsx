import { fetchDetailOfSampleBatch } from '@/redux'
import { batchDetailService } from '@/services'
import { Table } from 'antd'
import dayjs from 'dayjs'
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

    const findLatestUpdate = (details) => {
        if (!details || details.length === 0) return null

        return details.reduce((latest, current) => {
            const latestDateStr = latest?.vaccineResponse.vaccineUpdateAt
            const currentDateStr = current?.vaccineResponse.vaccineUpdateAt

            const latestDate = new Date(
                latestDateStr.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2-$1-$3')
            )
            const currentDate = new Date(
                currentDateStr.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2-$1-$3')
            )

            return currentDate > latestDate ? current : latest
        })
    }

    const latestUpdate = findLatestUpdate(batchDetailList)

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
            <div className="mt-2 ">
                Giá vắc xin được áp dụng từ:
                <strong>
                    {' '}
                    {latestUpdate && latestUpdate.vaccineResponse.vaccineUpdateAt
                        ? dayjs(
                              latestUpdate.vaccineResponse.vaccineUpdateAt,
                              'DD-MM-YYYY HH-mm-ss'
                          ).format('DD-MM-YYYY')
                        : '01-09-2024'}
                    .
                </strong>
                <div>
                    <strong className="text-red-500">Lưu ý: </strong>Giá vắc xin có thể thay đổi
                    theo từng thời điểm khác nhau.
                </div>
            </div>
        </div>
    )
}
