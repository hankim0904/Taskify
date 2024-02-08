import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { dehydrate, HydrationBoundary, QueryClient, DehydratedState } from "@tanstack/react-query";
import { getColumnList } from "@/components/domains/dashboardid/api/queries";
import { getColumnListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";

import styles from "./dashboard.module.scss";
import classNames from "classnames/bind";

import DashboardLayout from "@/components/domains/dashboardid/DashboardLayout";
import ColumnList from "@/components/domains/dashboardid/ColumnList";
import AddColumn from "@/components/domains/dashboardid/AddColumn";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import withAuthNoneExist from "@/utils/withAuthNoneExist";
import getDashBoards from "@/api/getDashBoards";

const cx = classNames.bind(styles);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const dashboardId = context.query.dashboardid;
  const { accessToken } = context.req.cookies;

  await queryClient.prefetchQuery({
    queryKey: getColumnListQueryKey(dashboardId),
    queryFn: () => getColumnList(dashboardId, accessToken),
  });

  await queryClient.prefetchQuery({
    queryKey: ["sideBarDashboardList", 1, 18],
    queryFn: () => getDashBoards("pagination", accessToken, 18, 1),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default withAuthNoneExist(function DashboardPage({ dehydratedState }: { dehydratedState: DehydratedState }) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={cx("container")}>
        <Head>
          <title>대시보드</title>
        </Head>
        <BaseContainer currentPath={currentPath}>
          <DashboardLayout columnList={<ColumnList />} addColumn={<AddColumn />} />
        </BaseContainer>
      </div>
    </HydrationBoundary>
  );
});
