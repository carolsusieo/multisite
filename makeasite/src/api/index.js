
import axios from 'axios'


//baseURL: 'http://localhost:3002/api'
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const formIn = ({where,payload}) => api.post(where, payload)
export const displayOut = where => api.get(where)
const apis = {
    formIn,
    displayOut
}


export default apis
