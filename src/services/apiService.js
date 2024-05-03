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

export const startServer = async () => {
    try {
        const response = await api.post('/admin/startRaceServer');
        if (response.status === 200) {
            console.log("Server started successfully:", response.data.message);
            return response.data;
        } else {
            throw new Error('Server did not start successfully.');
        }
    } catch (error) {
        console.error("Error starting the server:", error);
        throw error; 
    }
}

export const startMainLoop = async () => {
    try {
        const response = await api.post('/admin/startRaceLoop');
        if (response.status === 200) {
            console.log("Main loop started successfully:", response.data.message);
            return response.data;
        } else {
            throw new Error('Main loop did not start successfully.');
        }
    } catch (error) {
        console.error("Error starting the main loop:", error);
        throw error; 
    }
}

export const endServer = async () => {
    try {
        const response = await api.post('/admin/stopRaceServer');
        if(response.status === 200) {
            console.log("Server Stopped:", response.data.message);
            return response.data;
        } else {
            throw new Error('Server not stopped successfully.');
        }
    } catch (error) {
        console.error("Error stopping the server:", error);
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

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        if (response.status !== 200) {
            throw new Error('Failed to fetch users');
        }
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


//TODO: Logout user function

export const logoutUser = () => {
    sessionStorage.removeItem('token');
    // Redirect user to the login page
    window.location.href = '/login';
}