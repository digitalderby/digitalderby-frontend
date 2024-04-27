import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// TODO: create interceptor to attach JWT to axios headers