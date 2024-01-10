import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/students"
  : "/api/students";

const getCurrent = async () => {
  const response = await axios.get(`${baseUrl}/get-student`);
  return response.data;
};

export default { getCurrent };
