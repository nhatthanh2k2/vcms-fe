import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select } from 'antd'
import { diseaseService, vaccineService } from '@/services'
import { ageRanges } from '@/utils'
import { MyToast } from '../../common'

const updateVaccineSchema = z.object({
    vaccineName: z.string().min(1, 'Vui lòng nhập tên vắc xin'),
    vaccineOrigin: z.string().min(1, 'Vui lòng nhập nguồn gốc vắc xin'),
    vaccineAgeRange: z.array(z.string()).nonempty('Vui lòng chọn ít nhất một độ tuổi'),
    vaccineDescription: z.string().min(1, { message: 'Vui lòng nhập mô tả cho vắc xin' }),
    vaccineInjectionRoute: z.string().min(1, { message: 'Vui lòng nhập đường tiêm cho vắc xin' }),
    vaccineContraindication: z
        .string()
        .min(1, { message: 'Vui lòng nhập chống chỉ định cho vắc xin' }),
    vaccineReaction: z.string().min(1, { message: 'Vui lòng nhập phản ứng sau tiêm cho vắc xin' }),
    vaccineChildDoseCount: z
        .union([z.string(), z.number()])
        .refine((value) => (typeof value === 'number' ? value >= 0 : value.length > 0), {
            message: 'Số mũi tiêm trẻ em là bắt buộc',
        }),

    vaccineAdultDoseCount: z
        .union([z.string(), z.number()])
        .refine((value) => (typeof value === 'number' ? value >= 0 : value.length > 0), {
            message: 'Số mũi tiêm người lớn là bắt buộc',
        }),
    vaccineStorage: z.string().min(1, { message: 'Vui lòng nhập cách bảo quản cho vắc xin' }),
    vaccineInjectionSchedule: z
        .string()
        .min(1, { message: 'Vui lòng nhập phác đồ tiêm cho vắc xin' }),
    vaccinePatient: z.string().min(1, { message: 'Vui lòng nhập đối tượng tiêm cho vắc xin' }),
    diseaseId: z.preprocess((val) => {
        const parsedValue = Number(val)
        return isNaN(parsedValue) ? null : parsedValue
    }, z.number().int().nonnegative({ message: 'Bạn chưa chọn loại bệnh cho vắc xin' })),
})

