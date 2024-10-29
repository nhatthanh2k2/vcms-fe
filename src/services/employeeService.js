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
    getDoctorAndNurse: () => {
        return axios.get(api_url + "/employees/getDoctorAndNurse")
    },
    bookVaccination: (request) => {
        return api.post("/employees/book/vaccination", request)
    },
    bookCustomPackage: (request) => {
        return api.post("/employees/book/custom-package", request)
    },
    resetPassword: (request) => {
        return axios.post(api_url + "/employees/reset-password", request)
    },
    changePassword: (request) => {
        return api.post("/employees/change-password", request)
    },
    createEmployee: (request) => {
        return api.post("/employees/create", request)
    },
    deleteEmployee: (employeeId) => {
        return api.delete("/employees/delete/" + employeeId)
    },
    updateProfile: (requset) => {
        return api.put("/employees/update/update-profile", requset)
    },
    updateQualificationAndPosition: (request) => {
        return api.put("/employees/update/update-from-admin", request)
    },
    updateAvatar: (username, avatarFile) => {
        
        const request = new FormData();
        request.append("username", username); 
        request.append("avatar", avatarFile); 
    
        return api.put("/employees/update/update-avatar", request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
     
}