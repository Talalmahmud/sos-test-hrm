import { profitCalculation } from "@/utils/staticData";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  planData: any;
};

const PlanCard = ({ title, planData }: Props) => {
  return (
    <div className="  text-[14px] text-[#121212] bg-white rounded-[16px] h-[130px] flex flex-col gap-[16px] items-center justify-center ">
      <p className=" font-semibold">{planData?.plan_name?.toUpperCase()}</p>
      <div className=" w-full flex flex-col gap-[16px] px-4">
        <div className=" flex justify-between items-center   ">
          <p className="text-[16px]  text-[#121212]">
            &#2547;{planData?.current_month?.total_payable_fee}
          </p>
          <div className=" flex items-center gap-1">
            {" "}
            {Number(
              profitCalculation(
                planData?.previous_month?.total_payable_fee,
                planData?.current_month?.total_payable_fee
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
                planData?.previous_month?.total_payable_fee,
                planData?.current_month?.total_payable_fee
              )}
              %
            </p>
          </div>
        </div>
        <div className=" w-full px-4 flex items-center justify-between ">
          <div className=" flex justify-between items-center   ">
            <p> {planData?.current_month?.total_enrollments}</p>
            <Image
              src={"/icons/compare.svg"}
              className=" rotate-90"
              height={10}
              width={10}
              alt=""
            />
            <p> {planData?.previous_month?.total_enrollments}</p>
          </div>{" "}
          <div className=" flex items-center gap-1">
            <div className=" flex items-center gap-1">
              {" "}
              {Number(
                profitCalculation(
                  planData?.previous_month?.total_enrollments,
                  planData?.current_month?.total_enrollments
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
                {" "}
                {profitCalculation(
                  planData?.previous_month?.total_enrollments,
                  planData?.current_month?.total_enrollments
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
