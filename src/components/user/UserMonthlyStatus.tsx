import React from "react";

type Props = {};

const UserMonthlyStatus = (props: Props) => {
  return (
    <div className=" bg-orange flex flex-col items-center gap-[24px] rounded-[16px] p-[24px]">
      <div>
        <input type="month" name="monthInput" min="2020-01" max="2024-12" />
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
        </div>
      </div>
    </div>
  );
};

export default UserMonthlyStatus;
