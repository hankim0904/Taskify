import axios from "axios";

export default async function getDashBoards(pageNum?: number, cursorId?: number | null) {
  // 실제데이터 삽입시 엑세스토큰부분 변경
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

  try {
    const res = await axios.get(`https://sp-taskify-api.vercel.app/2-9/dashboards`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        navigationMethod: "pagination",
        size: 5,
        cursorId: cursorId,
        page: pageNum,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
