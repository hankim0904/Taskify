import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Dashboard from "../../Dashboard/Dashboard";
import dashboardListData from "./dashboardListData";

const cx = classNames.bind(styles);
const dashboardData = dashboardListData.dashboards;

export default function Sidebar() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  function handleSelectBoard(index: number) {
    if (index !== selectedIdx) {
      setSelectedIdx(index);
    }
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
          {dashboardData.map((data, index) => (
            <div
              className={cx("board-list", { selected: index === selectedIdx })}
              onClick={() => handleSelectBoard(index)}
            >
              <Dashboard color={data.color} isHost={true} isSidebar={true}>
                {data.title}
              </Dashboard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
