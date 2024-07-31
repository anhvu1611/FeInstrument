import axios from "axios";


const API_URL = "http://localhost:8080/api/categories";

const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const getAllCategories = () => {
    return axios.get(API_URL);
};

const getCategoryById = (id) => {
    const token = getToken();
    console.log(token);
    return axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
}

const createCategory = (categoryRequest) => {
    const token = getToken();
    return axios.post(API_URL, categoryRequest, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const updateCategory = (id, categoryRequest) => {
    const token = getToken();
    console.log(token);
    return axios.put(`${API_URL}/${id}`, categoryRequest, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteCategory = (id) => {
    const token = getToken();
    console.log(token);
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};