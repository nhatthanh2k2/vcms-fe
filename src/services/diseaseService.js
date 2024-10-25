import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const diseaseService = {
    getAllDiseases: () => {
        return axios.get(api_url + "/diseases/all")
    },
}