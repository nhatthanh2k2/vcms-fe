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
        if (response.status === 200) {
            sessionStorage.removeItem('token')
            MyToast('success', 'Làm mới token thành công.')
            sessionStorage.setItem('token', JSON.stringify(response.data.result.token))
            console.log('Refresh token successfully.');
            return true
        } else {
            MyToast('warn', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
            sessionStorage.clear()
            navigate('/dang-nhap')
            console.log('Phiên đăng nhập đã hết hạn')
            return false
        }
    } catch (error) {
        MyToast('error', 'Lỗi khi làm mới token. Vui lòng đăng nhập lại.')
        sessionStorage.clear()
        navigate('/dang-nhap')
        console.log('Lỗi khi làm mới token')
        return false
    }
}
  