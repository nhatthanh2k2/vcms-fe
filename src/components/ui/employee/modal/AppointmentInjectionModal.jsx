import { Modal } from 'antd'
import React from 'react'

export const AppointmentInjectionModal = ({
    visibleAppointmentInjectionModal,
    handleCloseAppointmentInjectionModal,
    appointmentRecord,
}) => {
    const handleCancel = () => {
        handleCloseAppointmentInjectionModal()
    }

    console.log(appointmentRecord)

    return (
        <div>
            <Modal
                title={
                    <div className="text-center font-bold text-xl">Phiếu tiêm chủng vắc xin</div>
                }
                open={visibleAppointmentInjectionModal}
                onCancel={handleCloseAppointmentInjectionModal}
                footer={null}
                width={1000}
                style={{
                    top: 10,
                }}
            >
                <form className="space-y-5">
                    <div>
                        <span className=" uppercase text-base font-bold">Thông tin khách hàng</span>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Họ và tên người tiêm:</label>
                                <input
                                    value={appointmentRecord?.appointmentCustomerFullName}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Số điện thoại:</label>
                                <input
                                    value={appointmentRecord?.appointmentCustomerPhone}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Ngày sinh người tiêm:</label>
                                <input
                                    value={appointmentRecord?.appointmentCustomerDob}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className=" uppercase text-base font-bold">Thông tin dịch vụ</span>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Hình thức tiêm:</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={
                                        appointmentRecord?.appointmentInjectionType === 'SINGLE'
                                            ? 'Tiêm vắc xin lẻ'
                                            : 'Tiêm theo gói'
                                    }
                                    className="input input-bordered input-info input-sm w-full max-w-xs"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Tên vắc xin:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Gói vắc xin:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Liều lượng:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info input-sm w-full max-w-xs"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Mũi tiêm:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Lô vắc xin:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className=" uppercase text-base font-bold">Thông tin thanh toán</span>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Tổng số tiền:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Hình thức thanh toán:</label>
                                <input
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
