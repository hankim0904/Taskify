import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Dashboard from "../../Dashboard/Dashboard";
import NiceModal from "@ebay/nice-modal-react";
import DashboardCreationModal from "../../Modals/DashboardCreationModal/DashboardCreationModal";
import LodingSpinner from "../../LodingSpinner/LodingSpinner";

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

interface SidebarPorps {
  dashboardDatas: DashboardData[];
  bottomObserver: any;
  isFetchingNextPage: any;
}

export default function Sidebar({ dashboardDatas, bottomObserver, isFetchingNextPage }: SidebarPorps) {
  const router = useRouter();
  const dashboardId = router.query.dashboardid;

  function showModal() {
    NiceModal.show(DashboardCreationModal);
  }

  return (
    <div className={cx("sidebar")}>
      <div className={cx("logo")}>
        <div className={cx("logo-symbol")}>
          <Link href="/mydashboard">
            <Image fill src="/assets/images/logo-symbol.png" alt="로고 심볼" />
          </Link>
        </div>

        <div className={cx("logo-typo")}>
          <Link href="/mydashboard">
            <Image fill src="/assets/images/logo-typo.png" alt="로고 타이포" />
          </Link>
        </div>
      </div>

      <div className={cx("dash-boards")}>
        <div className={cx("header")}>
          <span
            className={cx("title")}
            onClick={() => {
              router.push("/mydashboard");
            }}
          >
            Dash Boards
          </span>
          <button className={cx("create-btn")} onClick={showModal}>
            <Image fill src="/assets/icons/ic-plus-box.svg" alt="대시보드 생성" />
          </button>
        </div>

        <div className={cx("sidebar")}>
          <div className={cx("contents")}>
            {dashboardDatas.map((data: DashboardData) => (
              <div
                key={data.id}
                className={cx("board-list", { selected: data.id === Number(dashboardId) })}
                onClick={() => {
                  router.push(`/dashboard/${data.id}`);
                }}
              >
                <Dashboard color={data.color} isHost={data.createdByMe} isSidebar={true}>
                  {data.title}
                </Dashboard>
              </div>
            ))}
            <div ref={bottomObserver} style={{ height: "1px" }}></div>
          </div>
        </div>
        {isFetchingNextPage && <div className={cx("loading")}>{<LodingSpinner />}</div>}
      </div>
    </div>
  );
}
