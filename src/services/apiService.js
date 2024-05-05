import { api } from "./apiConnection";



// GET
export const getProfileData = async (username) => {
    try {
        if (!username) {
            throw new Error("Username is required to fetch profile data.");
        }
        const response = await api.get(`/users/${username}`);
        return response.data;  // Return the data directly for ease of use
    } catch (error) {
        console.error("Failed to fetch profile data:", error);
        // Depending on your error handling strategy, you might want to re-throw the error or handle it differently
        throw error;  
    }
}



export const getAllHorses = async () => {
    try {
        const response = await api.get('/horses');
        console.log(response); 
        return response.data;
    } catch (error) {
        console.error('Failed to fetch horses:', error);
        throw error;
    }
}

export const getServerStatus = async () => {
    try {
        const response = await api.get('/admin/serverStatus');
        console.log("Server status fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        throw error;
    }
};


export const startMainLoop = async () => {
    try {
        const response = await api.post('/admin/openServer');
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
        const response = await api.post('/admin/closeServer');
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

// src/services/apiService.js
export const deleteUser = async (user) => {
    try {
        const response = await api.delete(`/users/${user._id}`);
        return response.data;  
    } catch (error) {
        console.error("Failed to delete user:", error);
        throw error;
    }
};

export const logoutUser = () => {
    sessionStorage.removeItem('token');
    // Redirect user to the login page
    window.location.href = '/login';
}
