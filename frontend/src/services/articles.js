import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/articles";

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
  });
  return response.data;
};

export default { getAll, getOne, getContent, createOne };
