"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import SemesterCard from "./SemesterCard";
type Props = {};

const SessionAnalytics = (props: Props) => {
  const [sessionAnalyticsList, setSessionAnlyticsList] = useState<any>([]);

  const getSessionAnalytics = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_SESSION_ANALYTICS, {
      params: { limit: 100 },
    });
    const resData = await res.data;

    setSessionAnlyticsList(resData?.results);
  };
  useEffect(() => {
    getSessionAnalytics();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
        {sessionAnalyticsList?.map((item: any) => (
          <SemesterCard title={item?.session_year} itemDetails={item} />
        ))}
      </div>
    </>
  );
};

export default SessionAnalytics;
