import { screeningRecordService } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'antd'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyToast } from '../common'

const preInjectionCheckSchema = z.object({
    height: z
        .string()
        .refine((val) => val.trim() !== '', { message: 'Chiều cao không được để trống' })
        .refine((val) => parseFloat(val) >= 0, { message: 'Chiều cao không được âm' }),
    weight: z
        .string()
        .refine((val) => val.trim() !== '', { message: 'Cân nặng không được để trống' })
        .refine((val) => parseFloat(val) >= 0, { message: 'Cân nặng không được âm' }),
    bloodPressure: z.string().nonempty('Huyết áp không được để trống'),
    heartRate: z
        .string()
        .refine((val) => val.trim() !== '', { message: 'Nhịp tim không được để trống' })
        .refine((val) => parseFloat(val) >= 0, { message: 'Nhịp tim không được âm' }),
    bodyTemperature: z
        .string()
        .refine((val) => val.trim() !== '', { message: 'Nhiệt độ cơ thể không được để trống' })
        .refine((val) => parseFloat(val) >= 0, { message: 'Nhiệt độ cơ thể không được âm' }),
    respirationRate: z
        .string()
        .refine((val) => val.trim() !== '', { message: 'Tình trạng hô hấp không được để trống' })
        .refine((val) => parseFloat(val) >= 0, { message: 'Tình trạng hô hấp không được âm' }),
    chronicDiseases: z.string().default('Không'),
    allergies: z.string().default('Không'),
    medications: z.string().default('Không'),
    abnormalSymptoms: z.string().default('Không'),
    additionalNotes: z.string().default('Không'),
    screeningResult: z.string().min(1, { message: 'Mối quan hệ là bắt buộc' }),
})

export const PreInjectionCheckModal = ({
    visiblePreInjectionModal,
    handleClosePreInjectionCheckModal,
    patient,
}) => {
    const employee = JSON.parse(sessionStorage.getItem('employeeProfile'))
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(preInjectionCheckSchema),
        defaultValues: {},
    })

    const onSubmit = async (data) => {
        const request = {
            customerPhone: patient.customerPhone,
            customerDob: patient.customerDob,
            employeeUsername: employee.employeeProfile.employeeUsername,
            screeningRecordHeight: data.height,
            screeningRecordWeight: data.weight,
            screeningRecordBloodPressure: data.bloodPressure,
            screeningRecordHeartRate: data.heartRate,
            screeningRecordTemperature: data.bodyTemperature,
            screeningRecordRespiratoryRate: data.respirationRate,
            screeningRecordChronicDiseases:
                data.chronicDiseases === '' ? 'Không' : data.chronicDiseases,
            screeningRecordAllergies: data.allergies === '' ? 'Không' : data.allergies,
            screeningRecordCurrentMedications: data.medications === '' ? 'Không' : data.medications,
            screeningRecordAbnormalSymptoms:
                data.abnormalSymptoms === '' ? 'Không' : data.abnormalSymptoms,
            screeningRecordNotes: data.additionalNotes === '' ? 'Không' : data.additionalNotes,
            screeningRecordResult: data.screeningResult,
        }
        console.log(request)

        try {
            const response = await screeningRecordService.createScreeningRecord(request)
            console.log(response.data)

            if (response.status === 200) {
                if (response.data.code === 1000) {
                    MyToast('success', 'Tạo phiéu khám thành công.')
                } else {
                    MyToast('error', 'Xảy ra lỗi khi tạo phiếu khám')
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    MyToast(
                        'error',
                        'Khách hàng chưa có thông tin, hãy thêm thông tin khách hàng trước'
                    )
                }
            }
        }
    }

    const handleCancel = () => {
        handleClosePreInjectionCheckModal()
        reset()
    }

    return (
        <div>
            <Modal
                title={
                    <div className="text-center font-bold text-xl">
                        Thông tin khám sàng lọc trước khi tiêm
                    </div>
                }
                open={visiblePreInjectionModal}
                onCancel={handleCancel}
                footer={null}
                width={1000}
                style={{
                    top: 10,
                }}
            >
                <form
                    id="pre-vaccination-screening"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2"
                >
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

                    <div className="flex flex-col space-y-2">
                        <span className=" uppercase text-base font-bold">Tình trạng sức khỏe</span>

                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Chiều cao (m):</label>
                                <input
                                    {...register('height')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.height && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.height.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Cân nặng (Kg):</label>
                                <input
                                    {...register('weight')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.weight && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.weight.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">Huyết áp (mmHg):</label>
                                <input
                                    {...register('bloodPressure')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.bloodPressure && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.bloodPressure.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Nhịp tim (bpm):</label>
                                <input
                                    {...register('heartRate')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.heartRate && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.heartRate.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="font-semibold">Nhiệt độ cơ thể (°C):</label>
                                <input
                                    {...register('bodyTemperature')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.bodyTemperature && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.bodyTemperature.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="font-semibold">
                                    Tình trạng hô hấp (lần thở/phút):
                                </label>
                                <input
                                    {...register('respirationRate')}
                                    type="text"
                                    className="input input-bordered input-info w-full input-sm"
                                />
                                {errors.respirationRate && (
                                    <span className="text-red-500 font-semibold">
                                        {errors.respirationRate.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <span className=" uppercase text-base font-bold">Tiền sử bệnh lý</span>
                        <div className="flex flex-wrap gap-5">
                            <div className="flex flex-1 flex-col space-y-2">
                                <label className="font-semibold">Các bệnh mãn tính (nếu có):</label>
                                <textarea
                                    {...register('chronicDiseases')}
                                    className="textarea textarea-info"
                                    rows={2}
                                    placeholder="Vd: Cao huyết áp, tiểu đường,..."
                                ></textarea>
                            </div>

                            <div className="flex flex-1 flex-col space-y-2">
                                <label className="font-semibold">Dị ứng (nếu có):</label>
                                <textarea
                                    {...register('allergies')}
                                    className="textarea textarea-info"
                                    rows={2}
                                    placeholder="Vd: Dị ứng hải sản, penicillin, aspirin,..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <div className="flex flex-1 flex-col space-y-2">
                                <label className="font-semibold">
                                    Thuốc đang sử dụng (nếu có):
                                </label>
                                <textarea
                                    {...register('medications')}
                                    className="textarea textarea-info"
                                    rows={2}
                                    placeholder="Vd: Thuốc cao huyết áp, thuốc tiểu đường,..."
                                ></textarea>
                            </div>

                            <div className="flex flex-1 flex-col space-y-2">
                                <label className="font-semibold">
                                    Các triệu chứng bất thường (nếu có):
                                </label>
                                <textarea
                                    {...register('abnormalSymptoms')}
                                    className="textarea textarea-info"
                                    rows={2}
                                    placeholder="Vd: Đau lồng ngực, khó thở,... "
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-1 flex-col space-y-2">
                            <label className="font-semibold">Ghi chú bổ sung (nếu có):</label>
                            <input
                                {...register('additionalNotes')}
                                type="text"
                                className="input input-bordered input-info w-full input-sm"
                            />
                        </div>
                        <div className="flex-2 space-y-2">
                            <label className="font-semibold">Kết quả khám sàng lọc:</label>
                            <select
                                {...register('screeningResult')}
                                className="select select-bordered select-info select-sm w-full max-w-xs"
                            >
                                <option value="ELIGIBLE">Đủ điều kiện tiêm</option>
                                <option value="NOT_ELIGIBLE">Chưa đủ điều kiện tiêm</option>
                            </select>
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
