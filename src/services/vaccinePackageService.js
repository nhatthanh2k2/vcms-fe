import axios from "axios"
import { apiInstance } from "@/constant";

const api_url = import.meta.env.VITE_VCMS_API

const api = apiInstance({
    baseURL: api_url,
  });

export const vaccinePackageService = {
    getAllPackages: () => axios.get(api_url + "/vaccine-package/all"),
    getDefaultPackages: () => axios.get(api_url + "/vaccine-package/list-default"),
    getDetailsOfPackage: (packageId) => axios.get(api_url + `/vaccine-package/detail/${packageId}`),
    addVaccinePackage: (request) => {
        return api.post("/vaccine-package/add", request)
    },
    deleteVaccinePackage: (packageId) => {
        return api.delete(`/vaccine-package/delete/${packageId}`)
    }
}