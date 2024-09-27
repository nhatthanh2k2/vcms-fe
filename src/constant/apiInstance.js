import { getEmployeeToken } from "@/utils";
import axios from "axios";

export const apiInstance = (config) => {
    const api = axios.create(config);
    
    api.interceptors.request.use((config) => {
      const token = getEmployeeToken();
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    });
  
    return api;
  };