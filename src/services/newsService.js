import axios from "axios"
import { apiInstance } from "@/constant";

const news_url = import.meta.env.VITE_VCMS_NEWS_API

const news_api = apiInstance({
    baseURL: news_url,
  });

export const NewsService = {
    createNews: (request) => {
        return news_api.post("/create", request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}