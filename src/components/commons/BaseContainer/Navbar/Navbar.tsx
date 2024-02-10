import Image from "next/image";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import getMembers from "@/api/getMembers";
import getUsersMe from "@/api/getUsersMe";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import InviteModal from "../../Modals/InviteModal/InviteModal";
import { useModal } from "@ebay/nice-modal-react";
import UserProfile from "./UserProfile/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import extractFirstLetter from "@/utils/extractFirstLetter";
import getDashBoards from "@/api/getDashBoards";

const cx = classNames.bind(styles);

const MAX_DISPLAY_PC = 4;
const MAX_DISPLAY_TABLET = 2;

interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface NavbarProps {
  currentPath: string;
  dashboardTotalCount: number;
}

type Member = {
  id: number;
  profileImageUrl?: string;
  nickname: string;
};

export default function Navbar({ currentPath, dashboardTotalCount }: NavbarProps) {
  const [isTablet, setIsTablet] = useState(false);
  const modal = useModal(InviteModal);
  const router = useRouter();
  const dashboardId = router.query.dashboardid;
  const { accessToken } = useAuth();

  const { data: memberData } = useQuery({
    queryKey: ["memberList", dashboardId],
    queryFn: () => getMembers(accessToken, dashboardId),
  });
  const memberList: Member[] = memberData?.members || [];
  const memberTotalCount: number | undefined = memberData?.totalCount;

  const { data: userMeData } = useQuery({
    queryKey: ["userMe"],
    queryFn: () => getUsersMe(accessToken),
  });

  const { data: dashboardData } = useQuery({
    queryKey: ["navbarDashboardTitle"],
    queryFn: () => getDashBoards("pagination", accessToken, dashboardTotalCount, 1),
  });

  const dashboardList = dashboardData?.dashboards || [];
  const displayedMembers: Member[] = memberList.slice(0, isTablet ? MAX_DISPLAY_TABLET : MAX_DISPLAY_PC);
  const remainingMembersCount: number = memberTotalCount ? memberTotalCount - displayedMembers.length : 0;

  const clickedDashboard = dashboardList.find((dashboard: DashboardData) => dashboard.id === Number(dashboardId));

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1199);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className={cx("navbar")}>
      <div className={cx("navbar-title")}>
        {currentPath.includes("/dashboard") && (
          <>
            <span className={cx("dashboard-name")}>{clickedDashboard?.title}</span>

            <span className={cx("created-icon")}>
              {clickedDashboard?.createdByMe && <Image fill src="/assets/icons/ic-crown.svg" alt="왕관 모양 아이콘" />}
            </span>
          </>
        )}

        {router.pathname === "/mydashboard" && <span className={cx("dashboard-name")}>내 대시보드</span>}
        {router.pathname === "/mypage" && <span className={cx("dashboard-name")}>계정관리</span>}
      </div>

      {currentPath.includes("/dashboard") && (
        <div className={cx("navbar-utils")}>
          <div className={cx("navbar-action-btns")}>
            <button className={cx("manage")} onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}>
              <Image className={cx("img")} width={20} height={20} src="/assets/icons/ic-gear.svg" alt="관리 아이콘" />
              <span className={cx("text")}>관리</span>
            </button>
            <button className={cx("invite")}>
              <Image
                className={cx("img")}
                width={20}
                height={20}
                src="/assets/icons/ic-plus-box.svg"
                alt="초대 아이콘"
              />
              <span className={cx("text")} onClick={() => modal.show()}>
                초대하기
              </span>
            </button>
          </div>

          <div className={cx("navbar-member")}>
            {memberTotalCount !== 0 &&
              displayedMembers.map((member, index) =>
                member.profileImageUrl ? (
                  <div
                    key={member.id}
                    className={cx("navbar-member-list", memberTotalCount === 1 && "only-me")}
                    style={{
                      position: "relative",
                      right: `${index}rem`,
                      backgroundColor: "white",
                    }}>
                    <Image
                      fill
                      src={member.profileImageUrl}
                      className={cx("navbar-member-list-img")}
                      alt="멤버 이미지"
                    />
                  </div>
                ) : (
                  <div
                    className={cx("navbar-member-list", memberTotalCount === 1 && "only-me")}
                    style={{
                      position: "relative",
                      right: `${index}rem`,
                    }}>
                    <span className={cx("navbar-member-list-nickname")}>{extractFirstLetter(member.nickname)}</span>
                  </div>
                ),
              )}
            {memberTotalCount !== undefined && memberTotalCount > displayedMembers.length && (
              <div
                className={cx("navbar-member-list", "count")}
                style={{ position: "relative", right: `${displayedMembers.length}rem` }}>
                <span className={cx("navbar-member-list-count")}>+{remainingMembersCount}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <UserProfile userMeData={userMeData} extractFirstLetter={extractFirstLetter} />
    </div>
  );
}
