import styles from "./edit.module.scss";
import classNames from "classnames/bind";
import DashboradEditTitleBox from "@/components/domains/edit/article/DashboradEditTitleBox";
import DashboradEditMemberBox from "@/components/domains/edit/article/DashboradEditMemberBox";
import Image from "next/image";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { DehydratedState, HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import {
  getDashBoardTittle,
  getDashBoardMembers,
  getDashboardInvitations,
} from "@/components/domains/edit/article/getEditData";

const cx = classNames.bind(styles);

interface DashBoradData {
  id: number;
  title: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  createdByMe: true;
  userId: number;
}

const getDashBoardTittleQueryKey = (dashboardId: string | string[] | undefined) => ["dashboards", dashboardId];
const getDashBoardMembersQueryKey = (dashboardId: string | string[] | undefined) => [,];
const getDashboardInvitationsQueryKey = (dashboardId: string | string[] | undefined) => [];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const dashboardId = context.query.dashboardid;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: getDashBoardTittleQueryKey(dashboardId),
      queryFn: () => getDashBoardTittle(dashboardId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["members", dashboardId],
      queryFn: () => getDashBoardMembers(dashboardId, 1),
    }),
    queryClient.prefetchQuery({
      queryKey: ["invitations", dashboardId],
      queryFn: () => getDashboardInvitations(dashboardId, 1),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Edit({ dehydratedState }: { dehydratedState: DehydratedState }) {
  //const { accessToken } = useAuth();
  const router = useRouter();
  const currentPath = router.pathname;
  const isOpenModal = false;

  function gobackButton() {
    router.back();
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath={currentPath}>
        <main className={cx("main", { openModal: isOpenModal })}>
          <button type="button" onClick={gobackButton} className={cx("backforward")}>
            <Image src="/assets/icons/ic-arrow-forward.svg" width={20} height={20} alt="뒤로가기" />
            돌아가기
          </button>
          <DashboradEditTitleBox />
          <DashboradEditMemberBox isMemberEdit={true} title="구성원"></DashboradEditMemberBox>
          <DashboradEditMemberBox isMemberEdit={false} title="초대 내역"></DashboradEditMemberBox>
          <ResponseBtn state="delete" ph={2} fs={1.8}>
            대시보드 삭제하기
          </ResponseBtn>
        </main>
      </BaseContainer>
    </HydrationBoundary>
  );
}
