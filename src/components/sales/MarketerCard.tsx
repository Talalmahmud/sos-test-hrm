import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  saleDetails: any;
  isDaily: boolean;
};

const MarketerCard = ({ isDaily, saleDetails }: Props) => {
  const dailySaleProgress: number = Number(
    profitCalculation(
      saleDetails?.previous_day?.total_payable_fee,
      saleDetails?.current_day?.total_payable_fee
    )
  );
  const monthlySaleProgress: number = Number(
    profitCalculation(
      saleDetails?.previous_month?.total_payable_fee,
      saleDetails?.current_month?.total_payable_fee
    )
  );

  const dailyEnrollProgress: number = Number(
    profitCalculation(
      saleDetails?.previous_day?.total_enrollments,
      saleDetails?.current_day?.total_enrollments
    )
  );
  const monthlyEnrollProgress: number = Number(
    profitCalculation(
      saleDetails?.previous_month?.total_enrollments,
      saleDetails?.current_month?.total_enrollments
    )
  );
  return (
    <Link
      href={`/management/user/${saleDetails?.user_id}`}
      className=" cursor-pointer rounded-[8px] bg-white px-[16px] py-[8px] flex flex-col gap-[8px] "
    >
      <div className=" flex  items-center gap-[16px]">
        <div className=" h-[32px] w-[32px] rounded-full relative overflow-auto ">
          <Image src={"/assets/im2.jpeg"} fill alt="image" />
        </div>

        <p className=" text-[16px] font-semibold">{saleDetails?.user_name}</p>
      </div>
      <div className=" flex flex-col gap-[10px] items-center">
        <div className=" flex items-center justify-center gap-x-[24px]">
          <p className=" w-[112px]">
            {isDaily
              ? saleDetails?.current_day?.total_payable_fee
              : saleDetails?.current_month?.total_payable_fee}
            Tk.
          </p>
          <div className=" flex items-center gap-[4px]">
            {isDaily ? (
              dailySaleProgress > 0 ? (
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
              )
            ) : monthlySaleProgress > 0 ? (
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

            <p className=" w-[71px]">
              {isDaily ? dailyEnrollProgress : monthlyEnrollProgress}%
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center gap-[24px]">
          <p className=" w-[112px]">
            {isDaily
              ? saleDetails?.current_day?.total_enrollments
              : saleDetails?.current_month?.total_enrollments}
          </p>
          <div className=" flex items-center gap-[4px]">
            {isDaily ? (
              dailyEnrollProgress > 0 ? (
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
              )
            ) : monthlyEnrollProgress > 0 ? (
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

            <p className=" w-[71px]">
              {isDaily ? dailyEnrollProgress : monthlyEnrollProgress}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MarketerCard;
