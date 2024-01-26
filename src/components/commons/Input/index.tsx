import { UseControllerProps, useController } from 'react-hook-form';
import styles from './input.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface InputProps extends UseControllerProps {
  placeholder: string;
  labelName?: string;
  type: string;
}

export default function Input({ placeholder, type, labelName, ...props }: InputProps) {
  const { field, fieldState } = useController(props);
  const [inputType, setInputType] = useState(type);

  const handleChangePasswordType = () => {
    const changedType = inputType === 'password' ? 'text' : 'password';
    setInputType(changedType);
  };

  const eyeImg = inputType === 'password' ? '/assets/icon/ic-eye-close.svg' : '/assets/icon/ic-eye-open.svg';

  const isError = fieldState.invalid;

  return (
    <div className={cx('input-area')}>
      <label htmlFor={props.name} className={cx('label')}>
        {labelName}
        {props.name === 'createTodoModalTitle' && <span className={cx('modalRequired')}> *</span>}
      </label>
      <input
        id={props.name}
        type={inputType}
        className={cx('input', { error: isError }, { search: type === 'search' })}
        placeholder={placeholder}
        {...field}
      />

      <p className={cx('error-message')}>{isError && fieldState.error?.message}</p>

      {type === 'password' ? (
        <Image
          className={cx('eye')}
          width={16}
          height={16}
          src={eyeImg}
          alt="비밀번호 보기"
          onClick={handleChangePasswordType}
        />
      ) : null}
      {type === 'search' ? (
        <Image src="/assets/icon/ic-magnifier.svg" className={cx('searchIcon')} width={24} height={24} alt="검색하기" />
      ) : null}
    </div>
  );
}
