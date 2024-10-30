import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const revenueService = {
    getDailyRevenueOfWeek: (date) => {
        return api.get("/revenue/week/day-of-week", {
            params: { date }
        });
    },
    getMonthlyRevenueOfQuarter: (yearSelected, quarterSelected) => {
        return api.get("/revenue/quarter/month-of-quarter", {
            params: { year: yearSelected, quarter: quarterSelected }
        });
    },
    getQuarterlyRevenueOfYear: (yearSelected) => {
        return api.get("/revenue/year/quarter-of-year", {
            params: { year: yearSelected }
        });
    },
    getMonthlyRevenueOfYear: (yearSelected) => {
        return api.get("/revenue/year/month-of-year", {
            params: { year: yearSelected }
        });
    },
}