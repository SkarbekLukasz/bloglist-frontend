import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const saveNewBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateLikesCount = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response;
};

export default { getAll, saveNewBlog, setToken, updateLikesCount };
