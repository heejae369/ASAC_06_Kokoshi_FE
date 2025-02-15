"use client";
import { useState, useEffect } from "react";
import { generateRandomNickname } from "@/feature/generateRandomNickname";
// import { localStorageApi } from "@/lib/localStorageApi";
import CustomFetch from "@/feature/CustomFetch";
// import { postApiSendingTest } from "@/feature/PostApiSending";
import { useRouter } from "next/navigation";
import { useCustomAlert } from "@/feature/useCustomAlert";

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { showAlertMessage, AlertComponent } = useCustomAlert();

  // 닉네임 유효성 검사 함수
  const validateNickname = (value) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (!value) {
      return { isValid: false, message: "닉네임을 입력해주세요." };
    }

    if (!nicknameRegex.test(value)) {
      return {
        isValid: false,
        message: "닉네임은 한글, 영문, 숫자만 입력 가능합니다.",
      };
    }

    if (value.length < 2 || value.length > 10) {
      return {
        isValid: false,
        message: "닉네임은 2자 이상 10자 이하로 입력해주세요.",
      };
    }

    return { isValid: true, message: "" };
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    const value = e.target.value || "";
    setNickname(value);

    const { isValid, message } = validateNickname(value);
    if (!isValid) {
      setError(message);
    } else {
      setError("");
    }
  };

  // 닉네임 저장 함수
  const saveNicknameToLocalStorage = (value) => {
    localStorage.setItem("userNickname", value); // 로컬 스토리지에 닉네임 저장
  };

  // 뒤로가기 함수
  const handleBack = () => {
    router.back();
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    const { isValid, message } = validateNickname(nickname);
    // if (!isValid) return;
    console.log(`닉네임11: ${nickname}`);
    if (nickname.length < 1) {
      const randomNickname = generateRandomNickname(); // 랜덤 닉네임 생성
      setNickname(randomNickname);
      console.log(`닉네임: ${randomNickname}`);
      showAlertMessage(
        `닉네임이 입력되지 않아 랜덤 닉네임이 설정됩니다\n " ${randomNickname} "`
      );
      localStorage.setItem("userNickname", randomNickname);
      setError("");
    } else {
      router.push("/users/signup/terms");
    }
    // 닉네임 유효성이 통과되면 로컬 스토리지에 저장
    // saveNicknameToLocalStorage(nickname);
    //
  };

  return {
    nickname,
    error,
    handleNicknameChange,
    handleNext,
    saveNicknameToLocalStorage,
    handleBack,
    showAlertMessage,
    AlertComponent,
  };
};
