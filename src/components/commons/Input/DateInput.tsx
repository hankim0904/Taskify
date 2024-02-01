// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./DateInput.module.scss";
// import classNames from "classnames/bind";
// import { FieldValues, UseControllerProps, UseFormSetValue, useController, useFormContext } from "react-hook-form";

// const cx = classNames.bind(styles);

// interface IProps extends UseControllerProps {
//   name: string;
//   labelName: string;
//   setValue?: UseFormSetValue<FieldValues>;
// }

// export default function DateInput({ labelName, ...props }: IProps) {
//   const { field } = useController(props);

//   return (
//     <div className={cx("input-area")}>
//       <label className={cx("lable")}>{labelName}</label>
//       <DatePicker
//         showIcon
//         minDate={new Date()}
//         placeholderText="날짜를 선택해주세요"
//         onChange={field.onChange}
//         selected={field.value}
//       />
//     </div>
//   );
// }
