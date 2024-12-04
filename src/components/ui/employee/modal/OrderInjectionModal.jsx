import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    batchDetailService,
    vaccinationRecordService,
    vaccineBatchService,
    vaccinePackageService,
} from '@/services'
import { MyToast } from '../../common'
import { convertPaymentType } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetailList } from '@/redux'

const orderInjectionSchema = z.object({
    vaccineId: z
        .number()
        .int()
        .positive()
        .nullable()
        .refine((val) => val !== null, {
            message: 'Chưa chọn vắc xin',
        }),
    vaccinePackageId: z
        .number()
        .int()
        .nullable()
        .refine((val) => val !== null, {
            message: 'Chưa chọn gói vắc xin',
        }),
    injectionType: z.string().min(1, { message: 'Chưa chọn liều lượng' }),
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
})

export const OrderInjectionModal = ({
    visibleOrderInjectionModal,
    handleCloseOrderInjectionModal,
    orderRecord,
    //orderDetailList,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
        clearErrors,
        watch,
    } = useForm({
        resolver: zodResolver(orderInjectionSchema),
        defaultValues: {
            vaccineId: null,
            vaccineBatchId: null,
            vaccinePackageId: -1,
            injectionType: '',
            dosage: '',
            dose: '',
        },
    })

    const dispatch = useDispatch()
    const { orderDetailList } = useSelector((state) => state.order)

    useEffect(() => {
        if (orderRecord) {
            dispatch(fetchOrderDetailList(orderRecord?.orderId))
        }
    }, [dispatch, orderRecord])

    const [vaccineBatchList, setVaccineBatchList] = useState([])
    const [batchDetailList, setBatchDetailList] = useState([])
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))

    const batchDetailData = orderDetailList.filter(
        (orderDetail) => orderDetail.batchDetailResponse !== null
    )
    const vaccinePackageData = orderDetailList.filter(
        (detail) => detail.vaccinePackageResponse !== null
    )

    const [vaccineData, setVaccineData] = useState([])

    useEffect(() => {
        vaccineBatchService
            .getAllBatch()
            .then((response) => setVaccineBatchList(response.data.result))
            .catch((error) => MyToast('error', 'Lỗi lấy lô hàng.'))
        batchDetailService
            .getDetailOfSampleBatch()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
    }, [])

    useEffect(() => {
        if (getValues('vaccinePackageId') !== null && getValues('vaccinePackageId') !== -1) {
            vaccinePackageService
                .getDetailsOfPackage(getValues('vaccinePackageId'))
                .then((response) => setVaccineData(response.data.result))
                .catch((error) => console.error('Lỗi lấy chi tiết gói.'))
        }
    }, [getValues('vaccinePackageId')])

    const onSubmit = async (data) => {
        try {
            const creationRequest = {
                customerPhone: orderRecord.orderCustomerPhone,
                customerDob: orderRecord.orderCustomerDob,
                employeeUsername: employee.employeeProfile.employeeUsername,
                vaccineId: data.vaccineId,
                vaccinePackageId: data.vaccinePackageId,
                vaccineBatchId: data.vaccineBatchId,
                vaccinationRecordType: data.injectionType,
                vaccinationRecordDosage: data.dosage,
                vaccinationRecordDose: data.dose,
                vaccinationRecordTotal: vaccinePrice,
                vaccinationRecordPayment: orderRecord?.orderPayment,
                vaccinationRecordReceiptSource: 'ORDER',
            }
            const response = await vaccinationRecordService.createVaccinationRecord(creationRequest)
            if (response.data.code === 1000) MyToast('success', 'Tạo phiếu tiêm thành công.')
            else MyToast('error', 'Xảy ra lỗi khi tạo phiếu tiêm.')
        } catch (error) {
            MyToast('error', 'Số lượng vắc xin trong lô không đủ hãy chọn lô khác.')
        }
    }

    const [vaccinePrice, setVaccinePrice] = useState(0)
    useEffect(() => {
        const detail = batchDetailList.find(
            (detail) => detail.vaccineResponse.vaccineId === getValues('vaccineId')
        )
        setVaccinePrice(detail?.batchDetailVaccinePrice)
    }, [getValues('vaccineId')])

    const handleCloseModal = () => {
        handleCloseOrderInjectionModal()
        reset()
    }

    return (
        <div>
            <Modal
                title={
                    <div className="text-center font-bold text-xl">Phiếu tiêm chủng vắc xin</div>
                }
                open={visibleOrderInjectionModal}
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
                                    value={orderRecord?.orderCustomerFullName}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Số điện thoại:</label>
                                <input
                                    value={orderRecord?.orderCustomerPhone}
                                    readOnly
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Ngày sinh người tiêm:</label>
                                <input
                                    value={orderRecord?.orderCustomerDob}
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
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Hình thức tiêm:</label>
                                <Select
                                    placeholder="Chọn hình thức tiêm"
                                    options={[
                                        {
                                            value: 'SINGLE',
                                            label: <span>Tiêm vắc xin lẻ</span>,
                                        },
                                        {
                                            value: 'PACKAGE',
                                            label: <span>Tiêm theo gói</span>,
                                        },
                                    ]}
                                    {...register('injectionType')}
                                    onChange={(value) => {
                                        setValue('injectionType', value)
                                        clearErrors('injectionType')
                                    }}
                                    value={watch('injectionType') || null}
                                />
                                {errors.injectionType && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.injectionType.message}
                                    </span>
                                )}
                            </div>

                            {watch('injectionType') === 'SINGLE' && (
                                <>
                                    <div className="flex-1 flex flex-col space-y-2">
                                        <label className="font-semibold">Tên vắc xin:</label>
                                        <Select
                                            options={batchDetailData.map((detail, index) => ({
                                                value: detail?.batchDetailResponse.vaccineResponse
                                                    .vaccineId,
                                                label: (
                                                    <span key={index}>
                                                        {
                                                            detail?.batchDetailResponse
                                                                .vaccineResponse.vaccineName
                                                        }
                                                    </span>
                                                ),
                                            }))}
                                            placeholder="Chọn vắc xin"
                                            {...register('vaccineId')}
                                            onChange={(value) => {
                                                setValue('vaccineId', value)
                                                clearErrors('vaccineId')
                                            }}
                                            value={watch('vaccineId') || null}
                                        />
                                        {errors.vaccineId && (
                                            <span className="text-red-500 font-semibold">
                                                {errors.vaccineId.message}
                                            </span>
                                        )}
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
                                </>
                            )}

                            {watch('injectionType') === 'PACKAGE' && (
                                <>
                                    <div className="flex-1 flex flex-col space-y-2">
                                        <label className="font-semibold">Tên vắc xin:</label>
                                        <Select
                                            options={vaccineData.map((vaccine, index) => ({
                                                value: vaccine?.vaccineResponse.vaccineId,
                                                label: (
                                                    <span key={index}>
                                                        {vaccine?.vaccineResponse.vaccineName}
                                                    </span>
                                                ),
                                            }))}
                                            placeholder="Chọn gói vắc xin trước"
                                            {...register('vaccineId')}
                                            onChange={(value) => {
                                                setValue('vaccineId', value)
                                                clearErrors('vaccineId')
                                            }}
                                            value={watch('vaccineId') || null}
                                        />
                                        {errors.vaccineId && (
                                            <span className="text-red-500 font-semibold">
                                                {errors.vaccineId.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col space-y-2">
                                        <label className="font-semibold">Gói vắc xin:</label>
                                        <Select
                                            options={vaccinePackageData.map((pack, index) => ({
                                                value: pack?.vaccinePackageResponse
                                                    .vaccinePackageId,
                                                label: (
                                                    <span key={index}>
                                                        {
                                                            pack?.vaccinePackageResponse
                                                                .vaccinePackageName
                                                        }
                                                    </span>
                                                ),
                                            }))}
                                            {...register('vaccinePackageId')}
                                            onChange={(value) => {
                                                setValue('vaccinePackageId', value)
                                                clearErrors('vaccinePackageId')
                                            }}
                                            placeholder="Chọn gói vắc xin"
                                        />
                                        {errors.vaccinePackageId && (
                                            <span className="text-red-500 font-semibold">
                                                {errors.vaccinePackageId.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

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
                                <input
                                    type="text"
                                    value={
                                        vaccinePrice ? vaccinePrice?.toLocaleString() + ' VND' : ''
                                    }
                                    readOnly
                                    className="input input-bordered input-info w-full input-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Phương thức thanh toán:</label>
                                <input
                                    type="text"
                                    value={convertPaymentType(orderRecord?.orderPayment)}
                                    readOnly
                                    className="input input-bordered input-info w-full input-sm"
                                />
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
