import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/instructors"
  : "/api/instructors";

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-instructor`);
  return response.data;
};

export default { getCurrent };
