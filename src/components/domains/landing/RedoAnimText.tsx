"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export interface Props {
  delay: number;
}

export default function RedoAnimText({ delay }: Props) {
  const textIndex = useMotionValue(0);
  const texts = [
    "나만의 새로운 일정 관리🧑‍💻",
    "나만의 자유로운 일정관리🏃‍♂️",
    "좋아하는 친구와 함께하는 일정관리☺️",
    "신뢰하는 팀원과 함께하는 일정관리🧑‍🤝‍🧑",
    "오늘부터 시작하는 일정관리👊",
  ];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
  }, []);

  return <motion.span className="inline">{displayText}</motion.span>;
}
