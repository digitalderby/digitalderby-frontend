import { api } from "./apiConnection";

// GET
// TODO: update route address
export const getProfileData = async (payload) => {
    return await api.post('/user/profile', payload)
}

// POST
export const registerUser = async (username, password) => {
    return await api.post('/auth/signup', {username, password})
}

export const loginUser = async (username, password) => {
    return await api.post('/auth/login', {username, password})
}

//TODO: Logout user function