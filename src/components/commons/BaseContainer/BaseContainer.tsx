import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./BaseContainer.module.scss";
import classNames from "classnames/bind";
import { ReactNode } from "react";

const cx = classNames.bind(styles);

interface BaseContainerProps {
  currentPath: string;
  children: ReactNode;
}
export default function BaseContainer({ currentPath, children }: BaseContainerProps) {
  return (
    <div className={cx("container")}>
      <Sidebar />
      <div className={cx("contents")}>
        <Navbar currentPath={currentPath} />
        {children}
      </div>
    </div>
  );
}
