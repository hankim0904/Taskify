import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/commons/Input/Input";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./ProfileChangeForm.module.scss";
import classNames from "classnames/bind";
import getUsersMe from "@/api/getUsersMe";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import defaultImage from "./logo-codeit.png";
import putChangeUserProfile from "@/api/putChangeUserProfile";
import { axiosInstance } from "@/api/axiosInstance";

const cx = classNames.bind(styles);
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njg5LCJ0ZWFtSWQiOiIyLTkiLCJpYXQiOjE3MDY2NzgwMzEsImlzcyI6InNwLXRhc2tpZnkifQ.xTJzppjh39utbp7V6-yYsFFXYzDmDT4jFUxabGtVZlY";

export default function ProfileChangeForm() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const { data: userMeData } = useQuery({
    queryKey: ["userMe"],
    queryFn: () => getUsersMe(),
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    putChangeUserProfile(data.nickname, profileImageUrl!);
    // error 면 submit 안됨 ,SubmitHandler<FieldValues> handleSubmit 안에 들어가는 type 입니다
  };

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axiosInstance.post("users/me/image", formData, {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
        });

        setProfileImageUrl(res.data.profileImageUrl);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleChangeDefaultImage() {
    setPreviewImage(defaultImage);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("mypage-container-profile")}>
        <div className={cx("title")}>프로필</div>
        <div className={cx("contents")}>
          <div>
            <div className={cx("contents-upload-image")}>
              {userMeData?.profileImageUrl ? (
                <Image fill src={userMeData?.profileImageUrl} alt="현재 이미지" style={{ objectFit: "cover" }} />
              ) : (
                <Image fill src={defaultImage} alt="현재 이미지" style={{ objectFit: "cover" }} />
              )}
              {
                previewImage && <Image fill src={previewImage} alt="미리 보기" style={{ objectFit: "cover" }} />
                // <Image width={30} height={30} src="/assets/icons/ic-plus-without-background.svg" alt="이미지 업로드" />
              }
            </div>

            <label htmlFor="profile-image">
              <span className={cx("upload-image-btn")}>사진 선택</span>
              {/* <ResponseBtn state="reject" ph={0.8} onClick={() => document.getElementById("profile-image").click()}>
              사진 선택
            </ResponseBtn> */}
            </label>
            <div onClick={handleChangeDefaultImage}>
              <ResponseBtn state="cancel" ph={0.8}>
                기본 이미지로 변경
              </ResponseBtn>
            </div>
            <div style={{ display: "none" }} onChange={handleUploadImage}>
              <Input name="profile-image" labelName="" type="file" control={control} />
              {/* <input
            type="file"
            id="profile-image"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleUploadImage}
          /> */}
            </div>
          </div>

          <div className={cx("contents-input-area")}>
            <div className={cx("contents-input-area-email")}>
              <span className={cx("label")}>이메일</span>
              <input className={cx("input-box")} value={`${userMeData?.email}`} disabled />
            </div>
            <div className={cx("contents-input-area-nickname")}>
              <Input
                name="nickname"
                labelName="닉네임"
                type="text"
                control={control}
                placeholder="닉네임을 입력해 주세요"
              />
            </div>
          </div>
        </div>
        <div className={cx("contents-btn")}>
          <ResponseBtn state="accept" type="submit" ph={0.8}>
            저장
          </ResponseBtn>
        </div>
      </div>
    </form>
  );
}
