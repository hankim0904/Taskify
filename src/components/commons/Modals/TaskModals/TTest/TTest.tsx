import React from "react";
import styles from "./TTest.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function TTest() {
  const router = useRouter();
  const [isModalOn, setIsModalOn] = useState(true);
  const [selectMember, setSelectMember] = useState(0);
  const { dashboardid } = router.query;

  const { data }: { data: any } = useQuery({
    queryKey: ["memberList", dashboardid],
  });

  const members = data.members;

  console.log("this :", data.members);

  return (
    <div className={cx("container")}>
      <label className={cx("text")}>
        담당자 <span>*</span>
      </label>

      <div className={cx("select")} onClick={() => setIsModalOn(!isModalOn)}>
        <img src={members[selectMember].profileImageUrl} /> <span>{members[selectMember].nickname}</span>
        <div className={cx("list", { isModalOn })}>
          {members.map((i: any, index: number) => (
            <div
              key={i.id}
              className={cx("item", { "background-red": index === selectMember })}
              onClick={() => {
                setIsModalOn(!isModalOn);
                setSelectMember(index);
              }}
            >
              <img src={i.profileImageUrl} />
              <span>{i.nickname}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
