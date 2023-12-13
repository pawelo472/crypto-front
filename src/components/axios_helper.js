import axios from "axios";

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:8085';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};

export const setApikey = (apikey) => {
    window.localStorage.setItem('apikey', apikey);
};
export const setSecretApikey = (secretapikey) => {
    window.localStorage.setItem('secretapikey', secretapikey);
};


export const getApikey = () => {
    return window.localStorage.getItem('apikey');
};

export const getSecretApikey = () => {
    return window.localStorage.getItem('secretapikey');
};
