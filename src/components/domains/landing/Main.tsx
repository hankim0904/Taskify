import React, { useRef } from "react";
import styles from "./Main.module.scss";
import classNames from "classnames/bind";
import { landing1, landing2, landing3, landing4, landing5 } from "./Main-assets/index";
import Image from "next/image";
import { motion, spring } from "framer-motion";

const cx = classNames.bind(styles);

export default function Main() {
  return (
    <div className={cx("container")}>
      {/* section1 */}
      <section className={cx("large-box")}>
        <motion.div className={cx("landing1-text-container")}>
          <p>Point 1</p>
          <h2>
            일의 우선순위를 <br />
            관리하세요
          </h2>
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          viewport={{ once: true }}
        >
          <div className={cx("landing1-img-container")}>
            <Image src={landing1} fill alt="dashboardImg" />
          </div>
        </motion.div>
      </section>

      {/* section2 */}
      <section className={cx("large-box")}>
        <div className={cx("landing2-container")}>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className={cx("landing2-img-container")}>
              <Image src={landing2} fill alt="addToDoImg" />
            </div>
          </motion.div>
          <motion.div className={cx("landing2-text-container")}>
            <p>Point 2</p>
            <h2>
              해야 할 일을 <br />
              등록하세요
            </h2>
          </motion.div>
        </div>
      </section>

      {/* section3 */}
      <section className={cx("landing3-container")}>
        <h2>생산성을 높이는 다양한 설정 ⚡</h2>
        <div className={cx("small-box-container")}>
          {/* 3-1 */}
          <div className={cx("small-box")}>
            <div className={cx("small-box-img-container")}>
              <motion.div
                className={cx("small-box-img-item1")}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image src={landing3} fill alt="dashboardSettingImg" />
              </motion.div>
            </div>
            <div className={cx("small-box-text-container")}>
              <h2>대시보드 설정</h2>
              <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
            </div>
          </div>
          {/* 3-2 */}
          <div className={cx("small-box")}>
            <div className={cx("small-box-img-container")}>
              <motion.div
                className={cx("small-box-img-item2")}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image src={landing4} fill alt="inviteImg" />
              </motion.div>
            </div>
            <div className={cx("small-box-text-container")}>
              <h2>초대</h2>
              <p>새로운 팀원을 초대할 수 있어요.</p>
            </div>
          </div>
          {/* 3-3 */}
          <div className={cx("small-box")}>
            <div className={cx("small-box-img-container")}>
              <motion.div
                className={cx("small-box-img-item3")}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image src={landing5} fill alt="MemberListImg" />
              </motion.div>
            </div>
            <div className={cx("small-box-text-container")}>
              <h2>구성원</h2>
              <p>구성원을 초대하고 내보낼 수 있어요.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
