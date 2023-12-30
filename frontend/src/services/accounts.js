import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/accounts";

const register = async (formData) => {
  const response = await axios.post(`${baseUrl}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const login = async (obj) => {
  const response = await axios.post(`${baseUrl}/login`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response.data;
};

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-account`);
  return response;
};

const updatePassword = async (obj) => {
  const response = await axios.post(`${baseUrl}/change-password`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default { register, login, logout, getCurrent, updatePassword };
