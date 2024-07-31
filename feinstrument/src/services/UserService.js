import axios from "axios";


const API_URL = "http://localhost:8080/api/users/username/";

const getUserByUsername = (username) => {
    return axios.get(API_URL+username);
};

export default {
    getUserByUsername,
};