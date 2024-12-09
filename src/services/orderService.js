import axios from "axios"
import { apiInstance } from "@/constant";

const order_url = import.meta.env.VITE_VCMS_ORDER_API

const order_api = apiInstance({
    baseURL: order_url,
  });

export const orderService = {
    createOrderWithCustomerCode: (requset) => {
        return axios.post(order_url + "/create-code", requset)
    },
    createOrder: (request) => {
        return axios.post(order_url + "/create", request)
    },
    getOrderListByInjectionDate: (selectedDate) => {
        return order_api.get("/list/injection-date", {
            params: { selectedDate }
        });
    },
    getAllOrderDetailByOrderId: (orderId) => {
        return order_api.get(`/detail/${orderId}`)
    },
    getMyOrder: (orderId) =>{
        return axios.get(order_url + `/detail/my-order/${orderId}`)
    },
    getAllOrder: (page, size) => {
        return order_api.get(`/list/all?page=${page}&size=${size}`)
    },
    getAllOrderToday: (page, size) => {
        return order_api.get(`/list/today?page=${page}&size=${size}`)
    },
    getAllOrderInWeek: (page, size) => {
        return order_api.get(`/list/week?page=${page}&size=${size}`)
    },
    getMyOrderList: (request) => {
        return axios.post(order_url + "/my-list", request)
    }
}