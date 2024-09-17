import React, { useState, useEffect } from 'react'
import { DatePicker, Pagination } from 'antd'
import { batchDetailService } from '@/services'
import { convertVNDToUSD, disabledDoB, formatCurrency } from '@/utils'
import { PayPalButton } from 'react-paypal-button-v2'

export const OrderForm = () => {
    const [hasUserData, setHasUserData] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [batchDetailList, setBatchDetailList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9
    const startIndex = (currentPage - 1) * pageSize
    const currentBatchDetails = batchDetailList.slice(startIndex, startIndex + pageSize)

    useEffect(() => {
        batchDetailService
            .getDetail()
            .then((response) => setBatchDetailList(response.data.result))
            .catch((err) => console.log('Get Batch Detail Failed!'))
    }, [])

    const handleSubmit = () => {
        if (hasUserData) {
            console.log('Dữ liệu người dùng có sẵn')
        } else {
            setShowForm(true)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const [selectedBatchDetails, setSelectedBatchDetails] = useState([])

    const handleSelectVaccine = (batchDetail) => {
        if (!selectedBatchDetails.find((b) => b.batchDetailId === batchDetail.batchDetailId)) {
            setSelectedBatchDetails([...selectedBatchDetails, batchDetail])
        }
    }

    const handleRemoveVaccine = (batchDetailId) => {
        setSelectedBatchDetails(
            selectedBatchDetails.filter((b) => b.batchDetailId !== batchDetailId)
        )
    }

    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        const total = selectedBatchDetails.reduce(
            (acc, batchDetail) => acc + batchDetail.batchDetailVaccinePrice,
            0
        )
        setTotalAmount(total)
    }, [selectedBatchDetails])

    const [payment, setPayment] = useState('')

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    return (
        <div className="bg-gray-2 pt-10">
            <div className="flex mx-10 ">
                <div className="flex flex-col w-2/3">
                    <div>
                        <span className="text-2xl text-blue-600 uppercase font-bold">
                            Tra cứu thông tin khách hàng
                        </span>

                        <div className="flex flex-row space-x-5 items-center mt-5">
                            <div className="flex flex-col space-y-2">
                                <label>Nhập SĐT hoặc Mã khách hàng</label>
                                <input
                                    type="text"
                                    placeholder="Số điện thoại / Mã KH"
                                    className="input input-bordered input-info w-full max-w-xs"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label>Ngày tháng năm sinh</label>
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDoB}
                                    className="w-full max-w-xs"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button className="btn  btn-accent">Tra cứu</button>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-green-500 m-8"></div>

                    {showForm && (
                        <div className="mt-5 p-4 border rounded bg-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Form đăng ký người dùng</h3>
                            {/* Form đăng ký người dùng ở đây */}
                            <form>
                                {/* Thêm các trường cần thiết cho form đăng ký người dùng */}
                                <div className="mb-4">
                                    <label className="block mb-2">Họ và tên</label>
                                    <input type="text" className="border-2 p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Email</label>
                                    <input type="email" className="border-2 p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Số điện thoại</label>
                                    <input type="text" className="border-2 p-2 rounded w-full" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="flex flex-col space-y-4 mt-5">
                        <span className="text-lg font-semibold">Chọn phương thức thanh toán:</span>

                        <div className="flex gap-4">
                            <input
                                value="transfer"
                                type="radio"
                                name="radio-5"
                                className="radio radio-success"
                                onChange={handlePayment}
                                checked={payment === 'transfer'}
                            />
                            <span>Thanh toán chuyển khoản</span>
                        </div>

                        <div className="flex gap-4">
                            <input
                                value="paypal"
                                type="radio"
                                name="radio-5"
                                className="radio radio-success"
                                onChange={handlePayment}
                                checked={payment === 'paypal'}
                            />
                            <span>Thanh toán Paypal</span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5">
                        <div className="flex flex-wrap gap-4 flex-grow">
                            {currentBatchDetails.map((batchDetail, index) => {
                                const isSelected = selectedBatchDetails.find(
                                    (v) => v.batchDetailId === batchDetail.batchDetailId
                                )

                                return (
                                    <div
                                        className="card card-compact bg-base-100 w-75 shadow-xl"
                                        key={index}
                                    >
                                        <figure>
                                            <img
                                                src={
                                                    import.meta.env.VITE_VCMS_IMAGE +
                                                    '/vaccines/' +
                                                    batchDetail.vaccineResponse.vaccineImage
                                                }
                                                alt={batchDetail.vaccineResponse.vaccineName}
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {batchDetail.vaccineResponse.vaccineName}
                                            </h2>
                                            <p>Phòng: {batchDetail.diseaseResponse.diseaseName}</p>
                                            <p>
                                                Giá chỉ:{' '}
                                                {formatCurrency(
                                                    batchDetail.batchDetailVaccinePrice
                                                )}
                                            </p>
                                            <div className="card-actions justify-end">
                                                {isSelected ? (
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveVaccine(
                                                                batchDetail.batchDetailId
                                                            )
                                                        }
                                                        className="btn btn-outline btn-accent"
                                                    >
                                                        Đã Chọn
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleSelectVaccine(batchDetail)
                                                        }
                                                        className="btn btn-outline btn-primary"
                                                    >
                                                        Chọn
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {batchDetailList.length > pageSize && (
                            <div className="pagination mx-auto mt-5">
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={batchDetailList.length}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-1/3 ">
                    <div className="bg-white rounded-lg shadow p-4 flex flex-col space-x-2">
                        <div className="flex space-x-2 items-center justify-center mb-5 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon line-color h-8 w-8"
                                data-name="Line Color"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M7 4 4.33 7 3 5.5"
                                    style={{
                                        fill: 'none',
                                        stroke: '#2ca9bc',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                                <path
                                    d="M3 11.5 4.33 13 7 10M3 17.5 4.33 19 7 16"
                                    data-name="secondary"
                                    style={{
                                        fill: 'none',
                                        stroke: '#2ca9bc',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                                <path
                                    d="M11 6h10m-10 6h10m-10 6h10"
                                    style={{
                                        fill: 'none',
                                        stroke: '#000',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                    }}
                                />
                            </svg>
                            <span className="text-lg font-bold text-blue-900">
                                DANH SÁCH VẮC XIN CHỌN MUA
                            </span>
                        </div>

                        <div className="border-b border-green-500 "></div>

                        <div className="mt-5">
                            {selectedBatchDetails.length === 0 ? (
                                <div className="text-xl text-blue-600 text-center">
                                    Danh sách trống
                                </div>
                            ) : (
                                selectedBatchDetails.map((batchDetail) => (
                                    <div
                                        key={batchDetail.batchDetailId}
                                        className="border-b border-red-100 p-5"
                                    >
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex flex-col space-y-2">
                                                <span className=" uppercase text-xl font-bold text-black">
                                                    {batchDetail.vaccineResponse.vaccineName}
                                                </span>

                                                <span>
                                                    Nguồn gốc:{' '}
                                                    {batchDetail.vaccineResponse.vaccineOrigin}
                                                </span>
                                                <span className="text-lg font-bold text-blue-800">
                                                    {formatCurrency(
                                                        batchDetail.batchDetailVaccinePrice
                                                    )}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleRemoveVaccine(batchDetail.batchDetailId)
                                                }
                                                className="btn btn-square btn-sm"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {totalAmount > 0 && (
                        <div>
                            <div className=" flex flex-col mt-4">
                                <span className="text-2xl font-semibold">
                                    Tổng số tiền: {formatCurrency(totalAmount)}
                                </span>
                            </div>
                            <div className="mt-5">
                                {payment === '' ? null : payment === 'paypal' ? (
                                    <PayPalButton
                                        amount={convertVNDToUSD(totalAmount)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={(details, data) => {
                                            alert(
                                                'Transaction completed by ' +
                                                    details.payer.name.given_name
                                            )

                                            // OPTIONAL: Call your server to save the transaction
                                            return fetch('/paypal-transaction-complete', {
                                                method: 'post',
                                                body: JSON.stringify({
                                                    orderID: data.orderID,
                                                }),
                                            })
                                        }}
                                    />
                                ) : (
                                    <button type="button" className="btn btn-primary">
                                        Chuyển Khoản
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
