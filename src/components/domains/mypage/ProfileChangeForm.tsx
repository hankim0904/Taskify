import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/components/commons/Input/Input";
import ResponseBtn from "@/components/commons/Buttons/ResponseButton";
import styles from "./ProfileChangeForm.module.scss";
import classNames from "classnames/bind";
import getUsersMe from "@/api/getUsersMe";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import defaultImage from "./logo-codeit.png";
import putChangeUserProfile from "@/api/putChangeUserProfile";
import { axiosCSRInstance } from "@/api/axiosCSRInstance";
import { useAuth } from "@/contexts/AuthContext";

const cx = classNames.bind(styles);

export default function ProfileChangeForm() {
  const [previewImage, setPreviewImage] = useState<string | null>("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [hide, setHide] = useState(true);

  const { accessToken } = useAuth();

  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  });

  const { data: userMeData } = useQuery({
    queryKey: ["userMe"],
    queryFn: () => getUsersMe(),
  });

  useEffect(() => {
    if (userMeData) {
      setValue("nickname", userMeData.nickname);
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (profileImageUrl === "") {
      putChangeUserProfile(data.nickname, null, accessToken);
    } else {
      putChangeUserProfile(data.nickname, profileImageUrl, accessToken);
    }
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
        const res = await axiosCSRInstance.post("users/me/image", formData, {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
        });

        setProfileImageUrl(res.data.profileImageUrl);
      } catch (e) {
        throw new Error(`${e}`);
      }
    }
  }

  function handleChangeDefaultImage() {
    setHide(!hide);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("mypage-container-profile")}>
        <div className={cx("title")}>프로필</div>
        <div className={cx("contents")}>
          <div className={cx("contents-upload-area")}>
            {hide ? (
              <div className={cx("contents-upload-image")}>
                {userMeData?.profileImageUrl ? (
                  <Image fill src={userMeData?.profileImageUrl} alt="현재 이미지" style={{ objectFit: "cover" }} />
                ) : (
                  <div className={cx("contents-basic-image")}>
                    <span className={cx("nickname")}>유</span>
                  </div>
                )}
                {previewImage && <Image fill src={previewImage} alt="미리 보기" style={{ objectFit: "cover" }} />}
              </div>
            ) : (
              <div className={cx("contents-basic-image")}>
                <span className={cx("nickname")}>유</span>
              </div>
            )}

            <label htmlFor="profile-image">
              <span className={cx("upload-image-btn")}>사진 선택</span>
            </label>
            <div onClick={handleChangeDefaultImage}>
              <span className={cx("basic-image-btn")}>기본 이미지로 변경</span>
            </div>
            <div style={{ display: "none" }} onChange={handleUploadImage}>
              <Input name="profile-image" labelName="" type="file" control={control} />
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
