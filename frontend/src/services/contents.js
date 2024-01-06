import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/contents";

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

export default { getAll, getAllFromCourse, getOne };
