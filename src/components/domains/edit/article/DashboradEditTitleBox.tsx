import Input from "@/components/commons/Input/Input";
import styles from "./DashboradEditTitleBox.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import ColorList from "@/components/commons/ColorList/ColorList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getDashBoardTittle } from "./getEditData";

const cx = classNames.bind(styles);

export default function DashboradEditTitleBox() {
  const { control, handleSubmit, formState } = useForm();
  const [color, setColor] = useState();
  const parms = useParams();
  const dashboardId = parms.dashboardid;

  const { data } = useQuery({ queryKey: ["dashboards", dashboardId], queryFn: () => getDashBoardTittle(dashboardId) });

  console.log(data);
  function handleOnsubmit(data: FieldValues): void {
    console.log(data);
  }

  return (
    <section className={cx("dashborad-edit-box")}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{data.title}</h2>
        <ColorList setColor={setColor} />
      </article>
      <form className={cx("edit-form")} onSubmit={handleSubmit(handleOnsubmit)}>
        <Input
          name="dashboardName"
          placeholder={data.title}
          labelName="대시보드 이름"
          type="text"
          control={control}
          rules={{ required: "제목을 입력해 주세요" }}
        />
        <ResponseBtn disabled={!formState.isValid} type="submit" state="accept">
          변경
        </ResponseBtn>
      </form>
    </section>
  );
}

//function Edit
