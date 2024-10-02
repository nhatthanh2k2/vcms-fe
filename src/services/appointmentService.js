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
    getAppointmentListByDate: (selectedDate) => {
        return api.get("/appointments/list", {
            params: { selectedDate }
        });
    }
}