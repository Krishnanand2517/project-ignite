import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/questions"
  : "/api/questions";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addOne = async (obj) => {
  const response = await axios.post(`${baseUrl}/add`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseUrl}/delete/${id}`);
  return response.data;
};

const updateOne = async (id, obj) => {
  const response = await axios.post(`${baseUrl}/edit/${id}`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default { getAll, getOne, addOne, deleteOne, updateOne };
