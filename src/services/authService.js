import axios from "axios"
import { apiInstance } from "@/constant"

const authURL = import.meta.env.VITE_VCMS_AUTH_API;

const api = apiInstance({
    baseURL: authURL,
  });

export const authService = {
    login: (account) => { 
        return axios.post( authURL + '/token', account)
    },
    logout: (request) => {
        return api.post('/logout', request)
    }
}