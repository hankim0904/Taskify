import Input from "@/components/commons/Input/Input";
import styles from "./DashboradEditTitleBox.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import ResponseBtn from "@/components/commons/Button/ResponseButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ColorList from "@/components/commons/colorList/ColorList";

const cx = classNames.bind(styles);

interface porps {
  children: ReactNode;
}

export default function DashboradEditTitleBox({ children }: porps) {
  const { control, handleSubmit } = useForm();
  const [color, setColor] = useState("");

  function handleOnsubmit(data: FieldValues): void {
    console.log(data);
  }

  return (
    <section className={cx("dashborad-edit-box")}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{children}</h2>
        <ColorList setColor={setColor} />
      </article>
      <form className={cx("edit-form")} onSubmit={handleSubmit(handleOnsubmit)}>
        <Input
          name="dashboardName"
          placeholder={String(children)}
          labelName="대시보드 이름"
          type="text"
          control={control}
        />
        <ResponseBtn state="accept">변경</ResponseBtn>
      </form>
    </section>
  );
}

//function Edit
