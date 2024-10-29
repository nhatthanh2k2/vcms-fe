import { Modal } from 'antd'
import React from 'react'

export const AddDiseaseModal = ({ visibleOpenAddDiseaseModal, handleCloseAddDiseaseModal }) => {
    return (
        <Modal
            open={visibleOpenAddDiseaseModal}
            onCancel={handleCloseAddDiseaseModal}
            footer={false}
            title={<div className="text-center font-bold text-xl text-teal-500">Thêm bệnh mới</div>}
        >
            <div>
                <form className="space-y-3">
                    <label className="font-semibold">Tên bệnh:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Lưu bệnh</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentcolor"
                                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
