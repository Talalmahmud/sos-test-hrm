import React from "react";

type Props = {};

const UserYearlyStatus = (props: Props) => {
  return (
    <div className=" bg-green flex flex-col items-center gap-[24px] rounded-[16px] p-[24px]">
      <div>
        <label htmlFor="year"></label>
        <select
          name="yearSelect"
          className=" text-[25px] text-white font-semibold bg-green outline-none"
        >
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2022">2023</option>
          <option value="2022">2024</option>
        </select>
      </div>

      <div className=" w-full flex flex-wrap items-center justify-center gap-[16px]">
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>{" "}
        <div className=" w-[196px] h-[73px] bg-[#FFF7F4] rounded-[8px] flex flex-col items-center justify-center">
          <p className=" tex[13px]">All students</p>
          <p className=" text-[20px] font-bold">500</p>
        </div>
      </div>
    </div>
  );
};

export default UserYearlyStatus;
