"use client";
import React, { useCallback, useEffect, useState } from "react";
import SaleCard from "./SaleCard";
import Calendar from "../Calendar";
import { formatDate, format } from "date-fns";
import Image from "next/image";
import { ApiGet } from "@/app/action";
import { EndPoint } from "@/utils/api";
import DatePicker from "react-datepicker";
import { profitCalculation } from "../../utils/staticData";

type Props = { saleDetails: any };
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const SaleGrid = ({ saleDetails }: Props) => {
  return (
    <div className=" h-auto  bg-green/20 rounded-[16px] p-[24px] flex flex-col gap-[24px] ">
      {/* <div className="flex items-center divide-green divide-x-2 ">
        {categoryList?.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setSelectCategory(item?.category_name);
            }}
            className={` ${
              selectCategory === item?.category_name
                ? "bg-orange text-white"
                : " bg-white"
            } p-1 text-[14px]`}
          >
            {item?.category_name}
          </button>
        ))}
      </div> */}

      <div className="  rounded-[16px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
        {/* start */}
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">
              ৳ {saleDetails?.current_day?.total_payable_fee}
            </p>
            <p className=" text-[13px]">Daily Income</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            {Number(
              profitCalculation(
                saleDetails?.previous_day?.total_payable_fee,
                saleDetails?.current_day?.total_payable_fee
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

            <p className=" text-[13px]">
              {profitCalculation(
                saleDetails?.previous_day?.total_payable_fee,
                saleDetails?.current_day?.total_payable_fee
              )}
              %
            </p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">
              {saleDetails?.current_day?.total_enrollments}
            </p>
            <p className=" text-[13px]">New Student</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            {Number(
              profitCalculation(
                saleDetails?.previous_day?.total_enrollments,
                saleDetails?.current_day?.total_enrollments
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
            <p className=" text-[13px]">
              {profitCalculation(
                saleDetails?.previous_day?.total_enrollments,
                saleDetails?.current_day?.total_enrollments
              )}
              %
            </p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <div className=" flex items-center gap-1">
              <p className=" text-[16px] font-semibold ">
                ৳ {saleDetails?.current_day?.total_pending_fee}
              </p>
              <p className="text-[16px]">/</p>
              <p className=" text-[16px] font-semibold ">
                {saleDetails?.current_day?.total_pending_enrollments}
              </p>
            </div>
            <p className=" text-[13px]">Processing Amount</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <div className=" flex items-center gap-1">
              <p className=" text-[16px] font-semibold ">
                ৳
                {saleDetails?.current_day?.total_course_fee -
                  saleDetails?.current_day?.total_payable_fee}
              </p>
              <p className="text-[16px]">/</p>
              <p className=" text-[16px] font-semibold ">
                {saleDetails?.current_day?.total_due_enrollments}
              </p>
            </div>
            <p className=" text-[13px]"> Due Amount</p>
          </div>
        </div>
        {/* <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">12</p>
            <p className=" text-[13px]">Polytechnic</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">Job</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">DUET</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">Dreamer</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">ICT</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SaleGrid;
