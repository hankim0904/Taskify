import Input from "@/components/commons/Input/Input";
import styles from "./DashboradEditTitleBox.module.scss";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import ColorList from "@/components/commons/ColorList/ColorList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getDashBoardTittle, getDashBoardTittleQueryKey } from "../../../../api/getEditData";
import { putDashBoard } from "@/api/putDashBoard";
import { DashBoradData } from "@/pages/dashboard/[dashboardid]/edit";

getDashBoardTittleQueryKey;

const cx = classNames.bind(styles);

export default function DashboradEditTitleBox({ titleData }: { titleData: DashBoradData }) {
  const { control, handleSubmit, formState, setValue } = useForm();
  const { dashboardid } = useParams();
  const [color, setColor] = useState(titleData?.color);
  const queryClient = useQueryClient();

  const editDashboardMutation = useMutation({
    mutationFn: (putData: { title: string; color: string }) => putDashBoard(dashboardid, putData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDashBoardTittleQueryKey(dashboardid) });
    },
  });

  const colorList: { [key: string]: string } = {
    green: "#7ac555",
    purple: "#760dde",
    orange: "#ffa500",
    blue: "#76a5ea",
    pink: "#e876ea",
  };

  const handleOnsubmit: SubmitHandler<FieldValues> = (data) => {
    if (!titleData.createdByMe) {
      alert("사용자가 만든 대시보드가 아닙니다.");
    } else {
      const newTitle = { title: data.dashboardName, color: colorList[color] };
      editDashboardMutation.mutate(newTitle);
      setValue("dashboardName", "");
    }
  };

  return (
    <section className={cx("dashborad-edit-box")}>
      <article className={cx("title-line")}>
        <h2 className={cx("title")}>{titleData?.title}</h2>
        <ColorList setColor={setColor} />
      </article>
      <form className={cx("edit-form")} onSubmit={handleSubmit(handleOnsubmit)}>
        <Input
          name="dashboardName"
          placeholder={titleData?.title}
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
