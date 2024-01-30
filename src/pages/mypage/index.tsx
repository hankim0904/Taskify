import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import Image from "next/image";
import Link from "next/link";
import styles from "./mypage.module.scss";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import ProfileChangeForm from "@/components/domains/mypage/ProfileChangeForm";
import PasswordChangeForm from "@/components/domains/mypage/PasswordChangeForm";

const cx = classNames.bind(styles);

export default function Mypage() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <BaseContainer currentPath={currentPath}>
      <div className={cx("mypage-container")}>
        <div className={cx("mypage-container-backward")}>
          <Image width={20} height={20} src="/assets/icons/ic-arrow-backward.svg" alt="뒤로가기" />
          <span>돌아가기</span>
        </div>
        <ProfileChangeForm />
        <PasswordChangeForm />
      </div>
    </BaseContainer>
  );
}
