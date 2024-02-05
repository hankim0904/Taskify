import { axiosInstance } from "./axiosInstance";

export default async function getDashBoards(
  navigationMethod: "infiniteScroll" | "pagination",
  accessToken: string | null,
  size?: number,
  pageNum?: number
) {
  try {
    const res = await axiosInstance.get(`dashboards`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        navigationMethod: navigationMethod,
        size: size,
        page: pageNum,
      },
    });

    return res.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}
