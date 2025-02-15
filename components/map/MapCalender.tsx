"use client";

import Image from "next/image";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import CalendarPage from "@/components/CalendarPage";
import subIcon from "@/assets/subIcon.png";
import addIcon from "@/assets/addIcon.png";
import xIcon from "@/assets/xIcon.png";
import {
  formattedYearToDay,
  formattedMonthToDay,
  formattedDate,
} from "@/feature/DateFormat";
import { useCalendar } from "@/feature/CalendarContext";

export default function MapCaleder({ setOnCalendar }) {
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    adultNumber,
    setAdultNumber,
    kidNumber,
    setKidNumber,
  } = useCalendar();

  // 날짜 선택 함수
  const handleDateSelect = (selectedDate) => {
    console.log(selectedDate);
    if (Array.isArray(selectedDate) && selectedDate.length === 2) {
      const [startDate, endDate] = selectedDate;
      setCheckInDate(formattedDate(startDate));
      setCheckOutDate(formattedDate(endDate));
    }
  };

  // Adult Number 변경 함수
  const handleAdultChange = (delta) => {
    setAdultNumber(adultNumber + delta < 1 ? 1 : adultNumber + delta); // 1명 이상으로 제한
  };

  // Kid Number 변경 함수
  const handleKidChange = (delta) => {
    setKidNumber(kidNumber + delta > 0 ? kidNumber + delta : 0); // 0보다 작지 않도록 처리
  };

  return (
    <>
      <div className="relative h-[70px] font-semibold ">
        <div className="mt-[47px] flex h-[24px] items-center">
          <button
            className="ml-[8px] size-[12px]"
            onClick={() => setOnCalendar(false)}
          >
            <Image src={xIcon} alt="xIcon" width={12} height={12} />
          </button>
          <div className="mr-[20px] flex flex-1 justify-center">
            <span className="text-[16px] tracking-[-0.8px]">날짜 선택</span>
          </div>
        </div>
      </div>
      <div className="mt-[12px] gap-[7px] flex items-center justify-center">
        <button
          className="flex h-[37px] w-[200px] items-center rounded-[18px] bg-[#F6F6F6]"
          onClick={() => setOnCalendar(true)}
        >
          <Image
            src={calendarIcon}
            alt="calendar"
            className="ml-[17px]"
            width={18}
            height={18}
          />
          <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
            {formattedMonthToDay(checkInDate, checkOutDate)}
          </span>
        </button>
        <button
          className="flex h-[37px] w-[114px] items-center rounded-[18px] bg-[#F6F6F6]"
          onClick={() => setOnCalendar(true)}
        >
          <Image
            src={personnelIcon}
            alt="personnel"
            className="ml-[15px] "
            width={18}
            height={18}
          />
          <span className="ml-[8px] h-[20px] text-[13px] font-medium tracking-[-0.45px]">
            {`성인 ${adultNumber}명`}
          </span>
        </button>
      </div>
      <CalendarPage onDateSelect={handleDateSelect} />
      <hr className=" mt-[20px] w-[360px] border-[3.5px] border-[#E5E5E5] flex items-center" />
      <div className="mt-[20px] px-4">
        <span className="text-[16px] font-bold">인원</span>
      </div>
      <div className="mt-[20px] flex items-center px-4">
        <span className="text-[14px]">성인</span>
        <div className="ml-auto flex gap-[11px]">
          <button onClick={() => handleAdultChange(-1)}>
            <Image
              src={subIcon}
              alt="subIcon"
              className="w-[18px]"
              width={18}
              height={18}
            />
          </button>
          <span className="text-[14px]">{adultNumber}</span>
          <button onClick={() => handleAdultChange(1)}>
            <Image
              src={addIcon}
              alt="addIcon"
              className="w-[18px]"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      <div className="mt-[20px] flex items-center px-4">
        <span className="text-[14px]">아동</span>
        <div className="ml-auto flex gap-[11px]">
          <button onClick={() => handleKidChange(-1)}>
            <Image
              src={subIcon}
              alt="subIcon"
              className="w-[18px]"
              width={18}
              height={18}
            />
          </button>
          <span className="text-[14px]">{kidNumber}</span>
          <button onClick={() => handleKidChange(1)}>
            <Image
              src={addIcon}
              alt="addIcon"
              className="w-[18px]"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      <div className="absolute bottom-[100px] left-0 right-0 flex justify-center">
        <button
          className="w-[320px] h-[50px] rounded-[5px] bg-[#8728FF]"
          onClick={() => setOnCalendar(false)}
        >
          <span className="text-[16px] tracking-[-0.8px] text-white">
            {`${formattedYearToDay(checkInDate, checkOutDate)}, 총 ${adultNumber + kidNumber}명`}
          </span>
        </button>
      </div>
    </>
  );
}
