import axios from "axios";

const api = axios.create({ baseURL: "https://melissajs.herokuapp.com/" });

export default api;
