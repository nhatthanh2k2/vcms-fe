
import axios from "axios"


export const addressService = {
    getProvinceList: () => {
        return axios.get("https://provinces.open-api.vn/api/p/")
    },
    getDistrictList: () => {
        return axios.get("https://provinces.open-api.vn/api/d/")
    }, 
    getWardList: () => {
        return axios.get("https://provinces.open-api.vn/api/w/")
    },
    getProvinceByCode: (provinceCode) => {
        return axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}`);
    },
    getDistrictByCode: (districtCode) => {
        return axios.get(`https://provinces.open-api.vn/api/d/${districtCode}`);
    },
    getWardByCode: (wardCode) => {
        return axios.get(`https://provinces.open-api.vn/api/w/${wardCode}`);
    },
}