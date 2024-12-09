import axios from "axios"
import { apiInstance } from "@/constant";

const appt_url = import.meta.env.VITE_VCMS_APPT_API

const appt_api = apiInstance({
    baseURL: appt_url,
  });

export const appointmentService = {
    createAppointmentWithOutCustCode: (request) => {
        return axios.post(appt_url + "/create", request)
    },
    createAppointmentWithCustCode: (request) => {
        return axios.post(appt_url + "/create-code", request)
    },
    getAppointmentListByInjectionDate: (selectedDate) => {
        return appt_api.get("/list/injection-date", {
            params: { selectedDate }
        });
    },
    updateAppointmentStatus: (request) => {
        return appt_api.put("/update/appointment-status", request)
    },
    getCanceledAppointmentList: () => {
        return appt_api.get("/list/canceled-list")
    },
    getAllAppointment: (page, size) => {
        return appt_api.get(`/list/all?page=${page}&size=${size}`)
    },
    getAppointmentListToday: (page, size) => {
        return appt_api.get(`/list/today?page=${page}&size=${size}`)
    },
    getAppointmentListInWeek: (page, size) => {
        return appt_api.get(`/list/week?page=${page}&size=${size}`)
    },
    getMyAppontmentList: (request) =>{
        return axios.post(appt_url + "/my-list", request)
    }
}