import { useState } from "react";

import styles from "./DashboardList.module.scss";
import classNames from "classnames/bind";

import { MixButton } from "@/components/commons/Button/MixButton";
import DashboardButton from "./ui/DashboardButton";
import PageChangeButton from "../../commons/Button/PageChangeButton";

import { dashboardListData } from "./mock/dashboard-list";

const cx = classNames.bind(styles);

export default function DashboardList() {
  const [currentpage, setCurrentPage] = useState(1);
  //mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
  const dashboards = dashboardListData.dashboards;
  const isExistDashboard = dashboards.length === 0 ? false : true;
  const totalPageCount = Math.ceil(dashboardListData.totalCount / 6);

  function handleBackwardPageClick() {
    //이전 페이지의 dashboard를 보여줄 수 있게 서버에 요청을 보내주세요
    // setCurrentPage를 이용해서 '~페이지 중 ~' 부분의 숫자를 하나 줄여주세요.
  }

  function handleForwardPageClick() {
    //이후 페이지의 dashboard를 보여줄 수 있게 서버에 요청을 보내주세요
    // setCurrentPage를 이용해서 '~페이지 중 ~' 부분의 숫자를 하나 줄여주세요.
  }

  return (
    <article>
      <div className={cx("dashboard-btn-collection")}>
        <div className={cx("dashboard-btn-container")}>
          <MixButton>새로운 대시보드</MixButton>
        </div>
        {dashboards.map(({ id, title, color, createdByMe }) => (
          <div className={cx("dashboard-btn-container")} key={id}>
            <DashboardButton id={id} color={color} isHost={createdByMe}>
              {title}
            </DashboardButton>
          </div>
        ))}
      </div>
      {isExistDashboard && (
        <div className={cx("page-change")}>
          <span className={cx("page-change-text")}>{`${totalPageCount} 페이지 중${currentpage}`}</span>
          <span className={cx("page-change-btn")}>
            <PageChangeButton isForward={false} onClick={handleBackwardPageClick} />
            <PageChangeButton onClick={handleForwardPageClick} />
          </span>
        </div>
      )}
    </article>
  );
}
