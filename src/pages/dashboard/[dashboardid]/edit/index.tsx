import styles from "./edit.module.scss";
import classNames from "classnames/bind";
import DashboradEditTitleBox from "@/components/domains/edit/article/DashboradEditTitleBox";
import DashboradEditMemberBox from "@/components/domains/edit/article/DashboradEditMemberBox";
import Image from "next/image";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as F from "@/components/domains/edit/article/getEditData";
import Link from "next/link";
import NiceModal from "@ebay/nice-modal-react";
import { deleteDashBoard } from "@/components/domains/edit/article/deleteData";
import { useParams } from "next/navigation";
import getDashBoards from "@/api/getDashBoards";

const cx = classNames.bind(styles);

export interface DashBoradData {
  id: number;
  title: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  createdByMe: boolean;
  userId: number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const dashboardId = context.query.dashboardid;
  const { accessToken } = context.req.cookies;

  let page = 1;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: F.getDashBoardTittleQueryKey(dashboardId),
      queryFn: () => F.getDashBoardTittle(dashboardId, accessToken),
      staleTime: 5 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: F.getDashBoardMembersQueryKey(dashboardId, page),
      queryFn: () => F.getDashBoardMembers(dashboardId, page, accessToken),
      staleTime: 5 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: F.getDashboardInvitationsQueryKey(dashboardId, page),
      queryFn: () => F.getDashboardInvitations(dashboardId, page, accessToken),
      staleTime: 5 * 1000,
    }),
    await queryClient.prefetchQuery({
      queryKey: ["sideBarDashboardList", 1, 18],
      queryFn: () => getDashBoards("pagination", accessToken, 18, 1),
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
  const queryClient = useQueryClient();
  const { dashboardid } = useParams();

  const { data: titleData } = useQuery({
    queryKey: F.getDashBoardTittleQueryKey(dashboardid),
    queryFn: () => F.getDashBoardTittle(dashboardid),
  });

  function gobackButton() {
    router.back();
  }

  const deleteDashboradMutation = useMutation({
    mutationFn: () => deleteDashBoard(dashboardid),
    onSuccess: () => {
      alert("대시보드 삭제 성공"), router.push("/");
    },
  });

  const handelDeleteDashBorad = () => {
    if (!titleData.createdByMe) {
      alert("사용자가 만든 대시보드가 아닙니다.");
    } else {
      deleteDashboradMutation.mutate();
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath={currentPath}>
        <main className={cx("main", { openModal: isOpenModal })}>
          <button type="button" onClick={gobackButton} className={cx("backforward")}>
            <Image src="/assets/icons/ic-arrow-forward.svg" width={20} height={20} alt="뒤로가기" />
            돌아가기
          </button>
          <DashboradEditTitleBox titleData={titleData} />
          <DashboradEditMemberBox isMemberEdit={true} title="구성원"></DashboradEditMemberBox>
          <DashboradEditMemberBox isMemberEdit={false} title="초대 내역"></DashboradEditMemberBox>
          <ResponseBtn state="delete" onClick={handelDeleteDashBorad} ph={2} fs={1.8}>
            대시보드 삭제하기
          </ResponseBtn>
        </main>
      </BaseContainer>
    </HydrationBoundary>
  );
}
