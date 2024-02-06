import axios from "axios";

export const axiosCSRInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/2-9/",
});

axiosCSRInstance.interceptors.request.use(
  config => {
    const cookieValue = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];
    const accessToken = cookieValue;

    config.headers["Content-Type"] === "multipart/form-data" ? "multipart/form-data" : "application/json";
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);
