import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const priceHistoryService = {
    getPriceHistoryOfVaccine: (vaccineId) => {
        return api.get(`/price-histories/list/${vaccineId}`)
    },
    addPriceHistory: (request) => {
        return api.post("/price-histories/add", request)
    }
}