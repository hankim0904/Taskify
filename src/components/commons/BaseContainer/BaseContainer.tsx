import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useEffect, useState } from "react";
import getDashBoards from "@/api/getDashBoards";
import { useQuery } from "@tanstack/react-query";
import PageChangeButton from "../../commons/Buttons/PageChangeButton";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const cx = classNames.bind(styles);

interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface BaseContainerProps {
  currentPath: string;
  children: ReactNode;
}

export default function BaseContainer({ currentPath, children }: BaseContainerProps) {
  const [isCreatedByMe, setIsCreatedByMe] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardData | null>(null);

  const router = useRouter();
  const dashboardId: string | string[] | undefined = router.query.dashboardid;

  const { accessToken } = useAuth();

  const { data } = useQuery({
    queryKey: ["sideBarDashboardList", currentPage, 18],
    queryFn: () => getDashBoards("pagination", accessToken, 18, currentPage),
  });

  const totalPage = Math.ceil(data?.totalCount / 18);
  const dashboardDatas = data?.dashboards || [];

  useEffect(() => {
    const dashboardId: string | string[] | undefined = router.query.dashboardid;
    if (dashboardId) {
      const selectedDashboard = dashboardDatas.find((data: DashboardData) => data.id === Number(dashboardId));
      setSelectedDashboard(selectedDashboard);
    }
  }, [currentPage, router.query.dashboardid, dashboardDatas]);

  const [dashBoardTitle, setDashBoardTitle] = useState(dashboardDatas[0]?.title);

  function handleChangeDashBoardTitle(selectedDashboard: DashboardData) {
    setDashBoardTitle(selectedDashboard.title);
    setIsCreatedByMe(selectedDashboard.createdByMe);
  }

  return (
    <div className={cx("grid")}>
      <div className={cx("grid-sidebar")}>
        <Sidebar
          handleChangeDashBoardTitle={handleChangeDashBoardTitle}
          dashboardDatas={dashboardDatas}
          selectedDashboardId={dashboardId}
          setSelectedDashboard={setSelectedDashboard}
        />
        <div className={cx("page-change")}>
          <span className={cx("page-change-text")}>{`${totalPage} 페이지 중 ${currentPage}`}</span>

          <span className={cx("page-change-btn")}>
            <PageChangeButton
              isForward={false}
              onClick={() => {
                setCurrentPage((currentPage) => currentPage - 1);
              }}
              disabled={currentPage <= 1}
            />
            <PageChangeButton
              onClick={() => {
                setCurrentPage((currentPage) => currentPage + 1);
              }}
              disabled={currentPage >= totalPage}
            />
          </span>
        </div>
      </div>
      <div className={cx("grid-navbar")}>
        <Navbar
          currentPath={currentPath}
          selectedDashboard={selectedDashboard}
          dashBoardTitle={dashBoardTitle}
          isCreatedByMe={isCreatedByMe}
        />
      </div>
      <div className={cx("grid-content")}>{children}</div>
    </div>
  );
}
