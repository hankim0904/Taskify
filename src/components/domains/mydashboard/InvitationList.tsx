import styles from "./InvitationList.module.scss";
import classNames from "classnames/bind";
import EmptyInvitation from "./ui/EmptyInvitation";
import IvitationTable from "./ui/InvitationTable";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import getReceivedDashboardInvitations from "@/api/getReceivedDashboardInvitations";
import React, { useEffect, useRef } from "react";
import LodingSpinner from "@/components/commons/LodingSpinner/LodingSpinner";

const cx = classNames.bind(styles);

export default function InvitedDashboardList({ accessToken }: { accessToken: string }) {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["getReceivedDashboardInvitations"],
    queryFn: ({ pageParam }) => getReceivedDashboardInvitations(pageParam, accessToken),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const queryClient = useQueryClient();

  const prefetchHandler = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["getReceivedDashboardInvitations"],
      queryFn: ({ pageParam }) => getReceivedDashboardInvitations(pageParam, accessToken),
      initialPageParam: null,
      getNextPageParam: (lastPage: any) => lastPage.cursorId,
    });
  };

  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    prefetchHandler();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [fetchNextPage, accessToken]);

  return (
    <article className={cx("invitation")}>
      <h1 className={cx("invitation-title")}>초대받은 대시보드</h1>
      {data && data.pages ? <IvitationTable pages={data.pages} /> : <EmptyInvitation />}
      <div className={cx("loding-container")}>{isFetchingNextPage ? <LodingSpinner /> : ""}</div>
      <div ref={targetRef} style={{ width: "1px", height: "1px" }} />
    </article>
  );
}
