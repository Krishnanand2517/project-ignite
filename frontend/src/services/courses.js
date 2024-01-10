import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "https://project-ignite-server.vercel.app/api/v1/courses"
  : "/api/courses";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getOne = async (slug) => {
  const response = await axios.get(`${baseUrl}/${slug}`);
  return response.data;
};

const createOne = async (formData) => {
  const response = await axios.post(`${baseUrl}/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateOne = async (slug, obj) => {
  const response = await axios.post(`${baseUrl}/update-details/${slug}`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteOne = async (slug) => {
  const response = await axios.delete(`${baseUrl}/delete/${slug}`);
  return response.data;
};

const addContent = async (slug, formData) => {
  const response = await axios.post(
    `${baseUrl}/add-content/${slug}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export default { getAll, getOne, createOne, updateOne, deleteOne, addContent };
