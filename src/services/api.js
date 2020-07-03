import axios from "axios";

const api = axios.create({ baseURL: "localhost:8080" });

export default api;
