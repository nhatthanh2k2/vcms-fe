import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const diseaseService = {
    getAllDiseases: () => {
        return axios.get(api_url + "/diseases/all")
    },
    addDisease: (request) => {
        return api.post('/diseases/create', request)
    },
    deleteDisease: (diseaseId) => {
        return api.delete(`/diseases/delete/${diseaseId}`)
    }
}