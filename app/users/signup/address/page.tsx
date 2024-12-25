"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const [address, setAddress] = useState(""); // 주소 상태
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 상태
  const [isActive, setIsActive] = useState(false); // 다음 버튼 활성화 상태
  const detailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 뒤로가기 함수
  const handleGoBack = () => {
    history.back();
  };

  useEffect(() => {
    // 카카오 주소 API 스크립트를 중복으로 추가하지 않음
    if (!window.daum?.Postcode) {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => console.log("Daum Postcode API loaded");
      document.body.appendChild(script);
    }
  }, []);

  // 카카오 주소 API 호출
  const openAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address); // 선택된 주소를 상태에 저장
          detailInputRef.current?.focus(); // 상세 주소 입력창에 포커스
        },
      }).open();
    }
  };

  // 상세 주소 입력 처리
  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setDetailAddress(value);
      setIsActive(value.length > 0);
    }
  };

  const handleSubmit = () => {
    alert(`주소: ${address}, 상세 주소: ${detailAddress}`);
    router.push("/users/signup/gender");
    localStorage.setItem("address", address + detailAddress);
  };

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        {/* 카카오 주소 API 스크립트 */}
        {/* <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        /> */}

        <div className="flex flex-col w-full gap-4 pt-6">
          {/* 뒤로가기 버튼 */}
          <button onClick={handleGoBack} className="w-6 h-6">
            <img src="/ic_back.png" alt="뒤로가기" />
          </button>

          {/* 제목 */}
          <div className="text-[#8728FF] text-[25px] font-semibold">
            주소를 입력해주세요
          </div>

          {/* 주소 입력 */}
          <div className="flex flex-row gap-2">
            {/* 주소 입력 필드 */}
            <input
              type="text"
              placeholder="지번, 도로명 주소"
              value={address}
              readOnly
              className="flex-1 h-10 px-3 py-2 rounded-md border border-gray-200 bg-[#F6F6F6] text-[#666666] placeholder-gray-500"
            />

            {/* 주소찾기 버튼 */}
            <button
              type="button"
              className="bg-[#8728FF] text-white rounded-md px-4 py-2 hover:bg-[#751FD1] transition-colors"
              onClick={openAddressSearch}
            >
              주소찾기
            </button>
          </div>

          {/* 상세 주소 입력 */}
          <input
            type="text"
            ref={detailInputRef}
            placeholder="상세 주소 입력"
            value={detailAddress}
            onChange={handleDetailAddress}
            className="h-10 px-3 py-2 rounded-md border border-gray-200 bg-[#F6F6F6] text-[#666666] placeholder-gray-500"
          />

          {/* 다음 버튼 */}
          <button
            type="button"
            className={`w-full py-2 rounded-md text-white ${
              isActive ? "bg-[#8728FF] hover:bg-[#751FD1]" : "bg-gray-400"
            } transition-colors`}
            onClick={handleSubmit}
            disabled={!isActive}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
