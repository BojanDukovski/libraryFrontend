import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://library-lab2-emt.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance;