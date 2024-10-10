import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const VaccineDetail = () => {
    const location = useLocation()
    const { vaccineDetail } = location.state

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }
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
                        <ul className="list-none p-0 mb-6 mt-6">
                            <li className="inline-block mr-4">
                                <button
                                    onClick={() => scrollToSection('info')}
                                    className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
                                >
                                    Thông tin
                                </button>
                            </li>
                            <li className="inline-block mr-4">
                                <button
                                    onClick={() => scrollToSection('schedule')}
                                    className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
                                >
                                    Phác đồ tiêm
                                </button>
                            </li>
                            <li className="inline-block">
                                <button
                                    onClick={() => scrollToSection('patient')}
                                    className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
                                >
                                    Đối tượng tiêm
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="w-3/5 flex flex-col text-justify space-y-3">
                        <div id="info" className="border p-6 border-blue-200 rounded-md shadow-sm">
                            <div>
                                <span className="text-2xl text-blue-600 font-semibold">
                                    Thông tin vắc xin
                                </span>
                                <p>{vaccineDetail.vaccinePurpose}</p>
                            </div>

                            <div>
                                <span>
                                    <span className="text-xl text-blue-600 font-semibold">
                                        Nguồn gốc:
                                    </span>{' '}
                                    {vaccineDetail.vaccineOrigin}
                                </span>
                            </div>

                            <div>
                                <span>
                                    <span className="text-xl text-blue-600 font-semibold">
                                        Đường tiêm:
                                    </span>
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
                                    <span className="text-xl text-blue-600 font-semibold">
                                        Chống chỉ định:
                                    </span>
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
                                    <span className="text-xl text-blue-600 font-semibold">
                                        Phản ứng sau tiêm:
                                    </span>
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
                                <span className="text-xl text-blue-600 font-semibold">
                                    Bảo quản:
                                </span>
                                <p>{vaccineDetail.vaccineStorage}</p>
                            </div>
                        </div>

                        <div
                            id="schedule"
                            className="border p-6 border-blue-200 rounded-md shadow-sm"
                        >
                            <span className="text-2xl text-blue-600 font-semibold">
                                Phác đồ tiêm
                            </span>
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
                            <span className="text-2xl text-blue-600 font-semibold">
                                Đối tượng tiêm
                            </span>
                            <p>{vaccineDetail.vaccinePatient}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
