import Logo from "@/components/commons/Logo/Logo";
import Signup from "@/components/domains/signup/Signup";

import classNames from "classnames/bind";
import styles from "./signup.module.scss";

const cx = classNames.bind(styles);

export default function SignupPage() {
  return (
    <div className={cx("container")}>
      <Logo message="첫 방문을 환영합니다!" />
      <Signup />
    </div>
  );
}
