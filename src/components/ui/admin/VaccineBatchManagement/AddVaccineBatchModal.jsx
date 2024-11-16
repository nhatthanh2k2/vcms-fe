import { Modal } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { vaccineBatchService, vaccinePackageService } from '@/services'
import { MyToast } from '../../common'

const vaccineBatchSchema = z.object({
    vaccineBatchNumber: z.string().nonempty('Số lô vắc xin không được trống'),
    batchDetailFile: z
        .instanceof(FileList)
        .refine((files) => files?.length > 0, 'Bạn chưa chọn file'),
})

export const AddVaccineBatchModal = ({
    visibleAddVaccineBatchModal,
    handleCloseAddVaccineBatchModal,
    handleGetVaccineBatchList,
}) => {
    const handleCloseModal = () => {
        handleCloseAddVaccineBatchModal()
        reset()
        clearErrors()
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm({
        resolver: zodResolver(vaccineBatchSchema),
    })

    const onSubmit = async (data) => {
        try {
            const request = new FormData()
            request.append('vaccineBatchNumber', data.vaccineBatchNumber)
            request.append('batchDetailFile', data.batchDetailFile[0])
            const response = await vaccineBatchService.createBatch(request)
            if (response.data.code === 1000) {
                MyToast('success', 'Nhập lô vắc xin thành công.')
                handleGetVaccineBatchList()
                handleCloseModal()
            } else MyToast('error', 'Xảy ra lỗi khi nhập lô vắc xin.')
        } catch (error) {
            if (error.response) {
                if (error.response.data.code === 1005) {
                    MyToast('error', 'Vắc xin trong file excel không có sẵn trong dữ liệu.')
                }
            } else MyToast('error', 'Nhập lô vắc xin không thành công.')
        }
    }

    return (
        <Modal
            title={
                <div className="text-center text-2xl text-teal-500 font-bold">
                    Nhập lô vắc xin mới
                </div>
            }
            open={visibleAddVaccineBatchModal}
            onCancel={handleCloseModal}
            footer={false}
            width={600}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-5 space-y-5">
                <div className="flex flex-col ">
                    <div className="flex items-center space-x-5 ">
                        <label className="font-semibold w-1/3">Số lô vắc xin:</label>
                        <input
                            type="text"
                            className="input input-bordered input-success w-2/3 input-sm"
                            {...register('vaccineBatchNumber')}
                        />
                    </div>{' '}
                    {errors.vaccineBatchNumber && (
                        <div className="text-red-500 pl-50">
                            {errors.vaccineBatchNumber.message}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center space-x-5 ">
                        <label className="font-semibold w-1/3">Chọn file để nhập:</label>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="file-input file-input-bordered file-input-success w-2/3 file-input-sm"
                            {...register('batchDetailFile')}
                        />
                    </div>
                    {errors.batchDetailFile && (
                        <div className="text-red-500 pl-50">{errors.batchDetailFile.message}</div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Nhập lô vắc xin</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 3v12"></path>
                            <path d="M8 11l4 4 4-4"></path>
                            <path d="M8 5H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-4"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </Modal>
    )
}
