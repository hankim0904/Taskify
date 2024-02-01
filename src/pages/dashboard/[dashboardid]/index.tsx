import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { dehydrate, HydrationBoundary, QueryClient, useQuery, DehydratedState } from "@tanstack/react-query";
import { getColumnList, getCardList } from "../../../components/domains/dashboardid/queries";

import DashboardLayout from "@/components/domains/dashboardid/DashboardLayout";
import ColumnList from "@/components/domains/dashboardid/ColumnList";
import AddColumn from "@/components/domains/dashboardid/AddColumn";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const dashboardId = context.query.dashboardid;

  await queryClient.prefetchQuery({
    queryKey: ["columnList"],
    queryFn: () => getColumnList(dashboardId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function DashboardPage({ dehydratedState }: { dehydratedState: DehydratedState }) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath={currentPath}>
        <DashboardLayout columnList={<ColumnList />} addColumn={<AddColumn />} />
      </BaseContainer>
    </HydrationBoundary>
  );
}
