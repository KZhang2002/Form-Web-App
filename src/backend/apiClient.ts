import axios from "axios";

const API_URL = "http://localhost:8080";

export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (err: any) {
    console.error(`Error in ${endpoint}:`, err.response?.data?.error);
    throw err;
  }
};

export const getData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (err: any) {
    console.error(`Error in ${endpoint}:`, err.response?.data?.error);
    throw err;
  }
};

export const patchData = async (endpoint: string, payload: object) => {
  try {
    const response = await axios.patch(`${API_URL}/${endpoint}`, payload);
    return response.data;
  } catch (err: any) {
    console.error(`Error in ${endpoint}:`, err.response?.data?.error);
    throw err;
  }
};