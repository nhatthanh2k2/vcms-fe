import { vaccineBatchService } from '@/services'

import { Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const batchDetailColumns = [
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
        title: 'Tổng Số lượng',
        dataIndex: 'batchDetailInitialQuantity',
        key: 'batchDetailInitialQuantity',
    },
    {
        title: 'Số lượng còn lại',
        dataIndex: 'batchDetailRemainingQuantity',
        key: 'batchDetailRemainingQuantity',
    },
    {
        title: 'Ngày sản xuất',
        dataIndex: 'batchDetailManufactureDate',
        key: 'manufactureDate',
    },
    {
        title: 'Ngày hết hạn',
        dataIndex: 'batchDetailExpirationDate',
        key: 'expirationDate',
    },
]

export const VaccineBatchDetailModal = ({
    visibleVaccineBatchDetailModal,
    handleCloseVaccineBatchDetailModal,
    batchSelected,
}) => {
    const [batchDetailList, setBatchDetailList] = useState([])

    useEffect(() => {
        if (batchSelected?.vaccineBatchId) {
            vaccineBatchService
                .getDetailOfBatch(batchSelected.vaccineBatchId)
                .then((response) => setBatchDetailList(response.data.result))
                .catch((error) => console.error('Get detail of batch failed.', error))
        } else {
            setBatchDetailList([])
        }
    }, [batchSelected])

    return (
        <Modal
            title={
                <div className="text-center text-2xl text-teal-500 font-bold">
                    Thông tin lô hàng {batchSelected?.vaccineBatchNumber}
                </div>
            }
            open={visibleVaccineBatchDetailModal}
            onCancel={handleCloseVaccineBatchDetailModal}
            footer={false}
            width={1400}
            style={{ top: 20, maxHeight: '90vh' }}
            styles={{
                body: {
                    overflowY: 'auto',
                    maxHeight: '80vh',
                    height: '80vh',
                },
            }}
        >
            <Table
                dataSource={batchDetailList}
                columns={batchDetailColumns}
                rowKey={'batchDetailId'}
            />
        </Modal>
    )
}
