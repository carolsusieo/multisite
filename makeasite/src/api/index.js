
import axios from 'axios'


//baseURL: 'http://localhost:3002/api'
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const formIn = ({where,payload}) => api.post(where, payload)
export const displayOut = where => api.get(where)
export const configOut = where => api.get(where)
export const configUpdate = ({where,payload}) => api.put(where,payload)
export const configDelete = where => api.delete(where)
const apis = {
    formIn,
    displayOut,
    configOut,
    configUpdate,
    configDelete
}

export default apis
