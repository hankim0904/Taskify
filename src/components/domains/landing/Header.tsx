import Image from "next/image";
import React, { useEffect } from "react";
import HeaderImg from "./Header-assets/section.png";
import ResponseBtn from "@/components/commons/Button/ResponseButton";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import AnimText from "./AnimText";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx("container")}>
      <div className={cx("img-container")}>
        <Image src={HeaderImg} fill alt="SectionImg" />
      </div>
      <div className={cx("bottom-content-container")}>
        <div className={cx("text-container")}>
          <div className={cx("text-h2-container")}>
            <h2>새로운 일정 관리</h2>
            <h2>Taskify</h2>
            {/* Montserrat 폰트사용 개인파일사용 / 전역사용 ? */}
          </div>
          <div className={cx("text-animation-container")}>
            <AnimText delay={1} />
            <motion.div
              className={cx("typing-line")}
              animate={{ opacity: [1, 0] }}
              transition={{ ease: "linear", repeat: Infinity, duration: 1 }}
            />
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" }}>
          <Link href={"/signin"}>
            <div className={cx("button-container")}>
              <ResponseBtn state="accept" ph={1.5} fs={1.8}>
                로그인하기
              </ResponseBtn>
            </div>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
