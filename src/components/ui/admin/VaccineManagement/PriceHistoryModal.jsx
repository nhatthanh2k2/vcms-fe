import { priceHistoryService } from '@/services'
import { Modal, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const historyColumns = [
    {
        title: 'Ngày cập nhật',
        dataIndex: 'priceHistoryUpdateTime',
        key: 'priceHistoryUpdateTime',
        render: (text) => dayjs(text, 'DD-MM-YYYY HH-mm-ss').format('HH:mm:ss DD-MM-YYYY '),
    },
    {
        title: 'Giá trước cập nhật',
        dataIndex: 'priceHistoryOldPrice',
        key: 'priceHistoryOldPrice',
    },
    {
        title: 'Giá cập nhật',
        dataIndex: 'priceHistoryNewPrice',
        key: 'priceHistoryNewPrice',
    },
]

export const PriceHistoryModal = ({
    visiblePriceHistoryModal,
    handleClosePriceHistoryModal,
    record,
}) => {
    const [historyList, setHistoryList] = useState([])

    useEffect(() => {
        if (record === null) {
            return
        }
        priceHistoryService
            .getPriceHistoryOfVaccine(record?.vaccineResponse.vaccineId)
            .then((response) => setHistoryList(response.data.result))
            .catch((error) => console.log('Loi lay LS'))
    }, [record])

    return (
        <Modal
            open={visiblePriceHistoryModal}
            onCancel={handleClosePriceHistoryModal}
            title={
                <div className="text-center">
                    Lịch sử thay đổi giá {record?.vaccineResponse.vaccineName}
                </div>
            }
            footer={false}
            width={600}
        >
            <Table
                columns={historyColumns}
                dataSource={historyList}
                bordered
                rowKey={'priceHistoryId'}
            />
        </Modal>
    )
}
