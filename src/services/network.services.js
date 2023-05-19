/* eslint-disable prettier/prettier */
import axios from "axios";

let config = {
  baseURL: process.env.VUE_APP_API_URL || "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(function (config) {
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "";
    let type = "error";

    if (error.response.status == 0) {
      message = "No se pudo establecer conexión con el servidor";
    } else if (error.response.status == 500) {
      message = "Error de servidor";
    } else if (error.response.status >= 400 && error.response.status < 500) {
      if (error.response.data.lenght != 0) {
        message = error.response.data[0].message;
      } else {
        message = error.response.statusText;
      }
    } else {
      message = error.response.statusText;
    }
    console.log(message, type);
    return Promise.resolve(error.message);
  }
);

export default instance;
