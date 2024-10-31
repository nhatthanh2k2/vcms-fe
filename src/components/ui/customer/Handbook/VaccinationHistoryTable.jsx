import React from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: 'Tên vắc xin',
        dataIndex: 'vaccineName',
        key: 'vaccineName',
    },
    {
        title: 'Gói vắc xin',
        dataIndex: 'vaccinePackageName',
        key: 'vaccinePackageName',
    },
    {
        title: 'Ngày tiêm',
        dataIndex: 'vaccinationRecordDate',
        key: 'vaccinationRecordDate',
    },
    {
        title: 'Mũi tiêm',
        dataIndex: 'vaccinationRecordDose',
        key: 'vaccinationRecordDose',
    },
    {
        title: 'Liều lượng',
        dataIndex: 'vaccinationRecordDosage',
        key: 'vaccinationRecordDosage',
    },
]
export const VaccinationHistoryTable = ({ vaccinationRecordList }) => {
    return (
        <div>
            <Table
                title={() => (
                    <div className="text-center text-teal-500 font-bold text-2xl">
                        Lịch sử tiêm vắc xin tại trung tâm
                    </div>
                )}
                columns={columns}
                dataSource={vaccinationRecordList}
                locale={{
                    emptyText: (
                        <div className="flex flex-col items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{ filter: 'blur(1px)' }}
                            >
                                <path fill="#fff" d="M0 0h24v24H0z" />
                                <path
                                    stroke="#000"
                                    strokeLinejoin="round"
                                    d="m3 15 .924-11.083A1 1 0 0 1 4.92 3h14.16a1 1 0 0 1 .996.917L21 15M3 15v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5M3 15h6c0 1 .6 3 3 3s3-2 3-3h6"
                                />
                            </svg>
                            <p>Chưa có dữ liệu</p>
                        </div>
                    ),
                }}
            />
        </div>
    )
}
