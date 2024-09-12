import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  packageData: any;
};

const PackageCard = ({ title, packageData }: Props) => {
  return (
    <div className=" text-[14px] text-[#121212 bg-bg_gray rounded-[16px] flex flex-col gap-[8px]  w-full p-2 ">
      <p className=" font-semibold">
        {packageData?.package_name?.toUpperCase()}
      </p>
      <div className=" flex flex-col gap-[16px]">
        <div className=" flex justify-between items-center w-full gap-[16px] ">
          <div className=" flex flex-col items-center gap-1">
            <p className="text-[14px] text-[#121212]">
              &#2547;{packageData?.current_month?.total_payable_fee}
            </p>
            <Image src={"/icons/compare.svg"} height={10} width={10} alt="" />
            <p className="text-[14px] text-[#121212]">
              &#2547;{packageData?.previous_month?.total_payable_fee}
            </p>
          </div>
          <div className=" flex items-center gap-2">
            {" "}
            {Number(
              profitCalculation(
                packageData?.previous_month?.total_payable_fee,
                packageData?.current_month?.total_payable_fee
              )
            ) > 0 ? (
              <Image
                src={"/icons/success.svg"}
                height={24}
                width={28}
                alt="image"
              />
            ) : (
              <Image
                src={"/icons/loss.svg"}
                height={24}
                width={28}
                alt="image"
              />
            )}
            <p>
              {profitCalculation(
                packageData?.previous_month?.total_payable_fee,
                packageData?.current_month?.total_payable_fee
              )}
              %
            </p>
          </div>
        </div>
        <div className=" w-full h-[1px] bg-title"></div>
        <div className="flex justify-between items-center w-full gap-[16px] ">
          <div className=" flex  items-center gap-2">
            {" "}
            <p> {packageData?.current_month?.total_enrollments}</p>
            <Image
              src={"/icons/compare.svg"}
              className=" rotate-90"
              height={10}
              width={10}
              alt=""
            />
            <p> {packageData?.previous_month?.total_enrollments}</p>
          </div>
          <div className=" flex items-center gap-2">
            {Number(
              profitCalculation(
                packageData?.previous_month?.total_enrollments,
                packageData?.current_month?.total_enrollments
              )
            ) > 0 ? (
              <Image
                src={"/icons/success.svg"}
                height={24}
                width={28}
                alt="image"
              />
            ) : (
              <Image
                src={"/icons/loss.svg"}
                height={24}
                width={28}
                alt="image"
              />
            )}
            <p>
              {profitCalculation(
                packageData?.previous_month?.total_enrollments,
                packageData?.current_month?.total_enrollments
              )}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
