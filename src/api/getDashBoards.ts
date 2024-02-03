import { axiosInstance } from "./axiosInstance";

export default async function getDashBoards(
  navigationMethod: "infiniteScroll" | "pagination",
  size?: number,
  pageNum?: number,
) {
  // 실제데이터 삽입시 엑세스토큰부분 변경
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

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
