import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useEffect, useRef, useState } from "react";
import getDashBoards from "@/api/getDashBoards";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useIntersectionObserver } from "@/components/domains/dashboardid/utils/useIntersectionObserver";

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
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardData | null>(null);
  const { accessToken } = useAuth();
  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const dashboardId: string | string[] | undefined = router.query.dashboardid;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["sideBarDashboardList"],
    queryFn: ({ pageParam }) => getDashBoards("infiniteScroll", accessToken, 40, undefined, pageParam),
    initialPageParam: 10,
    getNextPageParam: lastPage => lastPage.cursorId,
  });

  console.log(data);

  const dashboardDatas = data?.pages[0].dashboards || [];
  const fetchNextCardList = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useIntersectionObserver(bottomObserver, fetchNextCardList, { threshold: 0 });

  useEffect(() => {
    const dashboardId: string | string[] | undefined = router.query.dashboardid;
    if (dashboardId) {
      const selectedDashboard = dashboardDatas.find((data: DashboardData) => data.id === Number(dashboardId));
      setSelectedDashboard(selectedDashboard);
    }
  }, [router.query.dashboardid, dashboardDatas]);

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
      <div className={cx("column-pages-end")} ref={bottomObserver}></div>
    </div>
  );
}
