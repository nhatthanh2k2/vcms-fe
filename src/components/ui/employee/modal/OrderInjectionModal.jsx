import { Modal } from 'antd'
import React from 'react'

export const OrderInjectionModal = ({
    visibleInjectionModal,
    handleCloseVaccinationInjectionModal,
    patient,
}) => {
    const handleCancel = () => {
        handleCloseVaccinationInjectionModal()
    }

    return (
        <div>
            <Modal
                title={
                    <div className="text-center font-bold text-xl">Phiếu tiêm chủng vắc xin</div>
                }
                open={visibleInjectionModal}
                onCancel={handleCloseVaccinationInjectionModal}
                footer={null}
                width={1000}
                style={{
                    top: 10,
                }}
            >
                <form className="space-y-2">
                    <div>
                        <span className=" uppercase text-base font-bold">Thông tin khách hàng</span>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Họ và tên:</label>
                                <input
                                    value={patient?.customerFullName}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Số điện thoại:</label>
                                <input
                                    value={patient?.customerPhone}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Ngày sinh:</label>
                                <input
                                    value={patient?.customerDob}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className=" uppercase text-base font-bold">Thông tin vắc xin</span>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
