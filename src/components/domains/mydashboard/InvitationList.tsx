import styles from "./InvitationList.module.scss";
import classNames from "classnames/bind";
import EmptyInvitation from "./ui/EmptyInvitation";
import IvitationTable from "./ui/InvitationTable";
import { useQuery } from "@tanstack/react-query";
import getReceivedDashboardInvitations from "@/api/getReceivedDashboardInvitations";
import React from "react";

const cx = classNames.bind(styles);

export default function InvitedDashboardList() {
  const { data } = useQuery({
    queryKey: ["receivedDashboardInvitationsList"],
    queryFn: () => getReceivedDashboardInvitations(),
  });

  console.log(data);

  return (
    <article className={cx("invitation")}>
      <h1 className={cx("invitation-title")}>초대받은 대시보드</h1>
      {data && data.invitations ? <IvitationTable invitations={data.invitations} /> : <EmptyInvitation />}
    </article>
  );
}
