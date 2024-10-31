
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const injectionService = {
    getVaccineDoseCountForNextMonth: () => {
        return api.get("/injections/count-dose/next-month")
    },
    getDailyDoseCountOfWeek: (date) => {
        return api.get("/injections/count-dose/day-of-week", {
            params: { date }
        });
    }
}