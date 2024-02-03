import Logo from "@/components/commons/Logo/Logo";
import Signin from "@/components/domains/signin/Signin";
import withAuthExist from "@/utils/withAuthExist";

import classNames from "classnames/bind";
import styles from "./signin.module.scss";

const cx = classNames.bind(styles);

function SigninPage() {
  return (
    <div className={cx("container")}>
      <Logo message="오늘도 만나서 반가워요!" />
      <Signin />
    </div>
  );
}

export default withAuthExist(SigninPage);
