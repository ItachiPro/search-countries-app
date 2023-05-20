/* eslint-disable prettier/prettier */
import axios from "axios";
import store from "@/store";

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
    let msg = "";

    if (error.response.status == 0) {
      msg = "No se pudo establecer conexión con el servidor";
    } else if (error.response.status == 500) {
      msg = "Error de servidor";
    } else if (error.response.status >= 400 && error.response.status < 500) {
      if (error.response.data.lenght != 0) {
        msg = error.response.data.message;
      } else {
        msg = error.response.statusText;
      }
    } else {
      msg = error.response.statusText;
    }
    store.dispatch("message", msg);
    store.dispatch("showAlter");
    return Promise.resolve(error.message);
  }
);

export default instance;
