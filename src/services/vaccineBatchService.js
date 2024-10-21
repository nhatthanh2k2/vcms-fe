import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const vaccineBatchService = {
    getAllBatch: () => {
        return api.get("/vaccine-batch/all")
    }
}