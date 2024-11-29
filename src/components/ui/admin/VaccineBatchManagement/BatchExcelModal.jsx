import { Modal, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { batchDetailService } from '@/services'
import { MyToast } from '../../common'

const transformData = (data) => {
    const today = dayjs().format('DD-MM-YYYY')

    return data.map((item) => ({
        'Mã vắc xin': item.vaccineResponse.vaccineCode,
        'Tên vắc xin': item.vaccineResponse.vaccineName,
        'Số lượng(liều)': 0,
        Giá: 0,
        'Ngày sản xuất': today,
        'Ngày hết hạn': today,
    }))
}

const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `${fileName}.xlsx`)
}

export const BatchExcelModal = ({ visibleBatchExcelModal, handleCloseBatchExcelModal }) => {
    const [batchSample, setBatchSample] = useState([])
    const [selectedSamples, setSelectedSamples] = useState([])

    const handleCheckboxChange = (isChecked, sample) => {
        const updatedSamples = batchSample.map((item) =>
            item.batchDetailId === sample.batchDetailId ? { ...item, isChecked } : item
        )
        setBatchSample(updatedSamples)

        if (isChecked) {
            setSelectedSamples((prev) => [...prev, sample])
        } else {
            setSelectedSamples((prev) =>
                prev.filter((item) => item.batchDetailId !== sample.batchDetailId)
            )
        }
    }

    const handleCloseModal = () => {
        const resetSamples = batchSample.map((item) => ({ ...item, isChecked: false }))
        setBatchSample(resetSamples)
        setSelectedSamples([])
        handleCloseBatchExcelModal()
    }

    const handleExportFile = () => {
        const transformedData = transformData(selectedSamples)
        exportToExcel(transformedData, 'Mau_lo_vac_xin')
    }

    useEffect(() => {
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => {
                const samplesWithCheckboxState = response.data.result.map((item) => ({
                    ...item,
                    isChecked: false,
                }))
                setBatchSample(samplesWithCheckboxState)
            })
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy lô mẫu.'))
    }, [])

    const handleSelectAll = (isChecked) => {
        const updatedSamples = batchSample.map((item) => ({ ...item, isChecked }))
        setBatchSample(updatedSamples)

        if (isChecked) {
            setSelectedSamples(batchSample)
        } else {
            setSelectedSamples([])
        }
    }

    const batchDetailColumns = [
        {
            title: 'Mã vắc xin',
            dataIndex: ['vaccineResponse', 'vaccineCode'],
            key: 'vaccineCode',
        },
        {
            title: 'Tên vắc xin',
            dataIndex: ['vaccineResponse', 'vaccineName'],
            key: 'vaccineName',
        },
        {
            title: 'Nguồn gốc',
            dataIndex: ['vaccineResponse', 'vaccineOrigin'],
            key: 'vaccineOrigin',
        },
        {
            title: 'Phòng bệnh',
            dataIndex: ['diseaseResponse', 'diseaseName'],
            key: 'diseaseName',
        },
        {
            title: (
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-accent"
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            checked={batchSample.every((item) => item.isChecked)}
                        />
                    </label>
                </div>
            ),
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-accent"
                            checked={record.isChecked}
                            onChange={(e) => handleCheckboxChange(e.target.checked, record)}
                        />
                    </label>
                </div>
            ),
        },
    ]

    return (
        <Modal
            title={
                <div className="text-center text-2xl text-teal-500 font-bold">
                    Tạo file excel nhập hàng
                </div>
            }
            open={visibleBatchExcelModal}
            onCancel={handleCloseModal}
            footer={
                <div>
                    <button className="btn" onClick={handleExportFile}>
                        Xuất file
                    </button>
                </div>
            }
            width={1200}
            style={{ top: 20, maxHeight: '80vh' }}
            styles={{
                body: {
                    overflowY: 'auto',
                    maxHeight: '75vh',
                    height: '75vh',
                },
            }}
        >
            <Table dataSource={batchSample} columns={batchDetailColumns} rowKey={'batchDetailId'} />
        </Modal>
    )
}
