import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const vaccineService = {
    getAllVaccines: () => {
        return axios.get(api_url +  "/vaccines/all")
    },
    createVaccine: (request) => {
        return api.post("/vaccines/create-vaccine", request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getVaccinesOfDisease: (diseaseId) => {
        return axios.get(api_url + `/vaccines/list-of-disease/${diseaseId}`)
    },
    deleteVaccine: (vaccineId) => {
        return api.delete(`/vaccines/delete/${vaccineId}`)
    },
    updateVaccineInfo: (vaccineid, request) => {
        return api.put(api_url + `/vaccines/update/${vaccineid}`, request)
    }

}