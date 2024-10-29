import axios from "axios"

const api_url = import.meta.env.VITE_VCMS_API

export const batchDetailService = {
    getDetailOfSampleBatch: () => {
        return axios.get(api_url + "/vaccine-batch/detail/sample-batch")
    }
}