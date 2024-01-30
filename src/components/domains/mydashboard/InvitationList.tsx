import styles from "./InvitationList.module.scss";
import classNames from "classnames/bind";

import EmptyInvitation from "./ui/EmptyInvitation";
import IvitationTable from "./ui/InvitationTable";

import { invitationListData } from "./mock/invitation-list";

const cx = classNames.bind(styles);

export default function InvitedDashboardList() {
  //mock 데이터를 사용했으니 실제 데이터로 변경해 주세요.
  const invitations = invitationListData.invitations;
  const isExistDashboard = invitations.length === 0 ? false : true;

  return (
    <article className={cx("invitation")}>
      <h1 className={cx("invitation-title")}>초대받은 대시보드</h1>
      {isExistDashboard ? <IvitationTable invitations={invitations} /> : <EmptyInvitation />}
    </article>
  );
}
