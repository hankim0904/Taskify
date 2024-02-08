import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function getDashBoards(
  navigationMethod: "infiniteScroll" | "pagination",
  accessToken: string | null | undefined,
  size?: number,
  pageNum?: number | null,
) {
  try {
    const res = await axiosCSRInstance.get(`dashboards`, {
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
