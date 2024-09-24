import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const orderService = {
    createOrderWithCustomerCode: (requset) => {
        return axios.post(api_url + "/orders/create-code", requset)
    },
    createOrder: (request) => {
        return axios.post(api_url + "/orders/create", request)
    }
}