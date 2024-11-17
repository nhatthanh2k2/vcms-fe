import React, { useRef } from 'react'
import { Modal } from 'antd'
import { useReactToPrint } from 'react-to-print'

export const PrintScreeningRecordModal = ({
    visiblePrintScreeningRecordModal,
    handleClosePrintScreeningRecordModal,
    screeningRecordSelected,
}) => {
    const screeningRecordRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => screeningRecordRef.current,
        copyStyles: true,
    })

    return (
        <Modal
            title={
                <div className=" flex gap-5 items-center h-fit">
                    <button
                        onClick={handlePrint}
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-teal-500 hover:border-teal-600 hover:bg-teal-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
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
            open={visiblePrintScreeningRecordModal}
            onCancel={handleClosePrintScreeningRecordModal}
            footer={null}
            width={1000}
            style={{ top: 20, maxHeight: '90vh' }}
            styles={{
                body: {
                    overflowY: 'auto',
                    maxHeight: '85vh',
                    height: '85vh',
                },
            }}
        >
            {screeningRecordSelected && (
                <div
                    ref={screeningRecordRef}
                    className="flex flex-col space-y-4 px-10 py-5 border-2 border-black rounded-lg"
                >
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center items-center">
                            <img src="./images/logo.png" className="h-16 object-cover" />
                            <p className="font-bold uppercase">Trung tâm tiêm chủng T-vax</p>
                        </div>
                        <div className="flex items-center justify-center mx-auto">
                            <p className="font-bold text-2xl uppercase text-center">
                                phiếu khám sàng lọc
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Thông tin người khám</span>
                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Họ và tên: </span>
                                {screeningRecordSelected?.customerResponse.customerFullName}
                            </span>
                            <span>
                                <span className="font-bold">Ngày sinh: </span>
                                {screeningRecordSelected?.customerResponse.customerDob}
                            </span>
                            <span>
                                <span className="font-bold">Giới tính: </span>
                                {screeningRecordSelected?.customerResponse.customerGender === 'MALE'
                                    ? 'Nam'
                                    : 'Nữ'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Số điện thoại: </span>
                                {screeningRecordSelected?.customerResponse.customerPhone}
                            </span>
                            <span>
                                <span className="font-bold">Địa chỉ: </span>
                                {screeningRecordSelected?.customerResponse.customerProvince &&
                                screeningRecordSelected?.customerResponse.customerDistrict &&
                                screeningRecordSelected?.customerResponse.customerWard
                                    ? screeningRecordSelected.customerResponse.customerWard +
                                      ', ' +
                                      screeningRecordSelected.customerResponse.customerDistrict +
                                      ', ' +
                                      screeningRecordSelected.customerResponse.customerProvince
                                    : ''}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Tình trạng sức khỏe</span>
                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Chiều cao (m): </span>
                                {screeningRecordSelected?.screeningRecordHeight}
                            </span>
                            <span>
                                <span className="font-bold">Cân nặng (Kg): </span>
                                {screeningRecordSelected?.screeningRecordWeight}
                            </span>
                            <span>
                                <span className="font-bold">Huyết áp (mmHg): </span>
                                {screeningRecordSelected?.screeningRecordBloodPressure}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Nhịp tim (bpm): </span>
                                {screeningRecordSelected?.screeningRecordHeartRate}
                            </span>
                            <span>
                                <span className="font-bold">
                                    Tình trạng hô hấp (lần thở/phút):{' '}
                                </span>
                                {screeningRecordSelected?.screeningRecordRespiratoryRate}
                            </span>
                            <span>
                                <span className="font-bold">Nhiệt độ cơ thể (°C): </span>
                                {screeningRecordSelected?.screeningRecordTemperature}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Tìền sử bệnh lý</span>
                        <div className="flex">
                            <span className="flex-1">
                                <span className="font-bold">Các bệnh mãn tính: </span>
                                {screeningRecordSelected?.screeningRecordChronicDiseases}
                            </span>
                            <span className="flex-1">
                                <span className="font-bold">Dị ứng: </span>
                                {screeningRecordSelected?.screeningRecordAllergies}
                            </span>
                        </div>

                        <div className="flex">
                            <span className="flex-1">
                                <span className="font-bold">Thuốc đang sử dụng: </span>
                                {screeningRecordSelected?.screeningRecordCurrentMedications}
                            </span>
                            <span className="flex-1">
                                <span className="font-bold"> Các triệu chứng bất thường: </span>
                                {screeningRecordSelected?.screeningRecordAbnormalSymptoms}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 text-base space-y-2">
                        <span className="font-bold text-lg uppercase ">Kết quả sàng lọc</span>
                        <div className="flex justify-between">
                            <span>
                                <span className="font-bold">Ghi chú bổ sung: </span>
                                {screeningRecordSelected?.screeningRecordNotes}
                            </span>
                            <span>
                                <span className="font-bold">Kết quả: </span>
                                {screeningRecordSelected?.screeningRecordResult === 'ELIGIBLE'
                                    ? 'Đủ điều kiện tiêm'
                                    : 'Chưa đủ điều kiện tiêm'}
                            </span>
                            <span>
                                <span className="font-bold">Ngày khám: </span>
                                {screeningRecordSelected?.screeningRecordDate}
                            </span>
                        </div>

                        <div className="flex items-end justify-end  pt-5">
                            <div className="flex flex-col">
                                <span className="font-bold">Người thực hiện khám sàng lọc</span>
                                <span className="text-center italic">(Ký, ghi rõ họ tên)</span>
                                <span className="text-center mt-10 font-bold">
                                    {
                                        screeningRecordSelected?.employeeResponse
                                            .employeeQualification
                                    }
                                    . {screeningRecordSelected?.employeeResponse.employeeFullName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}
