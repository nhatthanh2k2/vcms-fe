import { Modal } from 'antd'
import React from 'react'
import { MyAppointmentTable, MyOrderTable, VaccinationHistoryTable } from '../../customer'
import { CustomerInfo } from '.'

export const CustomerDetailModal = ({
    visibleCustomerDetailModal,
    handleCloseCustomerDetailModal,
    customerSelected,
    vaccinationList,
    appointmentList,
    orderList,
}) => {
    return (
        <Modal
            open={visibleCustomerDetailModal}
            onCancel={handleCloseCustomerDetailModal}
            title={
                <div className="text-center text-lg font-semibold">
                    Thông tin chi tiết khách hàng
                </div>
            }
            footer={null}
            width={1200}
        >
            <div role="tablist" className="tabs tabs-lifted">
                <input
                    type="radio"
                    name="customer_info"
                    role="tab"
                    className="tab text-nowrap font-bold text-teal-700"
                    aria-label="Lịch sử tiêm chủng"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <CustomerInfo customer={customerSelected} />
                </div>
                <input
                    type="radio"
                    name="customer_info"
                    role="tab"
                    className="tab text-nowrap font-bold text-teal-700"
                    aria-label="Lịch sử tiêm chủng"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <VaccinationHistoryTable vaccinationRecordList={vaccinationList} />
                </div>

                <input
                    type="radio"
                    name="customer_info"
                    role="tab"
                    className="tab text-nowrap font-bold text-teal-700"
                    aria-label="Lịch hẹn"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <MyAppointmentTable myAppointmentList={appointmentList} />
                </div>

                <input
                    type="radio"
                    name="customer_info"
                    role="tab"
                    className="tab text-nowrap font-bold text-teal-700"
                    aria-label="Đơn hàng"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                    <MyOrderTable myOrderList={orderList} />
                </div>
            </div>
        </Modal>
    )
}
