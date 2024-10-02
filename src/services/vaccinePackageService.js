import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const vaccinePackageService = {
    getAllPackages: () => axios.get(api_url + "/vaccine-package/all")
}