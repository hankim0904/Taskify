import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, ReactNode } from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Dashboard from "../../Dashboard/Dashboard";
import dashboardListMockData from "../mock/DashboardListMockData";

const cx = classNames.bind(styles);

//mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
const dashboardListData = dashboardListMockData.dashboards;

interface SidebarPorps {
  handleChangeDashBoardTitle: (title: string, createdByMe: boolean) => void;
}

export default function Sidebar({ handleChangeDashBoardTitle }: SidebarPorps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const router = useRouter();

  function handleSelectDashBoard(index: number, dashboardId: number) {
    if (index !== selectedIdx) {
      setSelectedIdx(index);
    }
    router.push(`/dashboard/${dashboardId}`);
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
          <span className={cx("title")}>Dash Boards</span>
          <button className={cx("create-btn")}>
            <Image fill src="/assets/icons/ic-plus-box.svg" alt="대시보드 생성" />
          </button>
        </div>

        <div className={cx("contents")}>
          {dashboardListData.map((data, index) => (
            <div
              key={data.id}
              className={cx("board-list", { selected: index === selectedIdx })}
              onClick={() => {
                handleSelectDashBoard(index, data.id);
                handleChangeDashBoardTitle(data.title, data.createdByMe);
              }}>
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
