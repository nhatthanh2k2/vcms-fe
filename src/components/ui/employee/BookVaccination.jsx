import React, { useState } from 'react'

export const BookVaccination = () => {
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
        // Here you would typically send the data to a server
        console.log('Submitted:', formData)
        // Reset form after submission
        setFormData({ customerName: '', vaccinationType: '', date: '', time: '' })
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Register New Vaccination Schedule</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="customerName" className="block mb-1 font-medium">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="vaccinationType" className="block mb-1 font-medium">
                        Vaccination Type
                    </label>
                    <select
                        id="vaccinationType"
                        name="vaccinationType"
                        value={formData.vaccinationType}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a type</option>
                        <option value="COVID-19">COVID-19</option>
                        <option value="Flu">Flu</option>
                        <option value="Hepatitis B">Hepatitis B</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block mb-1 font-medium">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block mb-1 font-medium">
                        Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Register Schedule
                </button>
            </form>
        </div>
    )
}
