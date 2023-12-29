import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/questions";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
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

export default { getAll, addOne, deleteOne };
