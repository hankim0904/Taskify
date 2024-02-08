import MydashboardLayout from "@/components/domains/mydashboard/MydashboardLayout";
import DashboardList from "@/components/domains/mydashboard/DashboardList";
import InvitedDashboardList from "@/components/domains/mydashboard/InvitationList";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getDashBoards from "@/api/getDashBoards";
import getReceivedDashboardInvitations from "@/api/getReceivedDashboardInvitations";
import withAuthNoneExist from "@/utils/withAuthNoneExist";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const accessToken = context.req.cookies.accessToken || "";

  await queryClient.prefetchQuery({
    queryKey: ["dashboardList", 1],
    queryFn: () => getDashBoards("pagination", accessToken, 5, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ["sideBarDashboardList", 1, 18],
    queryFn: () => getDashBoards("pagination", accessToken, 18, 1),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["getReceivedDashboardInvitations"],
    queryFn: () => getReceivedDashboardInvitations(null, accessToken),
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage.cursorId,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      accessToken,
    },
  };
}

export default withAuthNoneExist(function MydashboardPage({ dehydratedState, accessToken }: any) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <Head>
        <title>mydashboard</title>
      </Head>
      <HydrationBoundary state={dehydratedState}>
        <BaseContainer currentPath={currentPath}>
          <MydashboardLayout
            dashboardList={<DashboardList accessToken={accessToken} />}
            invitedDashboardList={<InvitedDashboardList accessToken={accessToken} />}
          />
        </BaseContainer>
      </HydrationBoundary>
    </>
  );
});
