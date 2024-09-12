import Image from "next/image";
import React from "react";

type Props = { data1: any; data2: any };

const CurrentDateCard2 = ({ data1, data2 }: Props) => {
  return (
    <div className=" w-full  py-[8px]  flex items-center justify-center flex-col gap-y-[16px] shadow-[0_25px_65px_15px_rgba(0,0,0,0.1)] rounded-[16px]">
      <div className=" flex items-center justify-center gap-[4px] px-[12px] py-[4px] ">
        <Image
          src={"/icons/star_duotone_line.png"}
          height={22}
          width={22}
          alt="image"
        />
        <p className=" text-[18px] font-semibold text-gray_title leading-[24px]  ">
          Students
        </p>
      </div>
      <div className="  grid grid-cols-2 h-[46px] items-center justify-center text-[#121212]">
        <div className=" px-[24px] flex flex-col border-r-[1px] items-center justify-center ">
          <p className=" text-[16px] font-[600px] ">{data1}</p>
          <p className=" text-[14px]">pending</p>
        </div>
        <div className=" px-[16px] flex flex-col items-center justify-center ">
          <p className=" text-[16px] font-[600px] ">{data2}</p>
          <p className=" text-[14px]">due pending</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDateCard2;
