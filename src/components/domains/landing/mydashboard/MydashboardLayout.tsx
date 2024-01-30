import { ReactNode } from "react";

import styles from "./MydashboardLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface MydashboardLayoutProps {
  dashboardList: ReactNode;
  invitedDashboardList: ReactNode;
}

export default function MydashboardLayout({ dashboardList, invitedDashboardList }: MydashboardLayoutProps) {
  return (
    <div className={cx("mydashboard-container")}>
      <div className={cx("mydashboard")}>
        {dashboardList}
        {invitedDashboardList}
      </div>
    </div>
  );
}
