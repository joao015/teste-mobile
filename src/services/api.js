import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-wallet-theos.herokuapp.com/',
    /* other custom settings */
});

module.exports = api;
