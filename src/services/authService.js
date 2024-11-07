import axios from "axios"
import { apiInstance } from "@/constant"
import { MyToast } from "@/components";


const authURL = import.meta.env.VITE_VCMS_AUTH_API;

const api = apiInstance({
    baseURL: authURL,
  });



export const authService = {
    login: (account) => { 
        return axios.post( authURL + '/token', account)
    },
    logout: (request) => {
        return api.post('/logout', request)
    }
}

export const refreshToken = async (navigate) => {
    const currentToken = JSON.parse(sessionStorage.getItem("token"))
    try {
        const response = await axios.post(authURL + '/refresh', currentToken )
        const { token, employeeResponse } = response.data.result
        const employeeProfile = {
            ...employeeResponse,
        }
        if (response.status === 200) {
            sessionStorage.clear()
            MyToast('success', 'Làm mới token thành công.')
            sessionStorage.setItem('token', JSON.stringify({ token }))
            sessionStorage.setItem('employeeProfile', JSON.stringify({ employeeProfile }))
            return true
        } else {
            MyToast('warn', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
            sessionStorage.clear()
            navigate('/dang-nhap')
            return false
        }
    } catch (error) {
        MyToast('warn', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        sessionStorage.clear()
        navigate('/dang-nhap')
        return false
    }
}
  