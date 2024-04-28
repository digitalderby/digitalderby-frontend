import { api } from "./apiConnection";

// GET
// TODO: update route address
export const getProfileData = async (payload) => {
    return await api.post('/users/', payload)
}

// POST
export const registerUser = async (payload) => {
    return await api.post('/user/register', payload)
}

export const loginUser = async (payload) => {
    return await api.post('/user/login', payload)
}

//TODO: Logout user function