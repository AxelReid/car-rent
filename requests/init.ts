import axios from 'axios'
import { API_URL } from './constants'

export const request = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin':
      'https://carrentuzb.herokuapp.com/api/v1/car/recommended',
    'Content-Type': 'application/json',
  },
})
