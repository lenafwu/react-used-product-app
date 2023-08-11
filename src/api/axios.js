import axios from "axios";

// TODO: replace url
export default axios.create({
  // baseURL: "https://used-product-app.lenafwu.repl.co",
  baseURL: "http://localhost:3000",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
