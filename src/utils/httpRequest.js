import axios from 'axios';

const searchRequest = axios.create({
    baseURL: process.env.REACT_APP_SEARCH_BASE_URL,
});

const usersRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const getSearch = async (path, options = {}) => {
    const response = await searchRequest.get(path, options);
    return response.data;
};

export const getUsers = async (path, options = {}) => {
    const response = await usersRequest.get(path, options);
    return response.data;
};

export const getUserVideos = async (path, options = {}) => {
    const response = await usersRequest.get(path, options);
    return response.data;
};

const httpRequest = {
    searchRequest,
    usersRequest,
};

export default httpRequest;
