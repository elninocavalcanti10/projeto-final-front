import axios from 'axios';

const api = axios.create({
    baseURL: 'https://projetowebtwo.herokuapp.com',
});

export default api;