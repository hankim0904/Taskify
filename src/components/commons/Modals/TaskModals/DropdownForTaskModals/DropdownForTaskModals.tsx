import { FieldValues, UseControllerProps, UseFormSetValue, useController, useForm, useWatch } from "react-hook-form";
import styles from "./DropdownForTaskModals.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";
import ProgressTag from "@/components/commons/tag/ProgressTag/ProgressTag";
import { useQuery } from "@tanstack/react-query";
import { getColumnListQueryKey } from "@/components/domains/dashboardid/api/queryKeys";
import { useRouter } from "next/router";
import getMembers from "@/api/getMembers";
import { useAuth } from "@/contexts/AuthContext";
import extractInitial from "@/utils/extractInitial";

const cx = classNames.bind(styles);

interface Props extends UseControllerProps {
  setValue: UseFormSetValue<FieldValues>;
  columnId?: number;
  members?: Member[];
}

interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string;
  userId: number;
}

interface State {
  id: number;
  title: string;
}

export default function Dropdown({ setValue, columnId, members, ...props }: Props) {
  const { field } = useController(props);
  const [selectedItemId, setSelectedItemId] = useState(0.1);
  const [openSelectList, setOpenSelectList] = useState(false);
  const router = useRouter();
  const { dashboardid } = router.query;
  // const states = columnListData?.

  const { data: columnListData } = useQuery({
    queryKey: getColumnListQueryKey(dashboardid),
  });

  const states = columnListData?.data;

  function handleSelectItem(id: number, name: string) {
    setSelectedItemId(id === selectedItemId ? 0.1 : id);

    field.value === name ? setValue(props.name, "") : setValue(props.name, name);
  }

  const searchInput = useWatch<FieldValues, string>({
    control: props.control,
    name: props.name,
    defaultValue: "",
  });

  const filteredList = members?.filter((member: Member) =>
    member.nickname.toLowerCase().includes(searchInput.toLowerCase())
  );

  function handleOpenSelectList() {
    setOpenSelectList((prev) => !prev);
  }

  return (
    <div className={cx("dropdown-area")}>
      <label className={cx("label")}>{props.name === "assignee" ? "담당자" : "상태"}</label>
      <input
        className={cx("input")}
        list="member"
        type="text"
        placeholder={props.name === "assignee" ? "이름을 입력해 주세요" : "상태"}
        {...field}
      />
      <Image
        onClick={handleOpenSelectList}
        className={cx("dropdown-btn")}
        width={26}
        height={26}
        alt="목록 열기"
        src="/assets/icons/ic-arrow-drop-down.svg"
      />
      <ul className={cx("members", { close: !openSelectList })}>
        {props.name === "assignee"
          ? filteredList?.map((member: Member) => (
              <li className={cx("list-item")} key={member.id}>
                <button
                  id={String(member.userId)}
                  type="button"
                  onClick={() => handleSelectItem(member.id, member.nickname)}
                  className={cx("list-item-btn")}
                >
                  {selectedItemId == member.id && (
                    <Image
                      className={cx("selected")}
                      src="/assets/icons/ic-check.svg"
                      width={22}
                      height={22}
                      alt="선택"
                    />
                  )}
                  {member.profileImageUrl ? (
                    <Image
                      className={cx("member-profileImg")}
                      width={26}
                      height={26}
                      src={member.profileImageUrl}
                      alt="프로필 이미지"
                    />
                  ) : (
                    <div className={cx("member-profileImg-none")}>{extractInitial(member.nickname)}</div>
                  )}
                  {member.nickname}
                </button>
              </li>
            ))
          : states.map((state: State) => (
              <li className={cx("list-item")} key={state.id}>
                <button
                  onClick={() => handleSelectItem(state.id, state.title)}
                  className={cx("list-item-btn", "state")}
                >
                  {selectedItemId == state.id && (
                    <Image
                      className={cx("selected")}
                      src="/assets/icons/ic-check.svg"
                      width={22}
                      height={22}
                      alt="선택"
                    />
                  )}
                  <ProgressTag>{state.title}</ProgressTag>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
