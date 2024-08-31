import { provinces } from "@/assets/data/provinces"
import { districts } from "@/assets/data/districts"
import { wards } from "@/assets/data/wards"


export const addressService = {
    getProvinceList: () => provinces,
    getDistrictList: () => districts, 
    getWardList: () => wards
}