import React, { useRef } from 'react'
import { Modal } from 'antd'
import { convertPaymentType } from '@/utils'
import { useReactToPrint } from 'react-to-print'

export const PrintVaccinationRecordModal = ({
    visiblePrintVaccinationRecordModal,
    handleClosePrintVaccinationRecordModal,
    vaccinationRecordSelected,
}) => {
    const vaccinationRecordRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => vaccinationRecordRef.current,
        copyStyles: true,
    })

    return (
        <Modal
            title={
                <div className=" flex  gap-5 items-center h-fit">
                    <button
                        onClick={handlePrint}
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">In phiếu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 18h-.8c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8v-4.6c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 7 5.08 7 6.2 7H7m10 11h.8c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 16.48 21 15.92 21 14.8v-4.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 7 18.92 7 17.8 7H17M7 11h.01M17 7V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 3 15.96 3 15.4 3H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 3.76 7 4.04 7 4.6V7m10 0H7m1.6 14h6.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C17 20.24 17 19.96 17 19.4v-2.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C16.24 15 15.96 15 15.4 15H8.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C7 15.76 7 16.04 7 16.6v2.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C7.76 21 8.04 21 8.6 21Z"
                            />
                        </svg>
                    </button>
                </div>
            }
            open={visiblePrintVaccinationRecordModal}
            onCancel={handleClosePrintVaccinationRecordModal}
            footer={null}
            width={900}
            style={{ top: 20, maxHeight: '90vh' }}
            styles={{
                body: {
                    overflowY: 'auto',
                    maxHeight: '80vh',
                    height: '80vh',
                },
            }}
        >
            {vaccinationRecordSelected && (
                <div ref={vaccinationRecordRef} className="flex flex-col space-y-2 px-10 py-5 ">
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center items-center">
                            <img src="./images/logo.png" className="h-16 object-cover" />
                            <p className="font-bold uppercase">Trung tâm tiêm chủng T-vax</p>
                        </div>
                        <div className="flex items-center justify-center mx-auto">
                            <p className="font-bold text-2xl uppercase text-center">
                                phiếu tiêm vắc xin
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Thông tin người tiêm</span>
                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Họ và tên: </span>
                                {vaccinationRecordSelected?.customerResponse.customerFullName}
                            </span>
                            <span>
                                <span className="font-bold">Ngày sinh: </span>
                                {vaccinationRecordSelected?.customerResponse.customerDob}
                            </span>
                            <span>
                                <span className="font-bold">Giới tính: </span>
                                {vaccinationRecordSelected?.customerResponse.customerGender ===
                                'MALE'
                                    ? 'Nam'
                                    : 'Nữ'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Số điện thoại: </span>
                                {vaccinationRecordSelected?.customerResponse.customerPhone}
                            </span>
                            <span>
                                <span className="font-bold">Địa chỉ: </span>
                                {vaccinationRecordSelected?.customerResponse.customerProvince &&
                                vaccinationRecordSelected?.customerResponse.customerDistrict &&
                                vaccinationRecordSelected?.customerResponse.customerWard
                                    ? vaccinationRecordSelected.customerResponse.customerWard +
                                      ', ' +
                                      vaccinationRecordSelected.customerResponse.customerDistrict +
                                      ', ' +
                                      vaccinationRecordSelected.customerResponse.customerProvince
                                    : ''}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Thông tin vắc xin</span>
                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Loại hình tiêm: </span>
                                {vaccinationRecordSelected?.vaccinationRecordType === 'PACKAGE'
                                    ? 'Tiêm theo gói'
                                    : 'Tiêm vắc xin lẻ'}
                            </span>
                            <span>
                                <span className="font-bold">Tên vắc xin: </span>
                                {vaccinationRecordSelected?.vaccineName}
                            </span>
                        </div>

                        <div>
                            <span>
                                <span className="font-bold">Gói vắc xin: </span>
                                {vaccinationRecordSelected?.vaccinePackageName}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Mũi tiêm: </span>
                                {vaccinationRecordSelected?.vaccinationRecordDose}
                            </span>
                            <span>
                                <span className="font-bold">Liều lượng:</span>
                                {vaccinationRecordSelected?.vaccinationRecordDosage}
                            </span>
                            <span>
                                <span className="font-bold">Mã lô vắc xin: </span>
                                {vaccinationRecordSelected?.vaccineBatchNumber}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Ngày tiêm: </span>
                                {vaccinationRecordSelected?.vaccinationRecordDate}
                            </span>
                            <span>
                                <span className="font-bold">Tổng tiền thanh toán: </span>
                                {vaccinationRecordSelected?.vaccinationRecordTotal}
                            </span>
                            <span>
                                <span className="font-bold">Phương thức thanh toán: </span>
                                {convertPaymentType(
                                    vaccinationRecordSelected?.vaccinationRecordPayment
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-end justify-end pt-5 text-base">
                        <div className="flex flex-col ">
                            <span className="font-bold">Người thực hiện tiêm vắc xin</span>
                            <span className="text-center italic">(Ký, ghi rõ họ tên)</span>
                            <span className="text-center mt-10 font-bold">
                                {vaccinationRecordSelected?.employeeResponse.employeeQualification}.{' '}
                                {vaccinationRecordSelected?.employeeResponse.employeeFullName}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}
