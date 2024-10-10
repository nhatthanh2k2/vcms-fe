import React from 'react'
import { useNavigate } from 'react-router-dom'

export const VaccineCard = ({ vaccineDetail }) => {
    const navigate = useNavigate()

    const handleViewDetailVaccine = () => {
        if (vaccineDetail && vaccineDetail.vaccineCode) {
            navigate(`/cam-nang/thong-tin-vac-xin/${vaccineDetail.vaccineCode}`, {
                state: { vaccineDetail },
            })
        } else {
            navigate('/404')
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl mt-5">
            <figure>
                <img
                    className="w-72 object-contain mx-auto "
                    src={
                        import.meta.env.VITE_VCMS_IMAGE + '/vaccines/' + vaccineDetail?.vaccineImage
                    }
                    alt={vaccineDetail?.vaccineName}
                />
            </figure>
            <div className="card-body p-6">
                <span
                    onClick={handleViewDetailVaccine}
                    className="text-xl text-blue-700 font-bold cursor-pointer"
                >
                    {vaccineDetail?.vaccineName}
                </span>
                <p className="limited-text">{vaccineDetail?.vaccinePurpose}</p>
            </div>
        </div>
    )
}
