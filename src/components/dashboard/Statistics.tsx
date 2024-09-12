"use client";
import React, { useEffect, useState } from "react";
import StatisticsCard from "./StatisticsCard";
import { ApiGet } from "@/app/action";
import { EndPoint } from "@/utils/api";

type Props = {};

const Statistics = (props: Props) => {
  const [targetData, setTargetData] = useState<any>([]);
  const date = new Date();
  const getTargetData = async () => {
    // const res = await axios.get(EndPoint.DASHBOARD_CATEGORY);

    const { resData } = await ApiGet(EndPoint.DASHBOARD_CATEGORY);

    setTargetData(resData);
  };

  useEffect(() => {
    getTargetData();
  }, []);
  return (
    <div className=" w-full h-auto lg:h-[162px] flex gap-[16px] items-center  bg-border_orange rounded-[16px] py-[16px] px-[24px]">
      {/* <div className=" flex flex-col gap-y-[4px] items-center justify-center h-[130px] rounded-[8px] bg-white">
        <p className=" text-left">Stipend Total</p>
        <p className=" text-[16px] font-semibold ">$533455</p>
      </div> */}
      <div className=" flex flex-1 items-center justify-center h-[130px] rounded-[8px] bg-white">
        <div className=" flex items-center justify-center flex-col px-[24px]">
          <p className="  font-[600]">3000</p>
          <p>Refered</p>
        </div>
        <div className=" h-[46px] w-[1px] bg-orange "></div>
        <div className=" flex items-center justify-center flex-col px-[24px]">
          <p className="  font-[600]">0</p>
          <p>Stipend</p>
        </div>
      </div>
      {/* <div className=" h-[130px] flex flex-col pt-[16px] items-center  rounded-[8px] bg-white">
        <p>Scholarship</p>
        <div className=" flex items-center justify-center  ">
          <div className=" flex items-center justify-center flex-col px-[24px]">
            <p className=" font-[600]">3000</p>
            <p>Paid</p>
          </div>
          <div className=" h-[46px] w-[1px] bg-orange "></div>
          <div className=" flex items-center justify-center flex-col px-[24px]">
            <p className="  font-[600]">0</p>
            <p>Total</p>
          </div>
        </div>
      </div> */}

      {/* <div className=" flex flex-col items-center justify-center h-[130px] rounded-[8px] bg-white">
        <p>Scholarship</p>
        <div className=" flex items-center justify-center flex-col px-[24px]">
          <p className="  font-[600]">3000</p>
          <p>Refered</p>
        </div>
        <div className=" h-[80px] w-[1px] bg-orange "></div>
        <div className=" flex items-center justify-center flex-col px-[24px]">
          <p className="  font-[600]">0</p>
          <p>Stipend</p>
        </div>
      </div> */}
      <div className=" h-[130px] flex flex-1 flex-col pt-[16px] items-center  rounded-[8px] bg-white">
        <p>Students</p>
        <div className=" flex items-center justify-center  ">
          <div className=" flex items-center justify-center flex-col px-[24px]">
            <p className=" font-[600]">{}</p>
            <p>Active</p>
          </div>
          <div className=" h-[46px] w-[1px] bg-orange "></div>
          <div className=" flex items-center justify-center flex-col px-[24px]">
            <p className="  font-[600]">0</p>
            <p>Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
