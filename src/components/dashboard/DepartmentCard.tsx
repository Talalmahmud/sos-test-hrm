import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  saleDetails: any;
};

const DepartmentCard = ({ title, saleDetails }: Props) => {
  return (
    <div className="  flex flex-col  text-[#121212] justify-between shadow-md bg-white rounded-[8px] px-[16px] py-[8px] ">
      <p className=" text-[14px] font-semibold border-b-[1px] border-gray_light">
        {title}
      </p>
      <div className=" text-[14px]">
        <div className=" grid grid-cols-3 items-center justify-center gap-[24px] ">
          <p className=" text-[#121212] text-left">
            {saleDetails?.current_month?.total_payable_fee} Tk.
          </p>
          {Number(
            profitCalculation(
              saleDetails?.previous_month?.total_payable_fee,
              saleDetails?.current_month?.total_payable_fee
            )
          ) > 0 ? (
            <Image
              src={"/icons/success.svg"}
              height={20}
              width={22}
              alt="image"
            />
          ) : (
            <Image src={"/icons/loss.svg"} height={20} width={22} alt="image" />
          )}

          <p className=" text-[#121212]">
            {profitCalculation(
              saleDetails?.previous_month?.total_payable_fee,
              saleDetails?.current_month?.total_payable_fee
            )}
            %
          </p>
        </div>
        <div className=" w-full h-[1px] bg-border_orange my-[4px]"></div>
        <div className=" grid grid-cols-3 items-center justify-center gap-[16px] ">
          <p> {saleDetails?.current_month?.total_enrollments}</p>
          {Number(
            profitCalculation(
              saleDetails?.previous_month?.total_enrollments,
              saleDetails?.current_month?.total_enrollments
            )
          ) > 0 ? (
            <Image
              src={"/icons/success.svg"}
              height={20}
              width={22}
              alt="image"
            />
          ) : (
            <Image src={"/icons/loss.svg"} height={20} width={22} alt="image" />
          )}
          <p>
            {profitCalculation(
              saleDetails?.previous_month?.total_enrollments,
              saleDetails?.current_month?.total_enrollments
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
