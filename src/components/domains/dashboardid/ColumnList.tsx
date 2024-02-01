import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getColumnList } from "@/components/domains/dashboardid/queries";

import styles from "./ColumnList.module.scss";
import classNames from "classnames/bind";

import Column from "./ui/Column";

const cx = classNames.bind(styles);

export default function ColumnList() {
  const router = useRouter();
  const dashboardId = router.query.dashboardid;
  const {
    data: columnListData,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["columnList", dashboardId], queryFn: () => getColumnList(dashboardId) });

  const columnList = columnListData?.data ?? [];

  return (
    <article className={cx("column-list")}>
      {columnList.map(({ id, title }: { id: number; title: string }) => (
        <Column key={id} columnId={id} columnTitle={title} />
      ))}
    </article>
  );
}
