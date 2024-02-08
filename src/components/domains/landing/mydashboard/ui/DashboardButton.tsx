import { useRouter } from "next/router";

import styles from "./DashboardButton.module.scss";
import classNames from "classnames/bind";

import Dashboard, { DashboardProp } from "@/components/commons/Dashboard/Dashboard";
import Image from "next/image";

const cx = classNames.bind(styles);

interface DashboardButton extends DashboardProp {
  id: number;
}

export default function DashboardButton({ id, ...prop }: DashboardButton) {
  const router = useRouter();

  function handleDashboardBtnClick() {
    router.push(`/dashboard/${id}`);
  }

  return (
    <button className={cx("dashboard-btn")} type="button" onClick={handleDashboardBtnClick}>
      <Dashboard {...prop} />
      <Image src="/assets/icons/ic-arrow-forward.svg" alt="왼쪽 화살표 아이콘" width={18} height={18} />
    </button>
  );
}
