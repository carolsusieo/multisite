
import axios from 'axios'


//baseURL: 'http://localhost:3002/api'
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const insertSignup =  payload => api.post('/api/signup/signup', payload)

const apis = {
    insertSignup
}

export default apis
