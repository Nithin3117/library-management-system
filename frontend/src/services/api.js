import axios from "axios";

const api = axios.create({
  baseURL: "https://library-management-system-37uz.onrender.com",
});

export default api;
