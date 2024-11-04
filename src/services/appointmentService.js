import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const appointmentService = {
    createAppointmentWithOutCustCode: (request) => {
        return axios.post(api_url + "/appointments/create", request)
    },
    createAppointmentWithCustCode: (request) => {
        return axios.post(api_url + "/appointments/create-code", request)
    },
    getAppointmentListByInjectionDate: (selectedDate) => {
        return api.get("/appointments/list/injection-date", {
            params: { selectedDate }
        });
    },
    updateAppointmentStatus: (request) => {
        return api.put("/appointments/update/appointment-status", request)
    },
    getCanceledAppointmentList: () => {
        return api.get("/appointments/list/canceled-list")
    }
}