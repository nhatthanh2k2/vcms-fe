import axios from "axios"
import { apiInstance } from "@/constant"

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const batchDetailService = {
    getDetailOfSampleBatch: () => {
        return axios.get(api_url + "/vaccine-batch/detail/sample-batch")
    },
    updateVaccinePrice: (request) => {
        return api.put(api_url + "/batch-details/update-price", request)
    }
}