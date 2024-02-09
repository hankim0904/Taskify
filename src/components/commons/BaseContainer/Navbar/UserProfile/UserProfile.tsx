import styles from "./UserProfile.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import UserDropdownMenu from "./UserDropdownMenu";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

interface UserProfileProps {
  userMeData: any;
  extractFirstLetter: (nickname: string) => string | undefined;
}

export default function UserProfile({ userMeData, extractFirstLetter }: UserProfileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);

  function handleDropDownMenu() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropdownOpen && dropMenuRef.current && !dropMenuRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropdownOpen]);

  return (
    <div className={cx("navbar-user")} ref={dropMenuRef} onClick={handleDropDownMenu}>
      {userMeData?.profileImageUrl ? (
        <>
          <div className={cx("navbar-user-circle")} style={{ backgroundColor: "transparent" }}>
            <Image fill src={userMeData?.profileImageUrl} className={cx("profile-img")} alt="내 이미지" />
          </div>
          <div className={cx("navbar-user-name")}>{userMeData?.nickname}</div>
        </>
      ) : (
        <>
          <div className={cx("navbar-user-circle")}>
            <span className={cx("navbar-user-circle-nickname")}>{extractFirstLetter(userMeData?.nickname)}</span>
          </div>
          <div className={cx("navbar-user-name")}>{userMeData?.nickname}</div>
        </>
      )}

      {isDropdownOpen && <UserDropdownMenu />}
    </div>
  );
}
