"use client";
import React, { useContext, useEffect, useState } from "react";
import CurrentDateCard from "./CurrentDateCard";
import CurrentDateCard2 from "./CurrentDateCred2";
import { getDay, getMonth } from "date-fns";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { dayLabel, monthLabel } from "@/utils/staticData";
import { AuthContext } from "../ContextProvider";

type Props = {};

const CurrentDate = (props: Props) => {
  const { user } = useContext(AuthContext);
  const data = new Date();
  const [earnData, setEarnDat] = useState<any>("");
  const [overall, setOverAll] = useState<any>("");

  const getOverallEarn = async () => {
    if (user) {
      const res = await axios.get(EndPoint.OVERALL_STATESTICS, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      const resData = await res.data;
      setOverAll(resData);
    }
  };
  const getEarn = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_CURRENT_SALE);
    const resData = await res.data;
    setEarnDat(resData);
  };
  useEffect(() => {
    getOverallEarn();
  }, [user]);
  useEffect(() => {
    getEarn();
  }, []);
  return (
    <>
      <div className=" w-full  flex flex-col gap-[16px] shadow-md border-[1px] border-gray_light rounded-[16px] items-center py-[16px] px-4 ">
        <p className=" text-[20px] text-left font-semibold w-full min-h-[30px] ">
          {/* 25 Mar, Monday, 2024 */}
          {` ${data.getDate()} ${monthLabel(getMonth(data) + 1)}, ${dayLabel(
            getDay(data) + 1
          )}, ${data.getFullYear()} `}

          {/* {format(data, "yyyy dd, MMM")} */}
        </p>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
          <CurrentDateCard
            title="Total Earn"
            prevSale={earnData?.previous_day?.paid_earning}
            currentSale={earnData?.current_day?.paid_earning}
          />
          <CurrentDateCard
            title="Student"
            prevSale={earnData?.previous_day?.total_students}
            currentSale={earnData?.current_day?.total_students}
          />

          <CurrentDateCard2
            data1={earnData?.current_day?.pending_students}
            data2={earnData?.current_day?.due_pending_students}
          />
          {/* <CurrentDateCard2 />
          <CurrentDateCard2 /> */}
          <div className=" p-4 flex flex-col gap-1 bg-bg_gray rounded-[16px] border-l-[4px] border-orange">
            <p className=" text-[16px] md:text-[20px] font-semibold ">
              <span className=" text-title"> Softmax </span>Refard View
            </p>
            <p className=" text-[14px] font-medium">
              Total Earning:<span> {overall?.total_refard_earn}</span>
              <span className=" text-orange"> Tk.</span>
            </p>
            <p className=" text-[14px] font-medium">
              Total Enrolled:<span> {overall?.total_refard_students}</span>
            </p>

            {/* <p className=" text-[14px] font-medium">Total Student</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentDate;
