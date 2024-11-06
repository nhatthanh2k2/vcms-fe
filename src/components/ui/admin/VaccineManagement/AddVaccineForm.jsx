import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { diseaseService, vaccineService } from '@/services'
import { MyToast } from '../../common'
import { AddDiseaseModal } from '../DiseaseManagement'
import { ageRanges } from '@/utils'

const addVaccineSchema = z.object({
    vaccineName: z.string().min(1, 'Vui lòng nhập tên vắc xin'),
    vaccineOrigin: z.string().min(1, 'Vui lòng nhập nguồn gốc vắc xin'),
    vaccineImage: z.any().refine((file) => file !== null, {
        message: 'Vui lòng chọn một tệp hình ảnh vắc xin',
    }),
    vaccineAgeRange: z.array(z.string()).nonempty('Vui lòng chọn ít nhất một độ tuổi'),
    vaccineDescription: z.string().min(1, { message: 'Vui lòng nhập mô tả cho vắc xin' }),
    vaccineInjectionRoute: z.string().min(1, { message: 'Vui lòng nhập đường tiêm cho vắc xin' }),
    vaccineContraindication: z
        .string()
        .min(1, { message: 'Vui lòng nhập chống chỉ định cho vắc xin' }),
    vaccineReaction: z.string().min(1, { message: 'Vui lòng nhập phản ứng sau tiêm cho vắc xin' }),
    vaccineChildDoseCount: z.string().nonempty({ message: 'Số mũi tiêm trẻ em là bắt buộc' }),

    vaccineAdultDoseCount: z.string().nonempty({ message: 'Số mũi tiêm người lớn là bắt buộc' }),
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

export const AddVaccineForm = () => {
    const [selectedAges, setSelectedAges] = useState([])
    const [diseaseList, setDiseaseList] = useState([])

    const getDiseaseList = () => {
        diseaseService
            .getAllDiseases()
            .then((response) => setDiseaseList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy danh mục bệnh.'))
    }

    useEffect(() => {
        getDiseaseList()
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(addVaccineSchema),
        defaultValues: {
            vaccineName: '',
            vaccineOrigin: '',
            vaccineImage: null,
            vaccineAgeRange: [],
            vaccineDescription: '',
            vaccineInjectionRoute: '',
            vaccineContraindication: '',
            vaccineReaction: '',
            vaccineChildDoseCount: '',
            vaccineAdultDoseCount: '',
            vaccineStorage: '',
            vaccineInjectionSchedule: '',
            vaccinePatient: '',
            diseaseId: '',
        },
    })

    const [isOpenAddDiseaseModal, setIsOpenAddDiseaseModal] = useState(false)

    const handleOpenAddDiseaseModal = (e) => {
        e.preventDefault()
        setIsOpenAddDiseaseModal(true)
    }

    const handleCloseAddDiseaseModal = () => {
        setIsOpenAddDiseaseModal(false)
    }

    const handleSelectedAge = (age) => {
        const newSelected = selectedAges.includes(age)
            ? selectedAges.filter((item) => item !== age)
            : [...selectedAges, age]

        setSelectedAges(newSelected)
        setValue('vaccineAgeRange', newSelected)
    }

    const concatenateWithSemicolon = (value) => {
        if (value && typeof value === 'string') {
            return (
                value
                    .split('\n')
                    .map((item) => item.trim())
                    .join(';') + ';'
            )
        }
        return ''
    }

    const onSubmit = async (data) => {
        // const request = new FormData()
        // request.append('vaccineName', data.vaccineName)
        // request.append('vaccineOrigin', data.vaccineOrigin)
        // if (data.vaccineImage) {
        //     request.append('vaccineImage', data.vaccineImage[0])
        // }
        // request.append('vaccineAgeRange', JSON.stringify(data.vaccineAgeRange))
        // request.append('vaccineDescription', data.vaccineDescription)
        // request.append('vaccineInjectionRoute', data.vaccineInjectionRoute)
        // request.append('vaccineContraindication', data.vaccineContraindication)
        // request.append('vaccineReaction', data.vaccineReaction)
        // request.append('vaccineChildDoseCount', data.vaccineChildDoseCount)
        // request.append('vaccineAdultDoseCount', data.vaccineAdultDoseCount)
        // request.append('vaccineStorage', data.vaccineStorage)
        // request.append('vaccineInjectionSchedule', data.vaccineInjectionSchedule)
        // request.append('vaccinePatient', data.vaccinePatient)
        // request.append('diseaseId', data.diseaseId)
        // try {
        //     const response = await vaccineService.createVaccine(request)
        //     if (response.data.code === 1000) {
        //         MyToast('success', 'Thêm vắc xin thành công.')
        //     } else MyToast('error', 'Xảy ra lỗi khi thêm vắc xin.')
        // } catch (error) {
        //     if (error.response)
        //         if (error.response.status === 400) MyToast('error', 'Hình ảnh không hợp lệ.')
        // }

        const vaccineDescription = concatenateWithSemicolon(data.vaccineDescription)
        const vaccinePatient = concatenateWithSemicolon(data.vaccinePatient)
        const vaccineInjectionRoute = concatenateWithSemicolon(data.vaccineInjectionRoute)
        const vaccineContraindication = concatenateWithSemicolon(data.vaccineContraindication)
        const vaccineReaction = concatenateWithSemicolon(data.vaccineReaction)
        const vaccineStorage = concatenateWithSemicolon(data.vaccineStorage)
        const vaccineInjectionSchedule = concatenateWithSemicolon(data.vaccineInjectionSchedule)

        const request = new FormData()
        request.append('vaccineName', data.vaccineName)
        request.append('vaccineOrigin', data.vaccineOrigin)
        if (data.vaccineImage) {
            request.append('vaccineImage', data.vaccineImage[0])
        }
        request.append('vaccineAgeRange', JSON.stringify(data.vaccineAgeRange))
        request.append('vaccineDescription', vaccineDescription)
        request.append('vaccineInjectionRoute', vaccineInjectionRoute)
        request.append('vaccineContraindication', vaccineContraindication)
        request.append('vaccineReaction', vaccineReaction)
        request.append('vaccineChildDoseCount', data.vaccineChildDoseCount)
        request.append('vaccineAdultDoseCount', data.vaccineAdultDoseCount)
        request.append('vaccineStorage', vaccineStorage)
        request.append('vaccineInjectionSchedule', vaccineInjectionSchedule)
        request.append('vaccinePatient', vaccinePatient)
        request.append('diseaseId', data.diseaseId)

        // request.forEach((value, key) => {
        //     console.log(`${key}: ${value}`)
        // })

        try {
            const response = await vaccineService.createVaccine(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Thêm vắc xin thành công.')
            } else MyToast('error', 'Xảy ra lỗi khi thêm vắc xin.')
        } catch (error) {
            if (error.response)
                if (error.response.status === 400) MyToast('error', 'Hình ảnh không hợp lệ.')
        }
    }

    return (
        <div className="flex flex-col bg-white px-10 py-5">
            <form className="flex flex-col space-y-5 " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-5">
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Tên vắc xin:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm"
                            {...register('vaccineName')}
                        />
                        {errors.vaccineName && (
                            <p className="text-red-500">{errors.vaccineName.message}</p>
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Nguồn gốc vắc xin:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm"
                            {...register('vaccineOrigin')}
                        />
                        {errors.vaccineOrigin && (
                            <p className="text-red-500">{errors.vaccineOrigin.message}</p>
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="font-semibold">Ảnh vắc xin:</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="file-input file-input-bordered file-input-success w-full max-w-xs file-input-sm"
                            {...register('vaccineImage')}
                            //onChange={handleFileChange}
                        />
                        {errors.vaccineImage && (
                            <p className="text-red-500">{errors.vaccineImage.message}</p>
                        )}
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

                    {errors.vaccineAgeRange && (
                        <p className="text-red-500 mt-2">{errors.vaccineAgeRange.message}</p>
                    )}
                </div>

                <div className="flex space-x-5">
                    <div className="space-y-2 flex flex-col flex-2">
                        <label className="font-semibold">Số mũi tiêm trẻ em:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm"
                            {...register('vaccineChildDoseCount')}
                        />
                        {errors.vaccineChildDoseCount && (
                            <p className="text-red-500">{errors.vaccineChildDoseCount.message}</p>
                        )}
                    </div>
                    <div className=" space-y-2 flex flex-col flex-2">
                        <label className="font-semibold">Số mũi tiêm người lớn:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-full input-sm "
                            {...register('vaccineAdultDoseCount')}
                        />
                        {errors.vaccineAdultDoseCount && (
                            <p className="text-red-500">{errors.vaccineAdultDoseCount.message}</p>
                        )}
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
                            onChange={(value) => setValue('diseaseId', value)}
                        />
                        {errors.diseaseId && (
                            <p className="text-red-500">{errors.diseaseId.message}</p>
                        )}
                    </div>

                    <div className="flex items-center flex-col justify-between">
                        <button
                            type="button"
                            onClick={handleOpenAddDiseaseModal}
                            className="mt-8 btn btn-sm btn-accent"
                        >
                            Thêm bệnh mới
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Mô tả vắc xin:</label>
                    <textarea
                        className="textarea textarea-success w-full ro"
                        placeholder="Bio"
                        {...register('vaccineDescription')}
                    ></textarea>
                    {errors.vaccineDescription && (
                        <p className="text-red-500">{errors.vaccineDescription.message}</p>
                    )}
                </div>

                <div>
                    <strong className="text-red-500">(*) Lưu ý:</strong> Đối với các thông tin bên
                    dưới, mỗi ý bạn hãy xuống dòng nhé.
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
                        {errors.vaccinePatient && (
                            <p className="text-red-500">{errors.vaccinePatient.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Đường tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineInjectionRoute')}
                        ></textarea>
                        {errors.vaccineInjectionRoute && (
                            <p className="text-red-500">{errors.vaccineInjectionRoute.message}</p>
                        )}
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
                        {errors.vaccineContraindication && (
                            <p className="text-red-500">{errors.vaccineContraindication.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2  flex-grow">
                        <label className="font-semibold">Phản ứng sau tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineReaction')}
                        ></textarea>
                        {errors.vaccineReaction && (
                            <p className="text-red-500">{errors.vaccineReaction.message}</p>
                        )}
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
                        {errors.vaccineStorage && (
                            <p className="text-red-500">{errors.vaccineStorage.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2 flex-grow">
                        <label className="font-semibold">Phác đồ tiêm:</label>
                        <textarea
                            className="textarea textarea-success w-full ro"
                            placeholder="Bio"
                            rows={4}
                            {...register('vaccineInjectionSchedule')}
                        ></textarea>
                        {errors.vaccineInjectionSchedule && (
                            <p className="text-red-500">
                                {errors.vaccineInjectionSchedule.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Lưu vắc xin</span>
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

            <AddDiseaseModal
                visibleOpenAddDiseaseModal={isOpenAddDiseaseModal}
                handleCloseAddDiseaseModal={handleCloseAddDiseaseModal}
                getDiseaseList={getDiseaseList}
            />
        </div>
    )
}
