import { useForm } from "react-hook-form";

import Textarea from "@/components/commons/Input/Textarea";
import ResponseButton from "@/components/commons/Buttons/ResponseButton";

import styles from "./CardDetailTextarea.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function CardDetailTextarea() {
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const handleOnSubmit = () => {
    console.log("hi");
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit(handleOnSubmit)}>
      <Textarea
        name="comment-Textarea"
        labelName="댓글"
        placeholder="댓글 작성하기"
        isModal={false}
        control={control}
      />
      <ResponseButton type="submit" disabled={!formState.isValid} state="reject">
        입력
      </ResponseButton>
    </form>
  );
}
