import axios from 'axios';
import { AsyncStorage } from 'react-native'

const API_BASE_URL = "https://storeclient-api.herokuapp.com/api/v1";


axios.interceptors.request.use(async (config) => {
    const token =  await  AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (401 === error && error.response && error.response.status) {
        alert("Votre session a expirée. Véillez vous re-connecter");
    } else {
        return Promise.reject(error);
    }
});

let getAPIBaseURL = () => {
    return API_BASE_URL;
};

let login = (params) => {
    return axios.post(API_BASE_URL + '/user/login', params)
};

let logout = () => {
    return axios.post(API_BASE_URL + '/user/logout')
};

let register = (params) => {
    return axios.post(API_BASE_URL + '/user/signup', params)
};

let updateProfile = (id, params) => {
    return axios.patch(API_BASE_URL + '/user/' + id, params)
};

let updatePushToken = (params) => {
    return axios.patch(API_BASE_URL + '/user/push-token/set', params)
};

let fetchConfigFilters = () => {
    return axios.get(API_BASE_URL + '/config/filters')
};

let fetchArticles=  (params)=>  {
    let q = '';
    if (params.hasOwnProperty("page"))
        q += '?page=' + params.page;
    if (params.limit)
        q += '&limit=' + params.limit;
    if (params.hasOwnProperty('dateSort'))
        q += '&dateSort=' + params.dateSort;
    if (params.priceSort)
        q += '&priceSort=' + params.priceSort;
    if (params.priceMin && params.priceMin)
        q += '&priceMin=' + params.priceMin;
    if (params.priceMax && params.priceMax)
        q += '&priceMax=' + params.priceMax;
    if (params.search && params.search.trim().length)
        q += '&search=' + params.search;
    if (params.designation && params.designation.trim().length)
        q += '&designation=' + params.designation;
    console.log("GOT Q = ", q);
    return axios.get(API_BASE_URL + '/article' + q);

};

let findArticle = (id) => {
    return axios.get(API_BASE_URL + '/article/' + id);
};

let createArticle = (params) => {
    return axios.post(API_BASE_URL + '/Product/create', params);
};

let sendTypingEvent = (cid, status, uid) => {
    return axios.get(API_BASE_URL + '/user/' + cid + '/' + status + '/typing?uid=' + uid);
};

let createClaim = (params) =>{
    return axios.post(API_BASE_URL + '/claim/create', params);
};
let createContact = (params) =>{
    return axios.post(API_BASE_URL + '/contact/create', params);
};
let findOrder = (id) =>{
    return axios.get(API_BASE_URL + '/order/userOder/' + id);
};

let createOrder = (params) =>{
    return axios.post(API_BASE_URL + '/order/create', params);
};
let verifierMail = (params) =>{
    return axios.post(API_BASE_URL + '/user/verifie-mail', params);
};
let resetPassword = (params) =>{
    return axios.post(API_BASE_URL + '/user/reset_password', params);
};






export default{
    getAPIBaseURL,
    login,
    logout,
    register,
    updateProfile,
    updatePushToken,
    fetchConfigFilters,
    createArticle,
    fetchArticles,
    findArticle,
    sendTypingEvent,
    createClaim,
    createContact,
    findOrder,
    createOrder,
    verifierMail,
    resetPassword

};
