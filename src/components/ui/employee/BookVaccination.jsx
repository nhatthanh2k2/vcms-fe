import React, { useState } from 'react'
import { DatePicker, Select } from 'antd'
import { convertPackageType, convertVaccineType } from '@/utils'
const { Option } = Select

export const BookVaccination = ({ batchDetailList, vaccinePackageList }) => {
    const [injectionType, setInjectionType] = useState('SINGLE')
    const [vaccineSelected, setVaccineSelected] = useState(null)
    const [packageSelected, setPackageSelected] = useState(null)
    const [packageCustomList, setPackageCustomList] = useState([])

    const [formData, setFormData] = useState({
        customerName: '',
        vaccinationType: '',
        date: '',
        time: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Submitted:', formData)

        setFormData({ customerName: '', vaccinationType: '', date: '', time: '' })
    }

    const handleChoseVaccine = (option) => {
        setVaccineSelected(option)
        setPackageSelected(null)
    }

    const handleChosePackage = (option) => {
        setPackageSelected(option)
        setVaccineSelected(null)
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Đăng ký vắc xin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex w-full ">
                    <div className="flex-1">
                        <label htmlFor="customerName" className="block mb-1 font-medium">
                            Mã khách hàng / Số điện thoại
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-info w-full max-w-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="date" className="block mb-1 font-medium">
                            Ngày mong muốn tiêm:
                        </label>
                        <DatePicker className="h-12" format={'DD-MM-YYYY'} />
                    </div>
                </div>

                <div className="flex gap-5">
                    <label htmlFor="vaccinationType" className="block mb-1 font-medium">
                        Loại vắc xin:
                    </label>

                    <div className="flex gap-2">
                        <label htmlFor="">Vắc xin lẻ</label>
                        <input
                            type="radio"
                            name="radio-7"
                            className="radio radio-info"
                            onChange={() => setInjectionType('SINGLE')}
                            checked={injectionType === 'SINGLE'}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label htmlFor="">Vắc xin gói</label>
                        <input
                            type="radio"
                            name="radio-7"
                            className="radio radio-info"
                            checked={injectionType === 'PACKAGE'}
                            onChange={() => setInjectionType('PACKAGE')}
                        />
                    </div>
                </div>

                <div>
                    {injectionType === 'SINGLE' ? (
                        <div>
                            <Select
                                value={vaccineSelected}
                                onChange={handleChoseVaccine}
                                placeholder="Chọn vắc xin"
                                options={batchDetailList.map((batchDetail) => ({
                                    value: batchDetail.batchDetailId,
                                    label: (
                                        <span>
                                            {batchDetail.vaccineResponse.vaccineName}{' '}
                                            {convertVaccineType(batchDetail.vaccineType)}
                                        </span>
                                    ),
                                }))}
                                style={{
                                    width: 400,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex gap-5 ">
                            <Select
                                value={packageSelected}
                                onChange={handleChosePackage}
                                placeholder="Chọn gói vắc xin"
                                options={vaccinePackageList.map((pack) => ({
                                    value: pack.vaccinePackageId,
                                    label: (
                                        <span>
                                            {pack.vaccinePackageName}{' '}
                                            {convertPackageType(pack.vaccinePackageType)}
                                        </span>
                                    ),
                                }))}
                                style={{
                                    width: 400,
                                }}
                            />
                            <div>
                                <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="mr-2">Chỉnh sửa gói</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentcolor"
                                            d="M3 21v-3.75l10.606-10.606a1.2 1.2 0 0 1 1.697 0l2.646 2.646a1.2 1.2 0 0 1 0 1.697L7.342 21H3zm12.057-10.057-2.646-2.646 1.057-1.057 2.646 2.646-1.057 1.057zm-11.45 9.121 7.607-7.607 1.057 1.057-7.607 7.607H3v-.75h.607zm14.95-14.95a1.2 1.2 0 0 0-1.697 0l-2.646 2.646a1.2 1.2 0 0 0 0 1.697l2.646 2.646a1.2 1.2 0 0 0 1.697 0l2.646-2.646a1.2 1.2 0 0 0 0-1.697l-2.646-2.646z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </form>

            <div className=" flex gap-5">
                <div class="m-3">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="mr-2">Đặt Lịch Hẹn</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentcolor"
                                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div class="m-3">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="mr-2">Đặt Mua</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentcolor"
                                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.1 15.1h9.9c.8 0 1.54-.5 1.84-1.23l3.02-6.63A1 1 0 0 0 21 6H5.21l-.94-2H1v2h2.17l3.61 7.59-1.35 2.44C4.79 16.3 5.42 17 6.24 17H19v-2H7.1l1.1-2z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
