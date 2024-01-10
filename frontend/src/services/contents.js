import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/contents"
  : "/api/contents";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getAllFromCourse = async (id) => {
  const response = await axios.get(`${baseUrl}/from-course/${id}`);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseUrl}/delete-content/${id}`);
  return response.data;
};

export default { getAll, getAllFromCourse, getOne, deleteOne };
