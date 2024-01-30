import { ReactNode } from "react";

import styles from "./DashboardLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface DashboardLayoutProps {
  columnList: ReactNode;
  addColumn: ReactNode;
}

export default function DashboardLayout({ columnList, addColumn }: DashboardLayoutProps) {
  return (
    <div className={cx("dashboard")}>
      {columnList}
      {addColumn}
    </div>
  );
}
