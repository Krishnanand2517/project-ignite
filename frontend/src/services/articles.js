import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/articles"
  : "/api/articles";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getOne = async (slug) => {
  const response = await axios.get(`${baseUrl}/${slug}`);
  return response.data;
};

const getContent = async (link) => {
  const response = await axios.get(link);
  return response.data;
};

const createOne = async (formData) => {
  const response = await axios.post(`${baseUrl}/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const deleteOne = async (slug) => {
  const response = await axios.delete(`${baseUrl}/delete/${slug}`, {
    withCredentials: true,
  });
  return response.data;
};

const updateOne = async (slug, formData) => {
  const response = await axios.post(`${baseUrl}/update/${slug}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const likeOne = async (slug) => {
  const response = await axios.post(`${baseUrl}/like/${slug}`, null, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getAll,
  getOne,
  getContent,
  createOne,
  deleteOne,
  updateOne,
  likeOne,
};
