import { screeningRecordService } from '@/services'
import { DatePicker, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyToast } from '../common'

export const PrintVaccinationRecord = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [screeningRecordList, setScreeningRecordList] = useState([])
    const [vaccinationRecordList, setVaccinationRecordList] = useState([])

    useEffect(() => {
        const createDate = dayjs(selectedDate).format('YYYY-MM-DD')
        screeningRecordService
            .getScreeningRecordByCreateDate(createDate)
            .then((response) => setScreeningRecordList(response.data.result))
            .catch((error) => MyToast('error', 'Xảy ra lỗi khi láy phiếu khám.'))
    }, [])
    console.log(screeningRecordList)

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-500  font-sans font-bold border-teal-400  dark:text-gray-200">
                In phiếu khám / phiếu tiêm
            </h1>
            <div className="flex items-center my-4">
                <span className="font-semibold">Chọn ngày muốn xem phiếu:</span>
                <DatePicker
                    defaultValue={dayjs(selectedDate)}
                    isClearable
                    format="DD-MM-YYYY"
                    className="mx-4"
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-5">
                <input
                    type="radio"
                    name="record_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-500 text-nowrap"
                    aria-label="Phiếu khám sàng lọc"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box px-10 pb-10"
                ></div>

                <input
                    type="radio"
                    name="record_tabs"
                    role="tab"
                    className="tab font-bold text-base text-orange-500 text-nowrap"
                    aria-label="Phiếu tiêm"
                />
                <div
                    role="tabpanel"
                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                ></div>
            </div>
        </section>
    )
}
