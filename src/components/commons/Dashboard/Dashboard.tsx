import { ReactNode } from "react";

import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

export interface DashboardProp {
  color: string;
  createdByMe?: boolean;
  isSidebar?: boolean;
  children: ReactNode;
}

export default function Dashboard({ color, createdByMe = false, isSidebar = false, children }: DashboardProp) {
  return (
    <div className={cx("dashboard")}>
      <span className={cx("dashboard-dot")} style={{ "--color": color }}></span>
      <span className={cx("dashboard-title", { sidebar: isSidebar })}>{children}</span>
      <span className={cx("dashboard-icon", { sidebar: isSidebar })}>
        {createdByMe && <Image fill src="/assets/icons/ic-crown.svg" alt="왕관 모양 아이콘" />}
      </span>
    </div>
  );
}
