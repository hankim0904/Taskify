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
import * as A from "@/api/getEditData";
import { deleteDashBoard } from "@/api/deleteDashBoradData";
import { useParams } from "next/navigation";
import { putDashBoard } from "@/api/putDashBoard";
import getDashBoards from "@/api/getDashBoards";
import { easeInOut, motion } from "framer-motion";

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
      queryKey: A.getDashBoardTittleQueryKey(dashboardId),
      queryFn: () => A.getDashBoardTittle(dashboardId, accessToken),
      staleTime: 5 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: A.getDashBoardMembersQueryKey(dashboardId, page),
      queryFn: () => A.getDashBoardMembers(dashboardId, page, accessToken),
      staleTime: 5 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: A.getDashboardInvitationsQueryKey(dashboardId, page),
      queryFn: () => A.getDashboardInvitations(dashboardId, page, accessToken),
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
  const { dashboardid } = useParams();

  const { data: titleData } = useQuery({
    queryKey: A.getDashBoardTittleQueryKey(dashboardid),
    queryFn: () => A.getDashBoardTittle(dashboardid),
  });

  function gobackButton() {
    router.back();
  }

  const deleteDashboradMutation = useMutation({
    mutationFn: () => deleteDashBoard(dashboardid),
    onSuccess: () => {
      alert("대시보드 삭제 성공"), router.push("/mydashboard");
    },
  });

  const handelDeleteDashBorad = () => {
    if (!titleData.createdByMe) {
      alert("사용자가 만든 대시보드가 아닙니다.");
    } else {
      const result = confirm("대시보드를 정말 삭제하시겠습니까?");
      result ? deleteDashboradMutation.mutate() : alert("대시보드 삭제 취소");
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath={currentPath}>
        <main className={cx("main", { openModal: isOpenModal })}>
          <motion.button
            type="button"
            onClick={gobackButton}
            className={cx("backforward")}
            animate={{ x: [4, 0, 4] }}
            transition={{
              duration: 1.5,
              ease: easeInOut,
              repeat: Infinity,
            }}
          >
            <Image src="/assets/icons/ic-arrow-forward.svg" width={20} height={20} alt="뒤로가기" />
            돌아가기
          </motion.button>
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
