import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function postDashBoard(title: string, color: string) {
  try {
    await axiosCSRInstance.post("dashboards", {
      title: title,
      color: color,
    });
  } catch (e) {
    throw new Error(`${e}`);
  }
}
