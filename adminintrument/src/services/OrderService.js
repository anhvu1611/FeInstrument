import axios from "axios";


const API_URL = "http://localhost:8080/admin/api/order";

const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const createOrder = (orderRequest) => {
    const token = getToken();
    console.log(token);
    return axios.post(API_URL, orderRequest, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const getOrderById = (id) => {
    const token = getToken();
    console.log(token);
    return axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const getAllOrders = () => {
    const token = getToken();
    console.log(token);
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default {
    createOrder,
    getOrderById,
    getAllOrders
};