import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const orderService = {
    createOrderWithCustomerCode: (requset) => {
        return axios.post(api_url + "/orders/create-code", requset)
    },
    createOrder: (request) => {
        return axios.post(api_url + "/orders/create", request)
    },
    getOrderListByInjectionDate: (selectedDate) => {
        return api.get("/orders/list/injection-date", {
            params: { selectedDate }
        });
    },
    getAllOrderDetailByOrderId: (orderId) => {
        return api.get(`/orders/detail/${orderId}`)
    },
    getMyOrder: (orderId) =>{
        return axios.get(api_url + `/orders/detail/my-order/${orderId}`)
    }
}