import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://10.106.128.105:7896',
    baseURL: 'http://localhost:7896',
    // headers: {'Content-Type': 'application/json'}
});

export default instance;