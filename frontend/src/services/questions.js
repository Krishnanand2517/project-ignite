import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/questions";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

export default { getAll };
