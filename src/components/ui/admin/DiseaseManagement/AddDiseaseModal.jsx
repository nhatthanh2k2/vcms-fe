import { diseaseService } from '@/services'
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../../common'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const addDiseaseSchema = z.object({
    diseaseName: z.string().min(2, 'Vui lòng nhập tên bệnh'),
})

export const AddDiseaseModal = ({
    visibleOpenAddDiseaseModal,
    handleCloseAddDiseaseModal,
    getDiseaseList,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addDiseaseSchema),
        defaultValues: {
            diseaseName: '',
        },
    })

    const onSubmit = async (data) => {
        const request = {
            diseaseName: data.diseaseName,
        }
        try {
            const response = await diseaseService.addDisease(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Thêm bệnh mới thành công.')
                getDiseaseList()
            } else MyToast('error', 'Xảy ra lỗi khi thêm bệnh mới.')
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Thêm bệnh mới không thành công.')
            }
        }
    }

    const handleCloseModal = () => {
        reset()
        handleCloseAddDiseaseModal()
    }

    return (
        <Modal
            open={visibleOpenAddDiseaseModal}
            onCancel={handleCloseModal}
            footer={false}
            title={<div className="text-center font-bold text-xl text-teal-500">Thêm bệnh mới</div>}
        >
            <div>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <label className="font-semibold">Tên bệnh:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                        {...register('diseaseName')}
                    />
                    {errors.diseaseName && (
                        <p className="text-red-500 mt-2">{errors.diseaseName.message}</p>
                    )}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                        >
                            <span className="mr-2">Thêm bệnh mới</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 12a6 6 0 0 1-6 6m6-6a6 6 0 0 0-6-6m6 6h3m-9 6a6 6 0 0 1-6-6m6 6v3m-6-9a6 6 0 0 1 6-6m-6 6H3m9-6V3m9 7.5v3m-18-3v3M10.5 3h3m-3 18h3m3.804-16.425 2.121 2.122M4.575 17.304l2.122 2.121m11.667-13.79-2.121 2.122m-8.485 8.485-2.122 2.121M4.576 6.696l2.12-2.121m10.608 14.85 2.121-2.122M5.635 5.636l2.122 2.121m8.485 8.485 2.121 2.121M14 14h.01m-3.51-2.5h.01m.99 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
