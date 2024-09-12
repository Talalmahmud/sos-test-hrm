import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import React from "react";

type Props = { title: any; prevSale: any; currentSale: any };

const CurrentDateCard = ({ title, prevSale, currentSale }: Props) => {
  return (
    <div className="w-full flex  flex-col justify-between gap-[8px]  p-4 shadow-[0_25px_65px_15px_rgba(0,0,0,0.1)] rounded-[16px]">
      <div className=" flex flex-col gap-[8px]">
        <div className=" flex items-center gap-2">
          <Image
            src={"/icons/star_duotone_line.png"}
            height={22}
            width={22}
            alt="image"
          />
          <p className=" text-[20px] font-semibold text-gray_title ">{title}</p>
        </div>
        <div className=" h-[1px] bg-gray_light w-full"></div>
      </div>

      <div className=" flex w-full text-[12px] items-center justify-between gap-[4px] text-[#121212]">
        <div className=" flex flex-col md:flex-row items-center gap-1">
          <p className=" text-[16px]">
            {currentSale}
            {title === "Total Earn" && (
              <span className=" text-orange text-[12px]">Tk.</span>
            )}
          </p>
          <Image
            src={"/icons/compare.svg"}
            className=" rotate-90"
            height={24}
            width={24}
            alt=""
          />
          <p className=" text-[16px]">
            {prevSale}
            {title === "Total Earn" && (
              <span className=" text-orange text-[12px]">Tk.</span>
            )}
          </p>
        </div>
        <div className=" flex items-center gap-2">
          {Number(profitCalculation(prevSale, currentSale)) > 0 ? (
            <Image
              src={"/icons/success.svg"}
              height={18}
              width={20}
              alt="image"
            />
          ) : (
            <Image src={"/icons/loss.svg"} height={18} width={20} alt="image" />
          )}
          <p>{profitCalculation(prevSale, currentSale)}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDateCard;
