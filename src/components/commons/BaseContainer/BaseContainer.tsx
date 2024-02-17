import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useRef, useState } from "react";
import getDashBoards from "@/api/getDashBoards";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/components/domains/dashboardid/utils/useIntersectionObserver";

const cx = classNames.bind(styles);

interface BaseContainerProps {
  currentPath: string;
  accessToken?: string;
  children: ReactNode;
}

export default function BaseContainer({ currentPath, accessToken, children }: BaseContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["sideBarDashboardList"],
    queryFn: ({ pageParam = 1 }) => getDashBoards("pagination", accessToken, 18, pageParam),
    initialPageParam: 1,
    getNextPageParam: () => {
      return currentPage + 1;
    },
    staleTime: 60000,
  });

  const dashboardTotalCount = data?.pages[0].totalCount;
  const allDashboardDatas = data?.pages.flatMap(page => page.dashboards) ?? [];

  const fetchNextDashboard = () => {
    if (dashboardTotalCount === allDashboardDatas.length) return;

    if (!isFetchingNextPage && hasNextPage) {
      setCurrentPage(currentPage + 1);
      fetchNextPage();
    }
  };

  useIntersectionObserver(bottomObserver, fetchNextDashboard, { threshold: 0 });

  return (
    <div className={cx("grid")}>
      <div className={cx("grid-sidebar")}>
        <Sidebar
          dashboardDatas={allDashboardDatas}
          bottomObserver={bottomObserver}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
      <div className={cx("grid-navbar")}>
        <Navbar
          currentPath={currentPath}
          dashboardTotalCount={dashboardTotalCount}
          dashboardDatas={allDashboardDatas}
        />
      </div>
      <div className={cx("grid-content")}>{children}</div>
    </div>
  );
}
