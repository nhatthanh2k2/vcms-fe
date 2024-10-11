import axios from "axios"
import { apiInstance } from "@/constant"

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const customerService = {
    lookupCustomer: (requset) => {
        return axios.post(api_url + "/customers/lookup", requset)
    },
    createCustomer: (request) => {
        return api.post("/customers/create", request)
    },
    getMyVaccinationHistory: (request) => {
        return axios.post(api_url + "/vaccination-record/getMyHistory", request)
    }
}