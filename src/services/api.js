import axios from 'axios'

const Client = axios.create({baseURL: process.env.BASE_URL})

export default Client