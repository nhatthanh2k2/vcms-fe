import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API


export const vaccineService = {
    getAllVaccines: () => {
        return axios.get(api_url +  "/vaccines/all")
    }

}