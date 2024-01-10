import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/accounts"
  : "/api/accounts";

const register = async (formData) => {
  const response = await axios.post(`${baseUrl}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const login = async (obj) => {
  const response = await axios.post(`${baseUrl}/login`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response.data;
};

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-account`, {
    withCredentials: true,
  });
  return response;
};

const updatePassword = async (obj) => {
  const response = await axios.post(`${baseUrl}/change-password`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

const updateAvatar = async (formData) => {
  const response = await axios.post(`${baseUrl}/update-avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrent,
  updatePassword,
  updateAvatar,
};
