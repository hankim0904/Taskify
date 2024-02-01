import { UseControllerProps, useController } from "react-hook-form";
import styles from "./Textarea.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface InputProps extends UseControllerProps {
  placeholder: string;
  labelName?: string;
  isModal: boolean;
}

export default function Textarea({ isModal, placeholder, labelName, ...props }: InputProps) {
  const { field, fieldState } = useController(props);

  const isError = fieldState.invalid;

  return (
    <div className={cx("textarea-area")}>
      <label htmlFor={props.name} className={cx("label")}>
        {labelName}
        {isModal && <span className={cx("modalRequired")}> *</span>}
      </label>
      <textarea id={props.name} className={cx("textarea", { error: isError })} placeholder={placeholder} {...field} />
      <p className={cx("error-message")}>{isError && fieldState.error?.message}</p>
    </div>
  );
}
