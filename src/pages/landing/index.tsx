import classNames from "classnames/bind";
import React from "react";
import styles from "@/pages/landing/index.module.scss";
import Navbar from "@/components/domains/landing/Navbar";
import Container from "@/components/domains/landing/Container";
import Header from "@/components/domains/landing/Header";
import Main from "@/components/domains/landing/Main";
import Footer from "@/components/domains/landing/Footer";
import withAuthExist from "@/utils/withAuthExist";

const cx = classNames.bind(styles);

export default withAuthExist(function index() {
  return (
    <div className={cx("container")}>
      <Navbar />
      <Container>
        <Header />
        <Main />
      </Container>
      <Footer />
    </div>
  );
});
