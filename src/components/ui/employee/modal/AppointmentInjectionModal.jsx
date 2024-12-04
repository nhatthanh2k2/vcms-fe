import {
    batchDetailService,
    vaccinationRecordService,
    vaccineBatchService,
    vaccinePackageService,
} from '@/services'
import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const appointmentInjectionSchema = z.object({
    dosage: z.string().min(1, { message: 'Chưa chọn liều lượng' }),
    dose: z.string().min(1, { message: 'Chưa chọn mũi tiêm' }),
    vaccineBatchId: z
        .number()
        .int()
        .positive()
        .nullable()
        .refine((val) => val !== null, {
            message: 'Chưa chọn lô vắc xin',
        }),
    payment: z.string().min(1, { message: 'Chưa chọn phương thức thanh toán' }),
})

export const AppointmentInjectionModal = ({
    visibleAppointmentInjectionModal,
    handleCloseAppointmentInjectionModal,
    appointmentRecord,
}) => {
    const [vaccineBatchList, setVaccineBatchList] = useState([])
    const [vaccineOfPackage, setVaccineOfPackage] = useState([])
    const [batchDetailList, setBatchDetailList] = useState([])
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    useEffect(() => {
        vaccineBatchService
            .getAllBatch()
            .then((response) => setVaccineBatchList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy lô hàng.'))
        // batchDetailService
        //     .getDetail()
        //     .then((response) => setBatchDetailList(response.data.result))
        //     .catch((error) => MyToast('error', 'Lỗi lấy chi tiết lô vắc xin'))
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
    }, [])

    useEffect(() => {
        if (appointmentRecord?.appointmentInjectionType === 'PACKAGE') {
            vaccinePackageService
                .getDetailsOfPackage(appointmentRecord?.vaccinePackageResponse.vaccinePackageId)
                .then((response) => setVaccineOfPackage(response.data.result))
                .catch((error) => MyToast('error', 'Lỗi lấy vắc xin trong gói.'))
        }
    }, [appointmentRecord])

    //console.log(appointmentRecord)

    const [vaccinePrice, setVaccinePrice] = useState(0)
    const [vaccineSelected, setVaccineSelected] = useState(null)

    useEffect(() => {
        const detail = batchDetailList.find(
            (detail) => detail.vaccineResponse.vaccineId === vaccineSelected
        )
        setVaccinePrice(detail?.batchDetailVaccinePrice)
    }, [vaccineSelected])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        clearErrors,
        watch,
    } = useForm({
        resolver: zodResolver(appointmentInjectionSchema),
        defaultValues: {
            dosage: '',
            dose: '',
            vaccineBatchId: null,
            payment: '',
        },
    })

    const onSubmit = async (data) => {
        //console.log(data)
        var request
        if (appointmentRecord?.appointmentInjectionType === 'SINGLE') {
            request = {
                customerPhone: appointmentRecord.appointmentCustomerPhone,
                customerDob: appointmentRecord.appointmentCustomerDob,
                employeeUsername: employee.employeeProfile.employeeUsername,
                vaccineId: appointmentRecord.batchDetailResponse.vaccineResponse.vaccineId,
                vaccinePackageId: '',
                vaccineBatchId: data.vaccineBatchId,
                vaccinationRecordType: 'SINGLE',
                vaccinationRecordDosage: data.dosage,
                vaccinationRecordDose: data.dose,
                vaccinationRecordTotal:
                    appointmentRecord.batchDetailResponse.batchDetailVaccinePrice,
                vaccinationRecordPayment: data.payment,
                vaccinationRecordReceiptSource: 'APPOINTMENT',
            }
        } else {
            request = {
                customerPhone: appointmentRecord.appointmentCustomerPhone,
                customerDob: appointmentRecord.appointmentCustomerDob,
                employeeUsername: employee.employeeProfile.employeeUsername,
                vaccineId: vaccineSelected,
                vaccinePackageId: appointmentRecord.vaccinePackageResponse.vaccinePackageId,
                vaccineBatchId: data.vaccineBatchId,
                vaccinationRecordType: 'PACKAGE',
                vaccinationRecordDosage: data.dosage,
                vaccinationRecordDose: data.dose,
                vaccinationRecordTotal: vaccinePrice,
                vaccinationRecordPayment: data.payment,
                vaccinationRecordReceiptSource: 'APPOINTMENT',
            }
        }
        console.log(response)

        try {
            const response = await vaccinationRecordService.createVaccinationRecord(request)
            if (response.data.code === 1000) MyToast('success', 'Tạo phiếu tiêm thành công.')
            else MyToast('error', 'Xảy ra lỗi khi tạo phiếu tiêm.')
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Số lượng vắc xin trong lô không đủ hãy chọn lô khác.')
            }
        }
    }

    const handleCloseModal = () => {
        handleCloseAppointmentInjectionModal()
        reset()
    }

    return (
        <div>
            <Modal
                title={
                    <div className="text-center font-bold text-xl">Phiếu tiêm chủng vắc xin</div>
                }
                open={visibleAppointmentInjectionModal}
                onCancel={handleCloseModal}
                footer={null}
                width={1000}
            >
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

                        {appointmentRecord?.appointmentInjectionType === 'SINGLE' ? (
                            <div className="flex flex-wrap gap-5">
                                <div className="flex-1 space-y-2">
                                    <label className="font-semibold">Hình thức tiêm:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Tiêm vắc xin lẻ"
                                        className="input input-bordered input-info input-sm w-full max-w-xs"
                                    />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <label className="font-semibold">Tên vắc xin:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={
                                            appointmentRecord?.batchDetailResponse.vaccineResponse
                                                .vaccineName
                                        }
                                        className="input input-bordered input-info w-full input-sm"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col space-y-2">
                                    <label className="font-semibold">Gói vắc xin:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Không có"
                                        className="input input-bordered input-info w-full input-sm"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-5">
                                <div className="flex-1 space-y-2">
                                    <label className="font-semibold">Hình thức tiêm:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value="Tiêm theo gói"
                                        className="input input-bordered input-info input-sm w-full max-w-xs"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 space-y-2">
                                    <label className="font-semibold">Tên vắc xin:</label>
                                    <Select
                                        options={vaccineOfPackage.map((vaccine, index) => ({
                                            value: vaccine.vaccineResponse.vaccineId,
                                            label: (
                                                <span key={index}>
                                                    {vaccine.vaccineResponse.vaccineName}
                                                </span>
                                            ),
                                        }))}
                                        onChange={(vaccineValue) => {
                                            setVaccineSelected(vaccineValue)
                                        }}
                                        placeholder="Chọn vắc xin"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col space-y-2">
                                    <label className="font-semibold">Gói vắc xin:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={
                                            appointmentRecord?.vaccinePackageResponse
                                                .vaccinePackageName
                                        }
                                        className="input input-bordered input-info w-full input-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Liều lượng:</label>
                                <Select
                                    options={[
                                        { value: '0.1 ml', label: <span>0.1 ml</span> },
                                        { value: '0.5 ml', label: <span>0.5 ml</span> },
                                        { value: '1 ml', label: <span>1 ml</span> },
                                    ]}
                                    {...register('dosage')}
                                    onChange={(value) => {
                                        setValue('dosage', value)
                                        clearErrors('dosage')
                                    }}
                                    value={watch('dosage') || null}
                                    placeholder="Chọn liều lượng"
                                />
                                {errors.dosage && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.dosage.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col flex-1 space-y-2">
                                <label className="font-semibold">Mũi tiêm:</label>
                                <Select
                                    options={[
                                        { value: 'Mũi 1', label: <span>Mũi 1</span> },
                                        { value: 'Mũi 2', label: <span>Mũi 2</span> },
                                        { value: 'Mũi 3', label: <span>Mũi 3</span> },
                                        { value: 'Mũi 4', label: <span>Mũi 4</span> },
                                        { value: 'Mũi 5', label: <span>Mũi 5</span> },
                                        { value: 'Mũi nhắc lại', label: <span>Mũi nhắc lại</span> },
                                    ]}
                                    {...register('dose')}
                                    onChange={(value) => {
                                        setValue('dose', value)
                                        clearErrors('dose')
                                    }}
                                    value={watch('dose') || null}
                                    placeholder="Chọn mũi tiêm"
                                />
                                {errors.dose && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.dose.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Lô vắc xin:</label>
                                <Select
                                    options={vaccineBatchList.map((batch, index) => ({
                                        value: batch.vaccineBatchId,
                                        label: <span key={index}>{batch.vaccineBatchNumber}</span>,
                                    }))}
                                    {...register('vaccineBatchId')}
                                    onChange={(value) => {
                                        setValue('vaccineBatchId', value)
                                        clearErrors('vaccineBatchId')
                                    }}
                                    value={watch('vaccineBatchId') || null}
                                    placeholder="Chọn lô vắc xin"
                                />
                                {errors.vaccineBatchId && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.vaccineBatchId.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Tổng số tiền:</label>
                                {appointmentRecord?.appointmentInjectionType === 'SINGLE' ? (
                                    <input
                                        type="text"
                                        readOnly
                                        value={
                                            appointmentRecord?.batchDetailResponse.batchDetailVaccinePrice.toLocaleString() +
                                            ' VND'
                                        }
                                        className="input input-bordered input-info w-full input-sm"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={
                                            vaccinePrice
                                                ? vaccinePrice?.toLocaleString() + ' VND'
                                                : ''
                                        }
                                        placeholder="Chọn vắc xin trong gói để xem tổng tiền"
                                        readOnly
                                        className="input input-bordered input-info w-full input-sm"
                                    />
                                )}
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Phương thức thanh toán:</label>
                                <Select
                                    options={[
                                        { value: 'CASH', label: <span>Tiền mặt</span> },
                                        { value: 'TRANSFER', label: <span>Chuyển khoản</span> },
                                    ]}
                                    {...register('payment')}
                                    onChange={(value) => {
                                        setValue('payment', value)
                                        clearErrors('payment')
                                    }}
                                    value={watch('payment') || null}
                                    placeholder="Chọn phương thức"
                                />
                                {errors.payment && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.payment.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Tạo phiếu tiêm</span>
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
            </Modal>
        </div>
    )
}
