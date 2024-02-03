import { useForm, useWatch } from "react-hook-form";

import styles from "./InvitationTable.module.scss";
import classNames from "classnames/bind";

import Input from "@/components/commons/Input/Input";
import Invitation from "./Invitation";

const cx = classNames.bind(styles);

export interface Invitation {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface IvitationTableProps {
  invitations: Invitation[];
}

export default function IvitationTable({ invitations }: IvitationTableProps) {
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  const searchValue = useWatch({
    name: "search",
    control,
    defaultValue: "",
  });

  const filteredData = invitations.filter((item) => {
    return item.dashboard.title.includes(searchValue) || item.inviter.nickname.includes(searchValue);
  });

  return (
    <div className={cx("invitation")}>
      <form className={cx("invitation-search")}>
        <Input
          name="search"
          type="search"
          control={control}
          placeholder="검색"
          rules={{ required: "" }}
          defaultValue={searchValue || ""}
        />
      </form>
      <div className={cx("invitation-table")}>
        <div className={cx("invitation-table-index")}>
          <span>이름</span>
          <span>초대자</span>
          <span>수락 여부</span>
        </div>
        {filteredData.map(({ id, dashboard: { title }, inviter: { nickname } }) => (
          <div className={cx("invitation-table-content")} key={id}>
            <div className={cx("invitation-table-content-word")}>
              <Invitation title={title} inviter={nickname} path={id} />
            </div>
            <hr className={cx("invitation-table-content-break")} />
          </div>
        ))}
      </div>
    </div>
  );
}
