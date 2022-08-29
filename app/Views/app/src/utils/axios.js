import axios from 'axios';

const api = axios.create({
    // DATABASE URL
    baseURL: 'https://localhost:7203',
});

export default api;