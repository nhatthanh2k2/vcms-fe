import React from 'react'
import { useLocation } from 'react-router-dom'

export const VaccineDetail = () => {
    const location = useLocation()
    const { vaccineDetail } = location.state

    return (
        <section className="relative pt-5">
            <div className="container mx-auto">
                <div className="relative my-5">
                    <div className="uppercase text-3xl text-blue-700 font-bold">
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
                                    <strong>Nguồn gốc: </strong>
                                    {vaccineDetail.vaccineOrigin}
                                </span>
                            </div>

                            <div>
                                <label className="block">
                                    <strong>Đường tiêm:</strong>
                                </label>
                                <span>
                                    {vaccineDetail.vaccineInjectionRoute.trim().includes(';') ? (
                                        <ul className="px-10 list-disc">
                                            {vaccineDetail.vaccineInjectionRoute
                                                .split(';')

                                                .map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: vaccineDetail.vaccineInjectionRoute,
                                            }}
                                        ></span>
                                    )}
                                </span>
                            </div>

                            <div>
                                <label className="block">
                                    {' '}
                                    <strong>Chống chỉ định:</strong>
                                </label>
                                <span>
                                    {vaccineDetail.vaccineContraindication.trim().includes(';') ? (
                                        <ul className="px-10 list-disc">
                                            {vaccineDetail.vaccineContraindication
                                                .split(';')
                                                .map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: vaccineDetail.vaccineContraindication,
                                            }}
                                        ></span>
                                    )}
                                </span>
                            </div>

                            <div>
                                <span>
                                    <label className="block">
                                        <strong>Phản ứng sau tiêm:</strong>
                                    </label>
                                    {vaccineDetail.vaccineReaction.trim().includes(';') ? (
                                        <ul className="px-10 list-disc">
                                            {vaccineDetail.vaccineReaction
                                                .split(';')
                                                .map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: vaccineDetail.vaccineReaction,
                                            }}
                                        ></span>
                                    )}
                                </span>
                            </div>

                            <div>
                                <label className="block">
                                    <strong>Bảo quản:</strong>
                                </label>
                                {vaccineDetail.vaccineStorage.trim().includes(';') ? (
                                    <ul>
                                        {vaccineDetail.vaccineStorage
                                            .split(';')
                                            .map((item, index) => (
                                                <ol key={index}>{item}</ol>
                                            ))}
                                    </ul>
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: vaccineDetail.vaccineStorage,
                                        }}
                                    ></span>
                                )}
                            </div>
                        </div>

                        <div
                            id="schedule"
                            className="border p-6 border-blue-200 rounded-md shadow-sm"
                        >
                            <div className="text-2xl text-blue-700 font-bold">Phác đồ tiêm</div>
                            <span>
                                {vaccineDetail.vaccineInjectionSchedule.trim().includes(';') ? (
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
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: vaccineDetail.vaccineInjectionSchedule,
                                        }}
                                    ></span>
                                )}
                            </span>
                        </div>

                        <div
                            id="patient"
                            className="border p-6 border-blue-200 rounded-md shadow-sm"
                        >
                            <div className="text-2xl text-blue-700 font-bold">Đối tượng tiêm</div>
                            {vaccineDetail.vaccinePatient.trim().includes(';') ? (
                                <ul>
                                    {vaccineDetail.vaccinePatient.split(';').map((item, index) => (
                                        <ol key={index}>{item}</ol>
                                    ))}
                                </ul>
                            ) : (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: vaccineDetail.vaccinePatient,
                                    }}
                                ></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
