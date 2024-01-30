import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import styles from "@/components/domains/landing/Navbar.module.scss";
import icon from "./Navbar-assets/logo-icon.svg";
import logoText from "./Navbar-assets/logo-text.svg";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Navbar() {
  return (
    <nav className={cx("container")}>
      <div>
        <Link href={"/"} className={cx("logo-container")}>
          <div className={cx("logo-img")}>
            <Image src={icon} fill alt="logo" />
          </div>
          <div className={cx("logo-text")}>
            <Image src={logoText} fill alt="logo" />
          </div>
        </Link>
      </div>
      <div className={cx("right-content")}>
        <Link href={"/signin"}>로그인</Link>
        <Link href={"/signup"}>회원가입</Link>
      </div>
    </nav>
  );
}
