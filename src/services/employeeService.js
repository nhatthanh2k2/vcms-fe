import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const employeeService =  {
    getAllEmployees: () => {
        return axios.get(api_url + "/employees/all")
    },
    bookVaccination: (request) => {
        return api.post("/employees/book/vaccination", request)
    },
    bookCustomPackage: (request) => {
        return api.post("/employees/book/custom-package", request)
    }
    
}