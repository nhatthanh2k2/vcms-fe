import { Modal } from 'antd'
import React, { useState } from 'react'

export const AddVaccineBatchModal = ({
    visibleAddVaccineBatchModal,
    handleCloseAddVaccineBatchModal,
    handleGetVaccineBatchList,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <Modal
            title={
                <div className="text-center text-2xl text-teal-500 font-bold">
                    Nhập lô vắc xin mới
                </div>
            }
            open={visibleAddVaccineBatchModal}
            onCancel={handleCloseAddVaccineBatchModal}
            footer={false}
            width={600}
        >
            <form className="flex flex-col pt-5 space-y-5">
                <div className="flex items-center space-x-5 ">
                    <label className="font-semibold w-1/3">Số lô vắc xin:</label>
                    <input
                        type="text"
                        className="input input-bordered input-success w-2/3 input-sm"
                    />
                </div>

                <div className="flex items-center space-x-5 ">
                    <label className="font-semibold w-1/3">Số lượng vắc xin trong lô:</label>
                    <input
                        type="text"
                        className="input input-bordered input-success w-2/3 input-sm"
                    />
                </div>

                <div className="flex items-center space-x-5 ">
                    <label className="font-semibold w-1/3">Giá trị lô vắc xin:</label>
                    <input
                        type="text"
                        className="input input-bordered input-success w-2/3 input-sm"
                    />
                </div>

                <div className="flex items-center space-x-5 ">
                    <label className="font-semibold w-1/3">Chọn file để nhập:</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        className="file-input file-input-bordered file-input-success w-2/3 max-w-xs file-input-sm"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Nhập lô vắc xin</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" // You can adjust the size as needed
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isHovered ? '#FFFFFF' : '#000000'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 3v12"></path>
                            <path d="M8 11l4 4 4-4"></path>
                            <path d="M8 5H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-4"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </Modal>
    )
}
