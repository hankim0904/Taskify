import React from "react";
import styles from "./NotFound.module.scss";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.errorCodeFont}>404</div>
        <div className={styles.gap}>
          <div className={styles.errorFont}>존재하지 않는 페이지입니다.</div>
          <div className={styles.btnContainer}>
            <Link href="/">
              <ResponseBtn state="accept" fs={2} ph={1}>
                돌아가기
              </ResponseBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
