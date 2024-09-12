import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  title: string;

  prevSale: any;
  currentSale: any;
  prevEnroll: any;
  currentEnroll: any;
};

const SemesterCard = ({
  title,
  prevSale,
  currentEnroll,
  currentSale,
  prevEnroll,
}: Props) => {
  return (
    <div className="  flex flex-col  text-[#121212] justify-between shadow-md bg-white rounded-[8px] px-[16px] py-[8px] ">
      <p className=" text-[14px] font-semibold border-b-[1px] border-gray_light">
        {title}
      </p>
      <div className=" text-[14px] py-2">
        <div className=" w-full flex justify-between items-center ">
          <div className=" flex gap-2">
            <p className=" text-[#121212] text-left">{currentSale} Tk.</p>
            {/* <p className=" text-[#121212] text-left">{prevSale} Tk.</p> */}
          </div>
          <div className=" flex items-center gap-2">
            {" "}
            <Image
              src={
                Number(profitCalculation(prevSale, currentSale)) > 0
                  ? "/icons/success.svg"
                  : "/icons/loss.svg"
              }
              height={20}
              width={22}
              alt="image"
            />
            <p className=" text-[#121212]">
              {profitCalculation(prevSale, currentSale)}%
            </p>
          </div>
        </div>
        <div className=" w-full h-[1px] bg-border_orange my-[4px]"></div>
        <div className=" w-full flex justify-between items-center ">
          <p>{currentEnroll}</p>
          <div className=" flex items-center gap-2">
            <Image
              src={
                Number(profitCalculation(prevEnroll, currentEnroll)) > 0
                  ? "/icons/success.svg"
                  : "/icons/loss.svg"
              }
              height={20}
              width={22}
              alt="image"
            />
            <p>{profitCalculation(prevEnroll, currentEnroll)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;
