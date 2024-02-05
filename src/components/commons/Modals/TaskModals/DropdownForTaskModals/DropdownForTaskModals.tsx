import { FieldValues, UseControllerProps, UseFormSetValue, useController, useForm, useWatch } from "react-hook-form";
import styles from "./DropdownForTaskModals.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";
import ProgressTag from "@/components/commons/tag/ProgressTag/ProgressTag";

const cx = classNames.bind(styles);

const members = [
  {
    id: 0,
    userId: 0,
    email: "asdf@asdf.asdf",
    nickname: "ddd",
    profileImageUrl: "/assets/icons/ic-more.svg",
  },
  {
    id: 1,
    userId: 0,
    email: "qwer@qwer.qwer",
    nickname: "qqqqq",
    profileImageUrl: "/assets/icons/ic-plus-box.svg",
  },
  {
    id: 2,
    userId: 0,
    email: "qwerqwer@qwer.qwer",
    nickname: "eeeee",
    profileImageUrl: "/a",
  },
  {
    id: 3,
    userId: 0,
    email: "d@asfsdf.sfsd",
    nickname: "aaaaa",
    profileImageUrl: "/a",
  },
  {
    id: 4,
    userId: 0,
    email: "QWERwqe@asdf.sd",
    nickname: "ccccc",
    profileImageUrl: "/a",
  },
];

const states = ["To Do", "On Progress", "Done"];

interface Props extends UseControllerProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function Dropdown({ setValue, ...props }: Props) {
  const { field } = useController(props);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [openSelectList, setOpenSelectList] = useState(false);

  const searchInput = useWatch<FieldValues, string>({
    control: props.control,
    name: props.name,
    defaultValue: "",
  });

  function handleOpenSelectList() {
    setOpenSelectList((prev) => !prev);
  }

  function handleSelectItem(id: string, name: string) {
    setSelectedItemId(id === selectedItemId ? "" : id);

    field.value === name ? setValue(props.name, "") : setValue(props.name, name);
  }

  const filteredList = members.filter((member) => member.nickname.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className={cx("dropdown-area")}>
      <label className={cx("label")}>{props.name === "assigneeUserId" ? "담당자" : "상태"}</label>
      <input
        className={cx("input")}
        list="member"
        type="text"
        placeholder={props.name === "assigneeUserId" ? "이름을 입력해 주세요" : "상태"}
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
        {props.name === "assigneeUserId"
          ? filteredList.map((member) => (
              <li className={cx("list-item")} key={member.id}>
                <button
                  id={String(member.id)}
                  type="button"
                  onClick={() => handleSelectItem(String(member.id), member.nickname)}
                  className={cx("list-item-btn")}
                >
                  {selectedItemId == String(member.id) && (
                    <Image
                      className={cx("selected")}
                      src="/assets/icons/ic-check.svg"
                      width={22}
                      height={22}
                      alt="선택"
                    />
                  )}
                  <Image
                    className={cx("member-profileImg")}
                    width={26}
                    height={26}
                    src={member.profileImageUrl}
                    alt="프로필 이미지"
                  />
                  {member.nickname}
                </button>
              </li>
            ))
          : states.map((state, index) => (
              <li className={cx("list-item")} key={state}>
                <button onClick={() => handleSelectItem(String(index), state)} className={cx("list-item-btn", "state")}>
                  {selectedItemId == String(index) && (
                    <Image
                      className={cx("selected")}
                      src="/assets/icons/ic-check.svg"
                      width={22}
                      height={22}
                      alt="선택"
                    />
                  )}
                  <ProgressTag>{state}</ProgressTag>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
