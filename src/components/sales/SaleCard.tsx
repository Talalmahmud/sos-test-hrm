import Image from "next/image";
import React from "react";

type Props = {};

const SaleCard = (props: Props) => {
  return (
    <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
      <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
        <p className=" text-[16px] font-semibold ">৳ 250530</p>
        <p className=" text-[13px]">Daily Income</p>
      </div>
      <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
        <Image src={"/icons/success.svg"} height={24} width={28} alt="image" />
        <p className=" text-[13px]">-33%</p>
      </div>
    </div>
  );
};

export default SaleCard;
