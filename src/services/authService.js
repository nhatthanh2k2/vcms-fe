import axios from "axios";

const authURL = import.meta.env.VITE_VCMS_AUTH_API;

export const authService = {
    login: (account) => axios.post( authURL + '/token', account)
}