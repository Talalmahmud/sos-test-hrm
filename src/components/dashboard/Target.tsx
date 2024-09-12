"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import TargetCard from "./TargetCard";
import { monthLabel } from "@/utils/staticData";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { AuthContext } from "../ContextProvider";
import { ApiGet } from "@/app/action";

type Props = {};

const Target = (props: Props) => {
  const [targetData, setTargetData] = useState<any>([]);
  const { globalToggle } = useContext(AuthContext);
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
    <div className=" w-full p-[16px] flex flex-col gap-[24px] bg-bg_gray rounded-[16px] shadow-md">
      <div className=" flex items-center gap-[8px]">
        <p className=" text-[20px] font-semibold">
          Target {monthLabel(date.getMonth() + 1)} {date?.getFullYear()}
        </p>
        <Image src={"/icons/target.svg"} height={24} width={24} alt="img" />
      </div>
      {/* <div
        className={` grid ${
          globalToggle ? "grid-cols-5" : "grid-cols-7"
        }  gap-[8px]`}
      > */}
      <div className="flex flex-col lg:flex-row gap-[8px]">
        {targetData?.map((item: any, index: number) => (
          <div className="flex-1" key={index}>
            <TargetCard
              targetData={item}
              title={item?.category?.label}
              total={item?.target_value}
              present={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Target;