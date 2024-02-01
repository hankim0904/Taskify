import MydashboardLayout from "@/components/domains/mydashboard/MydashboardLayout";
import DashboardList from "@/components/domains/mydashboard/DashboardList";
import InvitedDashboardList from "@/components/domains/mydashboard/InvitationList";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getDashBoards from "@/api/getDashBoards";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["headers"],
    queryFn: () => getDashBoards(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function MydashboardPage({ dehydratedState }: any) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath="test">
        <MydashboardLayout dashboardList={<DashboardList />} invitedDashboardList={<InvitedDashboardList />} />
      </BaseContainer>
    </HydrationBoundary>
  );
}
