import React from "react";
import styles from "./TaskModalDropDown.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import extractInitial from "@/utils/extractInitial";
import Image from "next/image";
import ProgressTag from "@/components/commons/tag/ProgressTag/ProgressTag";
import { Column, ColumnListData } from "@/components/domains/dashboardid/api/type";

const cx = classNames.bind(styles);

interface Member {
  email: string;
  id: number;
  isOwner: boolean;
  nickname?: string;
  profileImageUrl: string;
  userId: number;
}

interface Props {
  setSelectMemberId?: (id: number) => void;
  selectMemberId?: number;
  members?: Member[];
  columnId?: number;
  columnList?: Column[];
  setSelectColumnId?: (id: number) => void;
  selectColumnId?: number;
}

export default function TaskModalDropDown({
  members,
  columnList,
  setSelectMemberId,
  selectMemberId,
  setSelectColumnId,
  selectColumnId,
}: Props) {
  const [isModalOn, setIsModalOn] = useState(true);

  const selectedColumn = columnList?.find((column: Column) => selectColumnId === column.id);

  const selectedMember = members?.find((member: Member) => selectMemberId === member.userId);

  if (!columnList) {
    return (
      <div className={cx("container")}>
        <label className={cx("text")}>
          담당자 <span>*</span>
        </label>

        <div className={cx("select")} onClick={() => setIsModalOn(!isModalOn)}>
          {selectedMember?.profileImageUrl ? (
            <Image width={26} height={26} alt="프로필 이미지" src={selectedMember.profileImageUrl} />
          ) : (
            <div className={cx("profileImg-none")}>{extractInitial(selectedMember?.nickname)}</div>
          )}
          <span>{selectedMember?.nickname}</span>
          <div className={cx("list", { isModalOn })}>
            {members?.map((member: Member) => (
              <div
                key={member.id}
                className={cx("item", { "background-red": member.userId === selectMemberId })}
                onClick={() => {
                  setIsModalOn(!isModalOn);
                  setSelectMemberId && setSelectMemberId(member.userId);
                }}
              >
                {member.profileImageUrl ? (
                  <Image width={26} height={26} alt="프로필 이미지" src={member.profileImageUrl} />
                ) : (
                  <div className={cx("profileImg-none")}>{extractInitial(member.nickname)}</div>
                )}
                <span>{member.nickname}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={cx("container")}>
        <label className={cx("text")}>상태</label>

        <div className={cx("select")} onClick={() => setIsModalOn(!isModalOn)}>
          {selectedColumn && <ProgressTag>{selectedColumn.title}</ProgressTag>}
          <div className={cx("list", { isModalOn })}>
            {columnList?.map((column: Column) => (
              <ul
                key={column.id}
                className={cx("item", { "background-red": column.id === selectColumnId })}
                onClick={() => {
                  setIsModalOn(!isModalOn);
                  setSelectColumnId && setSelectColumnId(column.id);
                }}
              >
                <ProgressTag>{column.title}</ProgressTag>
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
