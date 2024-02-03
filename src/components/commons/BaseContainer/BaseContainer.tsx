import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useEffect, useState } from "react";
import getDashBoards from "@/api/getDashBoards";
import { useQuery } from "@tanstack/react-query";

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
  const [dashBoardTitle, setDashBoardTitle] = useState("");
  const [isCreatedByMe, setIsCreatedByMe] = useState(false);

  function setInitialValues(dashboardDatas: DashBoradData[]) {
    if (dashboardDatas.length > 0) {
      setDashBoardTitle(dashboardDatas[0].title);
      setIsCreatedByMe(dashboardDatas[0].createdByMe);
    }
  }

  const { data } = useQuery({
    queryKey: ["headers"],
    queryFn: () => getDashBoards("infiniteScroll", 60),
  });

  const dashboardDatas = data?.dashboards || [];

  useEffect(() => {
    setInitialValues(dashboardDatas);
  }, [dashboardDatas]);

  function handleChangeDashBoardTitle(title: string, createdByMe: boolean) {
    setDashBoardTitle(title);
    setIsCreatedByMe(createdByMe);
  }

  return (
    <div className={cx("grid")}>
      <div className={cx("grid-sidebar")}>
        <Sidebar dashboardDatas={dashboardDatas} handleChangeDashBoardTitle={handleChangeDashBoardTitle} />
      </div>
      <div className={cx("grid-navbar")}>
        <Navbar currentPath={currentPath} dashBoardTitle={dashBoardTitle} isCreatedByMe={isCreatedByMe} />
      </div>
      <div className={cx("grid-content")}>{children}</div>
    </div>
  );
}
