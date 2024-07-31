import axios from "axios";


const API_URL = "http://localhost:8080/api/users";

const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const getUserByUsername = (username) => {
    const token = getToken();
    console.log(token);
    return axios.get(API_URL+username, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getAllUsers = () => {
    const token = getToken();
    console.log(token);
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteUser = (id) => {
    const token = getToken();
    return axios.delete(API_URL+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default {
    getUserByUsername,
    getAllUsers,
    deleteUser
};