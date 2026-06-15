import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
})

// Auth APIs
export const registerUser = (data) => API.post('/users/register/', data)
export const loginUser = (data) => API.post('/users/login/', data)
export const getMe = () => API.get('/users/me/')

// Document APIs
export const generateDocument = (data) => API.post('/documents/generate/', data)

// Payment APIs
export const createOrder = (data) => API.post('/payments/create-order/', data)
export const verifyPayment = (data) => API.post('/payments/verify/', data)