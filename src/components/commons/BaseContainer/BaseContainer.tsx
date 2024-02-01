import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import dashboardListData from "./mock/DashboardListMockData";

const cx = classNames.bind(styles);
//mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
const dashboardData = dashboardListData.dashboards;

interface BaseContainerProps {
  currentPath: string;
  children: ReactNode;
}

export default function BaseContainer({ currentPath, children }: BaseContainerProps) {
  const [dashBoardTilte, setDashBoardTitle] = useState(dashboardData[0].title);
  const [isCreatedByMe, setIsCreatedByMe] = useState(dashboardData[0].createdByMe || false);

  function handleChangeDashBoardTitle(title: string, createdByMe: boolean) {
    setDashBoardTitle(title);
    setIsCreatedByMe(createdByMe);
  }

  return (
    <div className={cx("container")}>
      <Sidebar handleChangeDashBoardTitle={handleChangeDashBoardTitle} />
      <div className={cx("contents")}>
        <Navbar currentPath={currentPath} dashBoardTilte={dashBoardTilte} isCreatedByMe={isCreatedByMe} />
        {children}
      </div>
    </div>
  );
}
