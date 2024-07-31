import axios from "axios";


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

export default {
    getAllProducts,
    getProductById,
    getProductsByCategory
};