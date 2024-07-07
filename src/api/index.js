import axios from './axios.js'

export function login(userName, password) {
  return axios.post(`/sso/login?userName=${userName}&password=${password}`)
}

export function logout() {
  return axios.post(`/sso/logout`)
}

export function getUserInfo() {
  return axios.post(`/sso/getUserInfo`,)
}

export function addUser(data) {
  return axios.post('/user/add', data)
}

export function forbidUser(id) {
  return axios.post('/user/disable', {id})
}

export function queryUsers(page, pageSize) {
  return axios.post('/user/page', {
    page,
    pageSize
  })
}

export function queryInventoryDetails(modelId, page, pageSize) {
  return axios.post("/warehouse/detailsPage", {
    modelId,
    page,
    pageSize
  })
}

export function enterWarehouse(id, enterNumber, remark) {
  return axios.post("/warehouse/enterWarehouse", {
    id, enterNumber, remark
  })
}

export function outWarehouse(id, outNumber, remark) {
  return axios.post("/warehouse/outWarehouse", {
    id, outNumber, remark
  })
}

export function queryInventory(modelCode, page, pageSize) {
  return axios.post("/warehouse/page", {
    modelCode,
    page,
    pageSize
  })
}

export function addProduct(data) {
  return axios.post("/warehouse/save", data)
}
