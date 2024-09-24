import axios from "axios"


const api_url = import.meta.env.VITE_VCMS_API

export const customerService = {
    lookupCustomer: (requset) => {
        return axios.post(api_url + "/customers/lookup", requset)
    }
}