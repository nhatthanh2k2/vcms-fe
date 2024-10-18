
import { districts, provinces, wards } from "@/assets"


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
    getProvinceCodeByName: (provinceName) => {
        const formattedName = provinceName.trim().toLowerCase();
        const province = provinces.find((province) => province.name.toLowerCase() === formattedName);
        return province ? province.code : '';
    },
    getDistrictByCode: (districtCode) => {
        return districts.find((district) => district.code === districtCode)
    },
    getDistrictNameByCode: (districtCode) => {
        const district = districts.find((district) => district.code === districtCode)
        return district ? district.name : ''
    },
    getDistrictCodeByProvinceCodeAndDistrictName: (code, name) => {
        const formattedName = name.trim().toLowerCase();
        const district = districts.find(
            (district) => 
                district.province_code.toLocaleLowerCase() === code.trim().toLowerCase() && 
                district.name.trim().toLowerCase() === formattedName
        );
        return district ? district.code : '';
    },
    getWardByCode: (wardCode) => {
        return wards.find((ward) => ward.code === wardCode)
    },
    getWardNameByCode: (wardCode) => {
        const ward = wards.find((ward) => ward.code === wardCode)
        return ward ? ward.name : ''
    },
    getWardCodeByDistrictCodeAndWardName: (code, name) => {
        const formattedName = name.trim().toLowerCase();
        const ward = wards.find((ward) => ward.district_code === code && ward.name.toLocaleLowerCase() === formattedName)
        return ward ? ward.code : ''
    }
}