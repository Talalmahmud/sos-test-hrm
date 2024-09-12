"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import YearlyInstituteCard from "../dashboard/YearlyInstituteCard";
import { CircularProgress } from "@mui/material";

type Props = {};

const JobAnalytics = (props: Props) => {
  const [jobsessionSaleList, setJobSessionSaleList] = useState<any>([]);

  const getJobSales = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_JOB_ANALYTICS_YEARLY, {
      params: {
        limit: 2000,
      },
    });
    const resData = await res.data;
    setJobSessionSaleList(resData?.results);
  };

  useEffect(() => {
    getJobSales();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
        {jobsessionSaleList?.map((item: any) => (
          <YearlyInstituteCard title={item?.session_year} saleDetails={item} />
        ))}
      </div>
    </>
  );
};

export default JobAnalytics;
