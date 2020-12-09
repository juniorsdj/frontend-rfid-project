import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = "http://api-rfid-dev.herokuapp.com/v1"

export const handleResponseSuccess = async (response: { data: any; }) => {
    return response.data;
};

const AxiosApi = axios;
AxiosApi.defaults.baseURL = API_URL;
AxiosApi.interceptors.response.use(handleResponseSuccess);

export const setBearerToken = (token: string) => {
    AxiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default AxiosApi;
