import { api } from "./apiConnection";
import axios from "axios";

// GET
// TODO: update route address
export const getProfileData = async (payload) => {
    return await api.post('/users/', payload)
}

export const getAllHorses = async () => {
    try {
        const response = await axios.get('/horses');
        console.log(response); 
        return response.data;
    } catch (error) {
        console.error('Failed to fetch horses:', error);
        throw error;
    }
}

// POST
export const registerUser = async (username, password) => {
    return await api.post('/auth/signup', {username, password})
}

export const loginUser = async (username, password) => {
    return await api.post('/auth/login', {username, password})
}

//TODO: Logout user function

export const logoutUser = () => {
    sessionStorage.removeItem('token');
    // Redirect user to the login page
    window.location.href = '/login';
}