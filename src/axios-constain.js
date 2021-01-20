import axios from "axios";

const constain = axios.create({
  baseURL: "http://localhost:4000/admin-page",
});

export default constain;
