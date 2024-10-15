import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const screeningRecordService = {
    createScreeningRecord: (request) => {
        return api.post("/screening-record/create", request)
    }
}