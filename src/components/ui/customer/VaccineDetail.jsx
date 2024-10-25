import React from 'react'
import { useLocation } from 'react-router-dom'

export const VaccineDetail = () => {
    const location = useLocation()
    const { vaccineDetail } = location.state

    return (
        <section className="relative pt-16 ">
            <div className="container mx-auto">
                <div className="relative my-5">
                    <div className="uppercase text-3xl text-blue-700 font-satoshi font-bold">
                        {vaccineDetail.vaccineName}
                    </div>
                    <div className="absolute left-0 right-0 bottom-[-5px] h-[3px] bg-yellow-600"></div>
                </div>

                <div className="flex space-x-2 ">
                    <div className="w-2/5">
                        <img
                            className=" rounded-lg"
                            src={
                                import.meta.env.VITE_VCMS_IMAGE +
                                '/vaccines/' +
                                vaccineDetail?.vaccineImage
                            }
                        />
                    </div>

                    <div className="w-3/5 flex flex-col text-justify space-y-3">
                        <div id="info" className="border p-6 border-blue-200 rounded-md shadow-sm">
                            <div>
                                <span className="text-2xl text-blue-700 font-bold">
                                    Thông tin vắc xin
                                </span>
                                <p>{vaccineDetail.vaccinePurpose}</p>
                            </div>

                            <div>
                                <span>
                                    <strong>Nguồn gốc:</strong> {vaccineDetail.vaccineOrigin}
                                </span>
                            </div>

                            <div>
                                <span>
                                    <strong>Đường tiêm:</strong>
                                    <ul className="px-10 list-disc">
                                        {vaccineDetail.vaccineInjectionRoute
                                            .split(';')

                                            .map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                    </ul>
                                </span>
                            </div>

                            <div>
                                <span>
                                    <strong>Chống chỉ định:</strong>
                                    <ul className="px-10 list-disc">
                                        {vaccineDetail.vaccineContraindication
                                            .split(';')
                                            .map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                    </ul>
                                </span>
                            </div>

                            <div>
                                <span>
                                    <strong>Phản ứng sau tiêm:</strong>
                                    <ul className="px-10 list-disc">
                                        {vaccineDetail.vaccineReaction
                                            .split(';')
                                            .map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                    </ul>
                                </span>
                            </div>

                            <div>
                                <strong>Bảo quản:</strong>
                                <p>{vaccineDetail.vaccineStorage}</p>
                            </div>
                        </div>

                        <div
                            id="schedule"
                            className="border p-6 border-blue-200 rounded-md shadow-sm"
                        >
                            <span className="text-2xl text-blue-700 font-bold">Phác đồ tiêm</span>
                            <p>
                                <ul>
                                    {vaccineDetail.vaccineInjectionSchedule
                                        .split(';')
                                        .map((item) => item.trim())
                                        .filter((item) => item.length > 0)
                                        .map((item, index) => {
                                            const hasMui = item.includes('Mũi')
                                            return (
                                                <li key={index}>
                                                    {hasMui ? (
                                                        <span className="px-5">• {item}</span>
                                                    ) : (
                                                        item
                                                    )}
                                                </li>
                                            )
                                        })}
                                </ul>
                            </p>
                        </div>

                        <div
                            id="patient"
                            className="border p-6 border-blue-200 rounded-md shadow-sm"
                        >
                            <span className="text-2xl text-blue-700 font-bold">Đối tượng tiêm</span>
                            <p>{vaccineDetail.vaccinePatient}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
