import { vaccinePackageService } from '@/services'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

const childPackageColumns = [
    {
        title: 'STT',
        key: 'index',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Tên vắc xin',
        dataIndex: ['vaccineResponse', 'vaccineName'],
        key: 'vaccineName',
    },
    {
        title: 'Phòng bệnh',
        dataIndex: ['diseaseResponse', 'diseaseName'],
        key: 'diseaseName',
    },
    {
        title: 'Số mũi tiêm',
        dataIndex: 'packageDetailDoseCount',
        key: 'packageDetailDoseCount',
    },
]

export const ChildPackageTable = ({ pack }) => {
    const [vaccinePackageDetail, setVaccinePackageDetail] = useState([])

    useEffect(() => {
        vaccinePackageService
            .getDetailsOfPackage(pack.vaccinePackageId)
            .then((response) => setVaccinePackageDetail(response.data.result))
            .catch((error) => console.error('Get package detail failed.'))
    }, [])

    const totalDoseCount = vaccinePackageDetail.reduce(
        (total, item) => total + item.packageDetailDoseCount,
        0
    )

    return (
        <Table
            bordered
            title={() => (
                <div className="text-center text-2xl text-blue-700 font-bold">
                    Danh mục {pack.vaccinePackageName}
                </div>
            )}
            footer={() => (
                <div className="flex flex-col">
                    <div className="text-center text-lg font-semibold">
                        Tổng số liều: {totalDoseCount}
                    </div>
                    <div className="text-center text-lg font-semibold">
                        Giá gói: {pack.vaccinePackagePrice.toLocaleString()} VND
                    </div>
                    <div>
                        <strong>Lưu ý:</strong> Giá gói chỉ mang tính chất tham khảo. Giá có thể
                        thây đổi tùy thời điểm khác nhau.
                    </div>
                </div>
            )}
            dataSource={vaccinePackageDetail}
            columns={childPackageColumns}
            pagination={false}
            rowKey={'packageDetailId'}
        />
    )
}
