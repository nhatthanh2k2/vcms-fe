import React, { useEffect, useState } from 'react'
import { Row, Col, Select } from 'antd'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { diseaseService, vaccineService } from '@/services'
import { MyToast } from '../../common'
import { AddDiseaseModal } from '../DiseaseManagement'

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

    vaccineAdultDoseCount: z.string().nonempty({ message: 'Số mũi tiêm trẻ em là bắt buộc' }),
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

const ageRanges = [
    '0-2 tháng',
    '2-6 tháng',
    '7-12 tháng',
    '13-24 tháng',
    '4-6 tuổi',
    '9-18 tuổi',
    'Phụ nữ trước mang thai',
    'Người trưởng thành',
]

export const AddVaccineForm = () => {
    const [selectedAges, setSelectedAges] = useState([])
    const [diseaseList, setDiseaseList] = useState([])

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

    const onSubmit = async (data) => {
        console.log(data)
        const request = new FormData()
        request.append('vaccineName', data.vaccineName)
        request.append('vaccineOrigin', data.vaccineOrigin)
        if (data.vaccineImage) {
            request.append('vaccineImage', data.vaccineImage[0])
        }
        request.append('vaccineAgeRange', JSON.stringify(data.vaccineAgeRange))
        request.append('vaccineDescription', data.vaccineDescription)
        request.append('vaccineInjectionRoute', data.vaccineInjectionRoute)
        request.append('vaccineContraindication', data.vaccineContraindication)
        request.append('vaccineReaction', data.vaccineReaction)
        request.append('vaccineChildDoseCount', data.vaccineChildDoseCount)
        request.append('vaccineAdultDoseCount', data.vaccineAdultDoseCount)
        request.append('vaccineStorage', data.vaccineStorage)
        request.append('vaccineInjectionSchedule', data.vaccineInjectionSchedule)
        request.append('vaccinePatient', data.vaccinePatient)
        request.append('diseaseId', data.diseaseId)
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
        <div className="flex flex-col">
            <form className="flex flex-col space-y-5 px-10" onSubmit={handleSubmit(onSubmit)}>
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
                    <Row gutter={[16, 16]} justify="start" align="middle">
                        {ageRanges.map((age) => (
                            <Col key={age} xs={12} sm={6} md={6} lg={6}>
                                <div className="form-control">
                                    <label className="cursor-pointer label flex items-center space-x-2">
                                        <span className="label-text">{age}</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-success"
                                            checked={selectedAges.includes(age)}
                                            onChange={() => handleSelectedAge(age)}
                                        />
                                    </label>
                                </div>
                            </Col>
                        ))}
                    </Row>
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

                    <div className="flex flex-2 items-center justify-end">
                        <button type="button" onClick={handleOpenAddDiseaseModal}>
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
            />
        </div>
    )
}