export const EditVaccineForm = () => {
    const location = useLocation()
    const [record, setRecord] = useState(location.state?.record)

    const [selectedAges, setSelectedAges] = useState(record.vaccineAgeRange)
    const [diseaseList, setDiseaseList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        diseaseService
            .getAllDiseases()
            .then((response) => setDiseaseList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục bệnh.'))
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        resolver: zodResolver(updateVaccineSchema),
        defaultValues: {
            vaccineName: record.vaccineName,
            vaccineOrigin: record.vaccineOrigin,
            vaccineAgeRange: record.vaccineAgeRange,
            vaccineDescription: record.vaccineDescription,
            vaccineInjectionRoute: record.vaccineInjectionRoute,
            vaccineContraindication: record.vaccineContraindication,
            vaccineReaction: record.vaccineReaction,
            vaccineChildDoseCount: record.vaccineChildDoseCount,
            vaccineAdultDoseCount: record.vaccineAdultDoseCount,
            vaccineStorage: record.vaccineStorage,
            vaccineInjectionSchedule: record.vaccineInjectionSchedule,
            vaccinePatient: record.vaccinePatient,
            diseaseId: record.diseaseResponse?.diseaseId,
        },
    })

    const handleSelectedAge = (age) => {
        const newSelected = selectedAges.includes(age)
            ? selectedAges.filter((item) => item !== age)
            : [...selectedAges, age]

        setSelectedAges(newSelected)
        setValue('vaccineAgeRange', newSelected)
    }

    const handleBackToVaccineTable = () => {
        navigate('/admin/quan-ly/vac-xin-le/danh-muc')
    }

    const onSubmit = async (data) => {
        try {
            const response = await vaccineService.updateVaccineInfo(record.vaccineId, data)
            if (response.data.code === 1000) {
                MyToast('success', 'Cập nhật thông tin vắc xin thành công.')
                setRecord(response.data.result)
            } else
                MyToast('error', 'Xảy ra lỗi khi cập nhật thông tin vắc xin, vui lòng thử lại sau.')
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Cập nhật thông tin vắc xin không thành công.')
            }
        }
    }

    // xử lý mới
    const [vaccinePatients, setVaccinePatients] = useState(
        record.vaccinePatient.split(';').filter(Boolean) || []
    ) // Chia chuỗi thành mảng và bỏ phần tử trống
    const handleAddVaccinePatient = () => {
        setVaccinePatients([...vaccinePatients, ''])
    }

    // Xóa một mục trong vaccinePatient
    const handleRemoveVaccinePatient = (index) => {
        const newVaccinePatients = vaccinePatients.filter((_, idx) => idx !== index)
        setVaccinePatients(newVaccinePatients)
    }

    // Cập nhật giá trị cho vaccinePatient
    const handleVaccinePatientChange = (index, value) => {
        const newVaccinePatients = [...vaccinePatients]
        newVaccinePatients[index] = value
        setVaccinePatients(newVaccinePatients)
    }

    console.log(vaccinePatients.join(';'))

    return (
        <div className="flex flex-col bg-white p-5">
            <form className="flex flex-col space-y-5 " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-5">
                    <div className="space-y-2 flex-1">
                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Tên vắc xin:</label>
                            <input
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                                {...register('vaccineName')}
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="font-semibold">Nguồn gốc vắc xin:</label>
                            <input
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                                {...register('vaccineOrigin')}
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <img
                            src={
                                import.meta.env.VITE_VCMS_IMAGE + '/vaccines/' + record.vaccineImage
                            }
                            className="h-64 w-72 mx-auto object-contain "
                            alt=""
                        />
                        <span htmlFor="file-upload" className="font-semibold mr-2">
                            Chọn ảnh mới
                        </span>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="file-input file-input-bordered file-input-success w-full max-w-xs file-input-sm"
                            //{...register('vaccineImage')}
                            //onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Độ tuổi phù hợp:</label>

                    <div className="flex flex-wrap space-y-3">
                        {ageRanges.map((age, index) => (
                            <div
                                key={index}
                                className="w-1/3 cursor-pointer flex space-x-5 items-center "
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-success"
                                    checked={selectedAges.includes(age)}
                                    onChange={() => handleSelectedAge(age)}
                                />
                                <span className="label-text ml-2">{age}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-5">
                    <div className="space-y-2 flex flex-col flex-2">
                        <label className="font-semibold">Số mũi tiêm trẻ em:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm"
                            {...register('vaccineChildDoseCount')}
                        />
                    </div>
                    <div className=" space-y-2 flex flex-col flex-2">
                        <label className="font-semibold">Số mũi tiêm người lớn:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm "
                            {...register('vaccineAdultDoseCount')}
                        />
                    </div>

                    <div className=" space-y-2 flex flex-col flex-1">
                        <label className="font-semibold">Phòng bệnh:</label>
                        <Select
                            {...register('diseaseId')}
                            placeholder="Chọn bệnh"
                            options={diseaseList.map((disease) => ({
                                value: disease.diseaseId,
                                label: disease.diseaseName,
                            }))}
                            value={getValues('diseaseId')}
                            onChange={(value) => setValue('diseaseId', value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Mô tả vắc xin:</label>
                    <textarea
                        className="textarea textarea-success w-full ro"
                        placeholder="Bio"
                        {...register('vaccineDescription')}
                    ></textarea>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Đối tượng tiêm:</label>
                    {vaccinePatients.map((patient, index) => (
                        <div key={index} className="flex space-x-2">
                            <input
                                type="text"
                                className="input input-bordered input-success w-full input-sm"
                                value={patient}
                                onChange={(e) => handleVaccinePatientChange(index, e.target.value)}
                            />
                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => handleRemoveVaccinePatient(index)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-blue-500"
                        onClick={handleAddVaccinePatient}
                    >
                        Thêm đối tượng
                    </button>
                </div>

                <div>
                    <strong className="text-red-500">(*) Lưu ý:</strong> Đối với các thông tin bên
                    dưới, mỗi ý khác nhau vui lòng đặt dấu ";" ở cuối.
                </div>

                <div className="flex  space-x-5">
                    <div className="flex flex-col space-y-2 flex-grow">
                        <label className="font-semibold">Đối tượng tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccinePatient')}
                        ></textarea>
                    </div>

                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Đường tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineInjectionRoute')}
                        ></textarea>
                    </div>
                </div>

                <div className="flex  space-x-5">
                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Chống chỉ định:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineContraindication')}
                        ></textarea>
                    </div>

                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Phản ứng sau tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineReaction')}
                        ></textarea>
                    </div>
                </div>

                <div className="flex space-x-5">
                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Bảo quản:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineStorage')}
                        ></textarea>
                    </div>

                    <div className="flex flex-col space-y-2 flex-grow">
                        <label className="font-semibold">Phác đồ tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineInjectionSchedule')}
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-center space-x-5">
                    <button
                        onClick={handleBackToVaccineTable}
                        type="button"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="m4 10-.707.707L2.586 10l.707-.707L4 10Zm17 8a1 1 0 1 1-2 0h2ZM8.293 15.707l-5-5 1.414-1.414 5 5-1.414 1.414Zm-5-6.414 5-5 1.414 1.414-5 5-1.414-1.414ZM4 9h10v2H4V9Zm17 7v2h-2v-2h2Zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V9Z"
                            />
                        </svg>
                        <span className="ml-2">Quay lại</span>
                    </button>
                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Cập nhật vắc xin</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M21.121 2.707a3 3 0 0 0-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 0 0-.263.464l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .464-.263l7.849-7.848 1.737-1.738a3 3 0 0 0 0-4.242l-.172-.172Zm-2.828 1.414a1 1 0 0 1 1.414 0l.172.172a1 1 0 0 1 0 1.414l-1.017 1.017-1.555-1.617.986-.986Zm-2.4 2.4 1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99ZM4 8a1 1 0 0 1 1-1h5a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
