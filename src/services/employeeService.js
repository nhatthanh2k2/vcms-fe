import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const employeeService =  {
    get: () => {
        return axios.get(api_url + "/employees/get")
    }
}