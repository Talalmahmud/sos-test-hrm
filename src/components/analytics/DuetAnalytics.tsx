"use client";
import React, { useEffect, useState } from "react";
import YearlyInstituteCard from "../dashboard/YearlyInstituteCard";
import axios from "axios";
import { EndPoint } from "@/utils/api";

type Props = {};

const DuetAnalytics = (props: Props) => {
  const [duetsessionSaleList, setDuetSessionSaleList] = useState<any>([]);
  const getDuetSales = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_DUET_ANALYTICS_YEARLY, {
      params: {
        limit: 200,
      },
    });
    const resData = await res.data;
    setDuetSessionSaleList(resData?.results);
  };
  useEffect(() => {
    getDuetSales();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
      {duetsessionSaleList?.map((item: any) => (
        <YearlyInstituteCard title={item?.session_year} saleDetails={item} />
      ))}
    </div>
  );
};

export default DuetAnalytics;
