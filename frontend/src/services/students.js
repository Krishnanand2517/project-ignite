import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/students";

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-student`);
  return response.data;
};

export default { getCurrent };
