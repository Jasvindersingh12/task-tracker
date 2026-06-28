import axios from "axios";

const api = axios.create({
  baseURL: "https://task-tracker-02n0.onrender.com/api",
});

export default api;