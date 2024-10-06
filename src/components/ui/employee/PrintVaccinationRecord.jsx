import React, { useState } from 'react'

export const PrintVaccinationRecord = () => {
    const initialVaccines = [
        { id: 1, name: 'Vaccine A' },
        { id: 2, name: 'Vaccine B' },
        { id: 3, name: 'Vaccine C' },
    ]

    // State cho danh sách vắc xin đã chọn (trong gói) và chưa chọn (ngoài gói)
    const [selectedVaccines, setSelectedVaccines] = useState([])
    const [availableVaccines, setAvailableVaccines] = useState(initialVaccines)

    // Hàm thêm vắc xin vào gói
    const addVaccineToPackage = (vaccine) => {
        setSelectedVaccines([...selectedVaccines, vaccine]) // Thêm vào danh sách đã chọn
        setAvailableVaccines(availableVaccines.filter((v) => v.id !== vaccine.id)) // Xóa khỏi danh sách ngoài gói
    }

    // Hàm xóa vắc xin khỏi gói
    const removeVaccineFromPackage = (vaccine) => {
        setAvailableVaccines([...availableVaccines, vaccine]) // Thêm lại vào danh sách ngoài gói
        setSelectedVaccines(selectedVaccines.filter((v) => v.id !== vaccine.id)) // Xóa khỏi danh sách đã chọn
    }

    return (
        <div className="vaccine-package">
            <h2>Gói Vaccine</h2>
            <div className="flex">
                {/* Danh sách các vắc xin chưa có trong gói */}
                <div className="available-vaccines flex-1">
                    <h3>Danh sách vắc xin có sẵn</h3>
                    <ul>
                        {availableVaccines.map((vaccine) => (
                            <li key={vaccine.id}>
                                {vaccine.name}
                                <button onClick={() => addVaccineToPackage(vaccine)}>
                                    Thêm vào gói
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Danh sách các vắc xin đã được chọn trong gói */}
                <div className="selected-vaccines flex-1">
                    <h3>Danh sách vắc xin trong gói</h3>
                    <ul>
                        {selectedVaccines.map((vaccine) => (
                            <li key={vaccine.id}>
                                {vaccine.name}
                                <button onClick={() => removeVaccineFromPackage(vaccine)}>
                                    Xóa khỏi gói
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
