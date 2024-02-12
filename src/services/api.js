import axios from 'axios'
export const BASE_URL = "http://localhost:4000/"

const Client = axios.create({baseURL: BASE_URL})

export default Client