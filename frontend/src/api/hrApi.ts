/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/hrApi.js
import axios from "axios";

export const getHRData = () =>
  axios.get(`${import.meta.env.VITE_BACKEND_URL_DATA}/api/hr/hr`);

export const saveHRConfig = (data: any) =>
  axios.post(`${import.meta.env.VITE_BACKEND_URL_DATA}/api/hr/hr/save`, data);