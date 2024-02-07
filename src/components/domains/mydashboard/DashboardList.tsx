import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import styles from "./DashboardList.module.scss";
import skeletonStyles from "./ui/DashboardButtonSkUi.module.scss";
import classNames from "classnames/bind";
import { MixButton } from "@/components/commons/Buttons/MixButton";
import DashboardButton from "./ui/DashboardButton";
import PageChangeButton from "../../commons/Buttons/PageChangeButton";
import DashboardCreationModal from "@/components/commons/Modals/DashboardCreationModal/DashboardCreationModal";
import getDashBoards from "@/api/getDashBoards";

const cx = classNames.bind(styles);
const skCx = classNames.bind(skeletonStyles);

interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

export default function DashboardList({ accessToken }: { accessToken: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardList", currentPage],
    queryFn: () => getDashBoards("pagination", accessToken, 5, currentPage),
  });

  const dashboardDatas = data?.dashboards;
  const totalPage = Math.ceil(data?.totalCount / 5);

  const showModal = () => {
    NiceModal.show(DashboardCreationModal);
  };

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (data && currentPage < totalPage) {
      queryClient.prefetchQuery({
        queryKey: ["dashboardList", nextPage],
        queryFn: () => getDashBoards("pagination", accessToken, 5, nextPage),
      });
    }
  }, [currentPage, data]);

  if (isLoading) {
    return (
      <article>
        <div className={cx("dashboard-btn-collection")}>
          <div className={cx("dashboard-btn-container")}>
            <MixButton onClick={showModal}>새로운 대시보드</MixButton>
          </div>
          <SkeletonDashBoardList />
        </div>
        {
          <div className={cx("page-change")}>
            <span className={cx("page-change-text")}>{`로딩중...`}</span>
            <span className={cx("page-change-btn")}>
              <PageChangeButton isForward={false} disabled={true} />
              <PageChangeButton disabled={true} />
            </span>
          </div>
        }
      </article>
    );
  }

  return (
    <article>
      <div className={cx("dashboard-btn-collection")}>
        <div className={cx("dashboard-btn-container")}>
          <MixButton onClick={showModal}>새로운 대시보드</MixButton>
        </div>
        {dashboardDatas &&
          dashboardDatas.map(({ id, title, color, createdByMe }: DashboardData, index: number) => (
            <div className={cx("dashboard-btn-container")} key={`${id}-${index}`}>
              <DashboardButton id={id} color={color} isHost={createdByMe}>
                {title}
              </DashboardButton>
            </div>
          ))}
      </div>

      <div className={cx("page-change")}>
        <span className={cx("page-change-text")}>{`${totalPage} 페이지 중 ${currentPage}`}</span>
        <span className={cx("page-change-btn")}>
          <PageChangeButton
            isForward={false}
            onClick={() => {
              setCurrentPage((currentPage) => currentPage - 1);
            }}
            disabled={currentPage <= 1}
          />
          <PageChangeButton
            onClick={() => {
              setCurrentPage((currentPage) => currentPage + 1);
            }}
            disabled={currentPage >= totalPage}
          />
        </span>
      </div>
    </article>
  );
}

function SkeletonDashBoardList() {
  const numberOfItems = 5;

  const items = Array.from({ length: numberOfItems }, (_, index) => (
    <div className={cx("dashboard-btn-container")} key={index}>
      <div className={skCx("dashboard-btn")}>
        <div className={skCx("line")} />
      </div>
    </div>
  ));

  return <>{items}</>;
}
