import React, { useEffect, useState } from 'react'
import { Table, DatePicker, Tooltip } from 'antd'
import dayjs from 'dayjs'
import emailjs from '@emailjs/browser'
import { orderService } from '@/services'
import { LoadingPage, MyToast } from '../common'
import { convertPaymentType, getPatientInfo } from '@/utils'
import { OrderDetailModal, OrderInjectionModal, PreInjectionCheckModal } from '.'

export const OrderVaccinationSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [orderList, setOrderList] = useState([])
    const [filteredOrderList, setFilteredOrderList] = useState([])
    const [orderDetailList, setOrderDetailList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loadingTable, setLoadingTable] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setLoadingTable(true)
        const formatDate = dayjs(selectedDate).format('YYYY-MM-DD')
        orderService
            .getOrderListByInjectionDate(formatDate)
            .then((response) => {
                setOrderList(response.data.result)
                setLoadingTable(false)
            })
            .catch((error) => {
                MyToast('error', 'Lỗi lấy dữ liệu')
                setLoadingTable(false)
            })
    }, [selectedDate])

    const handleGetDetailOrder = async (orderId) => {
        try {
            const response = await orderService.getAllOrderDetailByOrderId(orderId)
            if (response.data.code === 1000) {
                setOrderDetailList(response.data.result)
            } else MyToast('error', 'Xảy ra lỗi khi lấy chi tiết đơn hàng')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404)
                    MyToast('error', 'Không tìm thấy chi tiết đơn hàng')
            }
        }
    }

    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'customerCode',
            key: 'customerCode',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'orderCustomerFullName',
            key: 'orderCustomerFullName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'orderCustomerPhone',
            key: 'orderCustomerPhone',

            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',

            render: (text) => <span>{text.toLocaleString()} VND</span>,
        },
        {
            title: 'Thanh toán',
            dataIndex: 'orderPayment',
            key: 'orderPayment',

            render: (text) => <span>{convertPaymentType(text)}</span>,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',

            render: (text) => <span>{text}</span>,
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div className="flex space-x-2">
                    <div
                        onClick={() => {
                            handleGetDetailOrder(record.orderId)
                            handleOpenOrderDetailModal(record)
                        }}
                    >
                        <Tooltip placement="top" title={'Xem đơn hàng'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <g fill="#0F0F0F">
                                    <path
                                        fillRule="evenodd"
                                        d="M9 6a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6ZM7 6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6ZM9 16a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M11 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1ZM11 17a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z" />
                                </g>
                            </svg>
                        </Tooltip>
                    </div>

                    <div
                        onClick={() => {
                            handleGetDetailOrder(record.orderId)
                            handleOpenOrderInjectionModal(record)
                        }}
                    >
                        <Tooltip placement="top" title={'Tạo phiếu tiêm'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                data-tip="Tạo phiếu tiêm"
                                viewBox="0 0 24 24"
                            >
                                <title>{'File-New'}</title>
                                <g fill="none" fillRule="evenodd">
                                    <path d="M0 0h24v24H0z" />
                                    <path
                                        stroke="#0C0310"
                                        strokeLinecap="round"
                                        strokeWidth={2}
                                        d="M4 5a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 20 7.828V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
                                    />
                                    <path
                                        stroke="#0C0310"
                                        strokeLinecap="round"
                                        strokeWidth={2}
                                        d="M15 4v2a2 2 0 0 0 2 2h2M12 9v6M9 12h6"
                                    />
                                </g>
                            </svg>
                        </Tooltip>
                    </div>

                    <div onClick={() => handleOpenPreInjectionCheckModal(record)}>
                        <Tooltip placement="top" title="Tạo phiếu khám sàng lọc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                stroke="#000"
                                strokeWidth={0.32}
                                viewBox="0 0 18 18"
                            >
                                <path
                                    d="M11.5 13a.5.5 0 0 0-.5.5V15H1V3h2v.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V3h2v.5a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5H9v-.5A1.5 1.5 0 0 0 7.5 0h-3A1.5 1.5 0 0 0 3 1.5V2H.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5ZM4 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H4Zm11.854 4.646-2-2a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 7 10.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .354-.146l6-6a.5.5 0 0 0 0-.708ZM8 12v-1.293l5.5-5.5L14.793 6.5l-5.5 5.5Zm-2 .5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5Zm0-3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5ZM8.5 7h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1Z"
                                    data-name="Path 184"
                                />
                            </svg>
                        </Tooltip>
                    </div>

                    <div
                        onClick={() => {
                            handleSendVaccinationReminderEmail(record)
                        }}
                    >
                        <Tooltip placement="top" title="Nhắc lịch tiêm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <g
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                >
                                    <path d="M44 24V9H4v30h20M44 34H30M39 29l5 5-5 5" />
                                    <path d="m4 9 20 15L44 9" />
                                </g>
                            </svg>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ]

    // mo modal chi tiet don hang
    const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false)
    const [orderRecord, setOrderRecord] = useState(null)

    const handleOpenOrderDetailModal = (record) => {
        setOrderRecord(record)
        setIsOpenOrderDetailModal(true)
    }

    const handleCloseOrderDetailModal = () => {
        setIsOpenOrderDetailModal(false)
        setOrderRecord(null)
    }

    // mo modal tao phieu kham
    const [isOpenPreInjectionCheckModal, setIsOpenPreInjectionCheckModal] = useState(false)
    const [patientInfo, setPatientInfo] = useState(null)

    const handleOpenPreInjectionCheckModal = async (record) => {
        const result = getPatientInfo(record)
        setPatientInfo(result)
        setIsOpenPreInjectionCheckModal(true)
    }

    const handleClosePreInjectionCheckModal = () => {
        setIsOpenPreInjectionCheckModal(false)
        setPatientInfo(null)
    }

    // mo modal tao phieu tiem
    const [isOpenOrderinjectionModal, setIsOpenOrderInjectionModal] = useState(false)

    const handleOpenOrderInjectionModal = (record) => {
        setOrderRecord(record)
        setIsOpenOrderInjectionModal(true)
    }

    const handleCloseOrderInjectionModal = () => {
        setIsOpenOrderInjectionModal(false)
        setOrderRecord(null)
    }

    // gui email
    const handleSendVaccinationReminderEmail = async (record) => {
        try {
            setIsLoading(true)
            const response = await orderService.getAllOrderDetailByOrderId(record.orderId)

            const contentList = response.data.result

            const productListHtml = contentList
                .map((detail, index) => {
                    if (detail.batchDetailResponse !== null) {
                        return `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                            index + 1
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                            detail.batchDetailResponse.vaccineResponse.vaccineName
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">
                        ${detail.batchDetailResponse.batchDetailVaccinePrice} VNĐ</td>
                    </tr>
                `
                    } else {
                        return `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                            index + 1
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">${
                            detail.vaccinePackageResponse.vaccinePackageName
                        }</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12pt;">
                        ${detail.vaccinePackageResponse.vaccinePackagePrice.toLocaleString()} VNĐ</td>
                    </tr>
                `
                    }
                })
                .join('')

            const productListContent = `
            
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">STT</th>
                        <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Tên vắc xin</th>
                        <th style="border: 1px solid #ddd; padding: 8px; font-size: 12pt;">Giá vắc xin</th>
                    </tr>
                </thead>
                <tbody>
                    ${productListHtml}
                </tbody>
            </table>
            <p><span style="font-size: 12pt;">Tổng số tiền đã thanh toán: ${record.orderTotal.toLocaleString()} VNĐ</span></p>
        `

            const templateParams = {
                customerName: record.orderCustomerFullName,
                cutomerEmail: record.orderCustomerEmail,
                injectionDate: record.orderInjectionDate,
                product_list_html: productListContent,
            }

            emailjs
                .send('service_wwqml4v', 'template_uk1un67', templateParams, {
                    publicKey: 'lhyG5-7O7cRItbFjd',
                })
                .then(
                    (response) => {
                        setIsLoading(false)
                        MyToast('success', 'Gửi email nhắc lịch tiêm thành công.')
                    },
                    (error) => {
                        setIsLoading(false)
                        MyToast('error', 'Xảy ra lỗi khi gửi email nhắc lịch tiêm.')
                    }
                )
        } catch (error) {
            setIsLoading(false)
            MyToast('error', 'Không gửi được email. Hãy thử lại sau.')
        }
    }

    const handleSendVaccinationReminderEmailForNextDay = async () => {
        try {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            const formatDate = dayjs(tomorrow).format('YYYY-MM-DD')
            const response = await orderService.getOrderListByInjectionDate(formatDate)
            // console.log(response.data.result)
            response.data.result.map((record) => {
                handleSendVaccinationReminderEmail(record)
            })
        } catch (error) {
            MyToast('error', 'Xảy ra lỗi khi nhắc lịch.')
        }
    }

    useEffect(() => {
        if (searchQuery) {
            const filtered = orderList.filter((order) =>
                order.orderCustomerFullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredOrderList(filtered)
        } else {
            setFilteredOrderList(orderList)
        }
    }, [searchQuery, orderList])

    return (
        <section className="bg-base-100 rounded-lg shadow-default p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                Lịch tiêm từ đơn hàng
            </h1>

            <div className="flex space-x-10 items-center">
                <div className="flex items-center my-5">
                    <span className="font-semibold">Chọn ngày muốn xem:</span>
                    <DatePicker
                        defaultValue={dayjs(selectedDate)}
                        isClearable
                        format="DD-MM-YYYY"
                        className="mx-4"
                        onChange={(date) => setSelectedDate(date)}
                    />
                </div>
                <label className="input input-bordered input-info input-sm flex items-center gap-2 w-75">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Tên khách hàng"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
                <div className="m-3">
                    <button
                        onClick={handleSendVaccinationReminderEmailForNextDay}
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-teal-500 hover:border-teal-600 hover:bg-teal-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Nhắc lịch tiêm ngày mai</span>
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
            </div>
            <div className="w-full">
                <Table
                    loading={loadingTable}
                    columns={columns}
                    dataSource={filteredOrderList}
                    scroll={{ y: 400 }}
                    rowKey={'orderId'}
                />
            </div>

            <OrderDetailModal
                visibleOrderDetailModal={isOpenOrderDetailModal}
                handleCloseOrderDetailModal={handleCloseOrderDetailModal}
                orderRecord={orderRecord}
            />

            <PreInjectionCheckModal
                visiblePreInjectionModal={isOpenPreInjectionCheckModal}
                handleClosePreInjectionCheckModal={handleClosePreInjectionCheckModal}
                patient={patientInfo}
            />

            <OrderInjectionModal
                visibleOrderInjectionModal={isOpenOrderinjectionModal}
                handleCloseOrderInjectionModal={handleCloseOrderInjectionModal}
                orderRecord={orderRecord}
                orderDetailList={orderDetailList}
            />

            {isLoading && <LoadingPage title={'Đang gửi email...'} />}
        </section>
    )
}
