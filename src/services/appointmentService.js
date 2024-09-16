import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const appointmentService = {
    createAppointmentWithOutCustCode: (request) => {
        return axios.post(api_url + "/appointments/create", request)
    },

}