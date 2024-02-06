import axios from "axios";

export const axiosSSRInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/2-9/",
});
