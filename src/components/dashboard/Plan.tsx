"use client";
import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import { ApiGet } from "@/app/action";
import { monthLabel } from "@/utils/staticData";

type Props = {};

const Plan = (props: Props) => {
  const [planList, setPlanList] = useState<any>([]);
  const date = new Date();
  const getPackageData = async () => {
    const { resData } = await ApiGet(EndPoint.DASHBOARD_PLAN, { limit: 100 });

    // const res = await axios.get(EndPoint.DASHBOARD_PLAN, {
    //   params: {
    //     limit: 100,
    //   },
    // });
    setPlanList(resData?.results);
  };
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <div className=" w-full bg-bg_gray rounded-[16px] p-[16px] ">
      <p className=" text-left pb-[16px] text-[20px] font-semibold ">
        Plan : {monthLabel(date.getMonth() + 1)} {date.getFullYear()}
      </p>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-[16px]">
        {planList?.map((item: any, index: any) => (
          <PlanCard key={index} planData={item} title="Basic" />
        ))}
      </div>
    </div>
  );
};

export default Plan;
