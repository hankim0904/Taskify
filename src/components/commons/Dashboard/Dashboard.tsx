import { ReactNode } from "react";

import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

export interface DashboardProp {
  color: string;
  isHost?: boolean;
  isSidebar?: boolean;
  children: ReactNode;
}

export default function Dashboard({ color, isHost = false, isSidebar = false, children }: DashboardProp) {
  return (
    <div className={cx("dashboard")}>
      <span className={cx("dashboard-dot")} style={{ backgroundColor: color }}></span>
      <span className={cx("dashboard-title", { sidebar: isSidebar })}>{children}</span>
      <span className={cx("dashboard-icon", { sidebar: isSidebar })}>
        {isHost && <Image fill src="/assets/icons/ic-crown.svg" alt="왕관 모양 아이콘" />}
      </span>
    </div>
  );
}
