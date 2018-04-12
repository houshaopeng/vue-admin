import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getProductList = params => { return axios.get(`${base}/product/list`, { params: params }); };

export const getFoodList = params => { return axios.get(`${base}/food/list`, { params: params }); };

export const getFoodListPage = params => { return axios.get(`${base}/food/listpage`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const removeFood = params => { return axios.get(`${base}/food/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const batchRemoveFood = params => { return axios.get(`${base}/food/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };