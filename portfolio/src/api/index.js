
import axios from 'axios'


//baseURL: 'http://localhost:3002/api'
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const insertContact =  payload => api.post(`/api/contact/contact`, payload)

const apis = {
    insertContact
}

export default apis
