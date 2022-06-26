import axios from "axios";

import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';


const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    nprogress.start();
    let tempToken = store.state.detail.uuid_token ??= false;
    if (tempToken) {
        config.headers.userTempId = tempToken; 
    }
    return config;
});

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (err) => {
    return err;
});

export default requests;