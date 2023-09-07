import axios from "axios";

// TODO: replace url
export default axios.create({
  // baseURL: "https://used-product-app.lenafwu.repl.co",
 // baseURL: "http://localhost:3000",
//  baseURL: "https://129.153.53.89",
 baseURL: "https://rou-ruan.com",
});

export const axiosPrivate = axios.create({
 // baseURL: "http://localhost:3000",
//  baseURL: "https://129.153.53.89",
  baseURL: "https://rou-ruan.com",
  

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
