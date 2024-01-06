import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/courses";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getOne = async (slug) => {
  const response = await axios.get(`${baseUrl}/${slug}`);
  return response.data;
};

export default { getAll, getOne };
