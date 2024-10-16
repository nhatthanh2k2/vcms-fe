
import { districts, provinces, wards } from "@/assets"
import axios from "axios"


export const addressService = {
    getProvinceList: () => {
        return provinces
    },
    getDistrictList: () => {
        return districts
    }, 
    getWardList: () => {
        return wards
    },
    getProvinceByCode: (provinceCode) => {
        return provinces.find((province) => province.code === provinceCode)
    },
    getProvincenNameByCode: (provinceCode) => {
        const province = provinces.find((province) => province.code === provinceCode)
        return province ? province.name : '';
    },
    getDistrictByCode: (districtCode) => {
        return districts.find((district) => district.code === districtCode)
    },
    getDistrictNameByCode: (districtCode) => {
        const district = districts.find((district) => district.code === districtCode)
        return district ? district.name : ''
    },
    getWardByCode: (wardCode) => {
        return wards.find((ward) => ward.code === wardCode)
    },
    getWardNameByCode: (wardCode) => {
        const ward = wards.find((ward) => ward.code === wardCode)
        return ward ? ward.name : ''
    },
}