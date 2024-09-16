import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API


export const vaccineService = {
    get: () => {
        return axios.get(api_url +  "/vaccines/get")
    }

}