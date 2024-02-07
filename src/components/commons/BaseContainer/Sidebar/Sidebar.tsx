import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Dashboard from "../../Dashboard/Dashboard";
import NiceModal from "@ebay/nice-modal-react";
import DashboardCreationModal from "../../Modals/DashboardCreationModal/DashboardCreationModal";

const cx = classNames.bind(styles);

interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: true;
  userId: number;
}

interface SidebarPorps {
  handleChangeDashBoardTitle: (selectedDashboard: DashboardData) => void;
  dashboardDatas: any;
  selectedDashboardId: any;
  setSelectedDashboard: any;
}

export default function Sidebar({
  handleChangeDashBoardTitle,
  dashboardDatas,
  selectedDashboardId,
  setSelectedDashboard,
}: SidebarPorps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const selectedDashboard = dashboardDatas.find((data: DashboardData) => data.id === Number(selectedDashboardId));

    if (selectedDashboard) {
      setSelectedIdx(selectedDashboard.id);
    }
  }, [selectedDashboardId, dashboardDatas]);

  function handleSelectDashBoard(dashboardId: number) {
    const selectedDashboard = dashboardDatas.find((data: DashboardData) => data.id === dashboardId);

    if (selectedDashboard) {
      setSelectedIdx(selectedDashboard.id);
      handleChangeDashBoardTitle(selectedDashboard);
      setSelectedDashboard(selectedDashboard);
      router.push(`/dashboard/${dashboardId}`);
    }
  }

  function showModal() {
    NiceModal.show(DashboardCreationModal);
  }

  return (
    <div className={cx("sidebar")}>
      <div className={cx("logo")}>
        <div className={cx("logo-symbol")}>
          <Link href="/">
            <Image fill src="/assets/images/logo-symbol.png" alt="로고 심볼" />
          </Link>
        </div>

        <div className={cx("logo-typo")}>
          <Link href="/">
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

        <div className={cx("contents")}>
          {dashboardDatas.map((data: DashboardData) => (
            <div
              key={data.id}
              className={cx("board-list", { selected: data.id === selectedIdx })}
              onClick={() => {
                handleSelectDashBoard(data.id);
              }}
            >
              <Dashboard color={data.color} isHost={data.createdByMe} isSidebar={true}>
                {data.title}
              </Dashboard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
