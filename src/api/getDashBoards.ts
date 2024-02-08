import { axiosCSRInstance } from "./axiosCSRInstance";

export default async function getDashBoards(
  navigationMethod: "infiniteScroll" | "pagination",
  accessToken: string | null | undefined,
  size?: number,
  pageNum?: number,
  cursorId?: number | null,
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
        cursorId: cursorId,
      },
    });

    return res.data;
  } catch (e) {
    console.log(e);
    // throw new Error(`${e}`);
  }
}
