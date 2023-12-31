import axios from "axios";
// TO BE UPDATED BEFORE DEPLOYING IN PRODUCTION
const baseUrl = import.meta.env.PROD ? "" : "/api/instructors";

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-instructor`);
  return response.data;
};

export default { getCurrent };
