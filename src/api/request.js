import axios from "axios";

import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
console.log(nprogress);


const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (err) => {
    return err;
})

export default requests;