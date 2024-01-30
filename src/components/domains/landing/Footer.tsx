import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { facebookIcon, instagramIcon, msgIcon } from "./Footer-assets/index";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx("container")}>
      <p>©codeit - 2023</p>
      <div className={cx("info-section")}>
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className={cx("icon-container")}>
        <div className={cx("icon-item")}>
          <Link href={"mailto: example@codeit.kr"}>
            <Image src={msgIcon} fill alt="message-icon" />
          </Link>
        </div>
        <div className={cx("icon-item")}>
          <Link href={"http://www.facebook.com"}>
            <Image src={facebookIcon} fill alt="facebook-icon" />
          </Link>
        </div>
        <div className={cx("icon-item")}>
          <Link href={"http://www.instagram.com"}>
            <Image src={instagramIcon} fill alt="instagram-icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
