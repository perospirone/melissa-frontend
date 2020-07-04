import axios from "axios";

const api = axios.create({ baseURL: "http://melissajs.herokuapp.com" });

export default api;
