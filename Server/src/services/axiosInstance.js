import axios from 'axios'
import config from '../config/config.js'
export const axiosInstance = axios.create({
  baseURL: config.AI_BACKEND_URL,
  withCredentials:true
})