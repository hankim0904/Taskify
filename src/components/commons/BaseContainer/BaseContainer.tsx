import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useEffect, useState } from "react";
import { axiosInstance } from "@/api/axiosInstance";

const cx = classNames.bind(styles);

interface DashBoradData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: true;
  userId: number;
}

interface BaseContainerProps {
  currentPath: string;
  children: ReactNode;
}

export default function BaseContainer({ currentPath, children }: BaseContainerProps) {
  const [dashBoardList, setDashBoardList] = useState<DashBoradData[]>([]);
  const [dashBoardTilte, setDashBoardTitle] = useState("");
  const [isCreatedByMe, setIsCreatedByMe] = useState(false);

  function setInitialValues(dashBoardList: DashBoradData[]) {
    if (dashBoardList.length > 0) {
      setDashBoardTitle(dashBoardList[0].title);
      setIsCreatedByMe(dashBoardList[0].createdByMe);
    }
  }

  async function getDashBoardList() {
    try {
      const res = await axiosInstance.get(`dashboards`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY`,
        },
        params: {
          navigationMethod: "infiniteScroll",
        },
      });

      const dashBoardList = res.data.dashboards;

      setDashBoardList(dashBoardList);
      setInitialValues(dashBoardList);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDashBoardList();
  }, []);

  function handleChangeDashBoardTitle(title: string, createdByMe: boolean) {
    setDashBoardTitle(title);
    setIsCreatedByMe(createdByMe);
  }

  return (
    <div className={cx("container")}>
      <Sidebar dashBoardList={dashBoardList} handleChangeDashBoardTitle={handleChangeDashBoardTitle} />
      <div className={cx("contents")}>
        <Navbar currentPath={currentPath} dashBoardTilte={dashBoardTilte} isCreatedByMe={isCreatedByMe} />
        {children}
      </div>
    </div>
  );
}
