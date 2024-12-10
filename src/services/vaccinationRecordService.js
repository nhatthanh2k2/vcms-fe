
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const vaccinationRecordService = {
    createVaccinationRecord: (request) => {
        return api.post("/vaccination-record/create", request)
    },
    getVaccinationRecordByCreateDate: (createDate) => {
        return api.get("/vaccination-record/list/create-date", {
            params: { createDate }
        })
    },
    createVaccinationRecordFromHandbook: (request) => {
        return api.post("/vaccination-record/create/handbook", request)
    },
    
}