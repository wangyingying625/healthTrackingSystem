import axios from '@/config/httpConfig'
import global_ from "../global";
const base= 'http://127.0.0.1:8080'
export const GET = (url, params) => {
  return axios
    .get(`${base}/${url}`, {
      params: params,
      headers: {
        'Authorization': localStorage.token,
      }
    })
    .then(res => res)
}
export const GETToken = (url, params) => {
  return axios
    .get(`${base}/${url}`, {
      params: params
    })
    .then(res => res)
}
export const POST = (url, params) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}
export const POSTToken = (url, params) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}
export const UploadForm = (url, params) => {
  return axios.post(`${base}/${url}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
