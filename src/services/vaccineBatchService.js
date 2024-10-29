import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const vaccineBatchService = {
    getAllBatch: () => {
        return api.get("/vaccine-batch/all")
    },
    getDetailOfBatch: (batchId) => {
        return api.get(`/vaccine-batch/detail/${batchId}`)
    },
    createBatch: (request) => {
        return api.post("/vaccine-batch/add", request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}