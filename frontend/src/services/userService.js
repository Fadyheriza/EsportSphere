// services/userService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users/profile`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data', error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${apiUrl}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Failed to update user', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${apiUrl}/users/${id}`);
    } catch (error) {
        console.error('Failed to delete user', error);
        throw error;
    }
};
