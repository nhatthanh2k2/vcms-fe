import { fetchAllVaccines } from '@/redux'
import { vaccinationRecordService } from '@/services'
import { disabledDoB, phoneNumberPattern } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

const addHistorySchema = z.object({
    customerIdentifier: z
        .string()
        .min(10, { message: 'Mã KH hoặc SĐT tối thiểu 10 ký tự' })
        .refine((value) => phoneNumberPattern.test(value) || value.length > 5, {
            message: 'Mã KH hoặc SĐT không hợp lệ',
        }),
    customerDob: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }),
    vaccineCode: z.string().nonempty('Vui lòng chọn vắc xin.'),
    vaccinationRecordDate: z.date({ invalid_type_error: 'Vui lòng chọn thời gian tiêm.' }),
    vaccinationRecordDosage: z.string().nonempty('Vui lòng chọn liều lượng.'),
    vaccinationRecordDose: z.string().nonempty('Vui lòng chọn mũi tiêm.'),
})

export const AddVaccinationHistoryModal = ({
    employee,
    visibleAddVaccinationHistoryModal,
    handleCloseAddVaccinationHistoryModal,
}) => {
    const { vaccineList } = useSelector((state) => state.vaccine)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllVaccines())
    }, [dispatch])

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addHistorySchema),
        defaultValues: {
            customerIdentifier: '',
            customerDob: null,
            vaccineCode: '',
            vaccinationRecordDate: null,
            vaccinationRecordDosage: '',
            vaccinationRecordDose: '',
        },
    })

    const onSubmit = async (data) => {
        //console.log('Form Data:', data)
        const request = {
            ...data,
            customerDob: data.customerDob ? dayjs(data.customerDob).format('DD-MM-YYYY') : null,
            vaccinationRecordDate: data.vaccinationRecordDate
                ? dayjs(data.vaccinationRecordDate).format('DD-MM-YYYY')
                : null,
            employeeUsername: employee?.employeeProfile.employeeUsername,
        }
        const response = await vaccinationRecordService.createVaccinationRecordFromHandbook(request)
        console.log(response.data.result)
    }

    const handleCloseModal = () => {
        reset()
        handleCloseAddVaccinationHistoryModal()
    }

    return (
        <Modal
            open={visibleAddVaccinationHistoryModal}
            onCancel={handleCloseModal}
            title={
                <div className="text-center text-lg font-semibold text-teal-500">
                    Thêm lịch sử tiêm từ sổ tay khách hàng
                </div>
            }
            footer={null}
            width={800}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-5">
                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="block mb-1 font-medium">Nhập Mã KH / SĐT:</label>
                        <input
                            {...register('customerIdentifier')}
                            type="text"
                            className="input input-bordered input-info w-full input-sm"
                        />
                        {errors.customerIdentifier && (
                            <p className="text-red-500 text-sm">
                                {errors.customerIdentifier.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="block mb-1 font-medium">Ngày/tháng/năm sinh:</label>
                        <DatePicker
                            disabledDate={disabledDoB}
                            format="DD-MM-YYYY"
                            onChange={(date) => setValue('customerDob', date?.toDate())}
                            value={watch('customerDob') ? dayjs(watch('customerDob')) : null}
                        />
                        {errors.customerDob && (
                            <p className="text-red-500 text-sm">{errors.customerDob.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="font-semibold">Vắc xin:</label>
                        <Select
                            placeholder="Chọn vắc xin"
                            options={vaccineList.map((vaccine) => ({
                                label: vaccine.vaccineName,
                                value: vaccine.vaccineCode,
                            }))}
                            onChange={(value) => setValue('vaccineCode', value)}
                            value={watch('vaccineCode') ? getValues('vaccineCode') : null}
                        />
                        {errors.vaccineCode && (
                            <p className="text-red-500 text-sm">{errors.vaccineCode.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="font-semibold">Thời gian tiêm:</label>
                        <DatePicker
                            disabledDate={disabledDoB}
                            format="DD-MM-YYYY"
                            onChange={(date) => setValue('vaccinationRecordDate', date?.toDate())}
                            value={
                                watch('vaccinationRecordDate')
                                    ? dayjs(watch('vaccinationRecordDate'))
                                    : null
                            }
                        />
                        {errors.vaccinationRecordDate && (
                            <p className="text-red-500 text-sm">
                                {errors.vaccinationRecordDate.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="font-semibold">Liều lượng:</label>
                        <Select
                            placeholder="Chọn liều lượng"
                            options={[
                                { value: '0.1 ml', label: '0.1 ml' },
                                { value: '0.5 ml', label: '0.5 ml' },
                                { value: '1 ml', label: '1 ml' },
                            ]}
                            onChange={(value) => setValue('vaccinationRecordDosage', value)}
                            value={
                                watch('vaccinationRecordDosage')
                                    ? getValues('vaccinationRecordDosage')
                                    : null
                            }
                        />
                        {errors.vaccinationRecordDosage && (
                            <p className="text-red-500 text-sm">
                                {errors.vaccinationRecordDosage.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2 flex-1">
                        <label className="font-semibold">Mũi tiêm:</label>
                        <Select
                            placeholder="Chọn mũi tiêm"
                            options={[
                                { value: 'Mũi 1', label: 'Mũi 1' },
                                { value: 'Mũi 2', label: 'Mũi 2' },
                                { value: 'Mũi 3', label: 'Mũi 3' },
                                { value: 'Mũi 4', label: 'Mũi 4' },
                                { value: 'Mũi nhắc lại', label: 'Mũi nhắc lại' },
                            ]}
                            onChange={(value) => setValue('vaccinationRecordDose', value)}
                            value={
                                watch('vaccinationRecordDose')
                                    ? getValues('vaccinationRecordDose')
                                    : null
                            }
                        />
                        {errors.vaccinationRecordDose && (
                            <p className="text-red-500 text-sm">
                                {errors.vaccinationRecordDose.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                        Thêm lịch sử tiêm
                    </button>
                </div>
            </form>
        </Modal>
    )
}
