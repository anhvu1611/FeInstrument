import axios from "axios";

const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const API_URL = "http://localhost:8080/api/products";

const getAllProducts = () => {
    return axios.get(API_URL);
};

const getProductById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const getProductsByCategory = (category) => {
    return axios.get(`${API_URL}/category/${category}`);
}

const deleteProductById = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

const updateProduct = (id, data) => {
    const token = getToken();
    console.log(token);
    return axios.put(`${API_URL}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
}

const createProduct = (data) => {
    const token = getToken();
    return axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    deleteProductById,
    updateProduct,
    createProduct
};