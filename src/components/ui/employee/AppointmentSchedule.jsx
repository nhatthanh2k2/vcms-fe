import React, { useState } from 'react'

export const AppointmentSchedule = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [schedules, setSchedules] = useState([
        { id: 1, time: '09:00 AM', type: 'COVID-19', available: true },
        { id: 2, time: '10:30 AM', type: 'Flu', available: false },
        { id: 3, time: '02:00 PM', type: 'Hepatitis B', available: true },
    ])

    const handleDateChange = (days) => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + days)
        setCurrentDate(newDate)
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Vaccination Schedules</h2>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => handleDateChange(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Previous Day
                </button>
                <h3 className="text-xl font-semibold">{currentDate.toLocaleDateString()}</h3>
                <button
                    onClick={() => handleDateChange(1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Next Day
                </button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Time</th>
                        <th className="p-2 text-left">Vaccination Type</th>
                        <th className="p-2 text-left">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id} className="border-b">
                            <td className="p-2">{schedule.time}</td>
                            <td className="p-2">{schedule.type}</td>
                            <td className="p-2">
                                <span
                                    className={`px-2 py-1 rounded ${
                                        schedule.available
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-red-200 text-red-800'
                                    }`}
                                >
                                    {schedule.available ? 'Available' : 'Booked'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
