import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateInput.module.scss";
import classNames from "classnames/bind";
import { FieldValues, UseControllerProps, UseFormSetValue, useController, useFormContext } from "react-hook-form";
import Image from "next/image";
import ko from "date-fns/locale/ko";

const cx = classNames.bind(styles);

interface IProps extends UseControllerProps {
  name: string;
  labelName: string;
  setValue?: UseFormSetValue<FieldValues>;
  startDate: Date;
}

export default function DateInput({ labelName, startDate, ...props }: IProps) {
  const { field, fieldState } = useController(props);

  return (
    <div className={cx("input-area")}>
      <label className={cx("label")}>{labelName}</label>
      <DatePicker
        showTimeInput
        locale={ko}
        dateFormat="yyyy.MM.dd  h:mm aa"
        className={cx("input")}
        minDate={startDate}
        placeholderText="날짜를 선택해주세요"
        onChange={field.onChange}
        selected={field.value}
      />
      <p className={cx("error-message")}>{fieldState.error?.message}</p>
    </div>
  );
}
