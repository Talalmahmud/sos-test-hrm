"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import AnalyticsCard from "./AnalyticsCard";
import { CircularProgress } from "@mui/material";
type Props = {};

const DepartmentAnalytics = (props: Props) => {
  const [departmentAnalyticsList, setDepartmentAnlyticsList] = useState<any>(
    []
  );
  const [departmentUnFilterAnalyticsList, setDepartmentUnFilterAnlyticsList] =
    useState<any>([]);
  const [department, setDepartment] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getDepartmentAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(EndPoint.DASHBOARD_DEPARTMENT_ANALYTICS, {
        params: {
          limit: 12,
          offset: (pageNo - 1) * 12,
        },
      });
      const resData = res.data;
      const combinedData = [...departmentAnalyticsList, ...resData?.results];

      // Use a Set to ensure unique entries
      const uniqueData = Array.from(
        new Set(combinedData.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));

      setDepartmentAnlyticsList(uniqueData); // Spread the results
      setDepartmentUnFilterAnlyticsList(uniqueData);
      setTotal(resData?.count);
    } catch (error) {
      console.error("Failed to fetch department analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchDepartment = useCallback(async () => {
    if (department === "") {
      setDepartmentAnlyticsList(departmentUnFilterAnalyticsList);
    } else {
      const filterData = departmentAnalyticsList?.filter((item: any) =>
        item?.full_name?.toLowerCase().startsWith(department?.toLowerCase())
      );
      setDepartmentAnlyticsList(filterData);
    }
  }, [department]);

  useEffect(() => {
    searchDepartment();
  }, [department]);

  useEffect(() => {
    getDepartmentAnalytics();
  }, [pageNo]);
  return (
    <>
      <input
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className=" text-[18px] rounded-[8px] px-[8px] py-[4px] placeholder:text-black border-[1px] border-gray_light "
        type="text"
        placeholder="Search by department"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
        {departmentAnalyticsList?.map((item: any) => (
          <AnalyticsCard title={item?.full_name} itemDetails={item} />
        ))}
      </div>

      {total > departmentAnalyticsList?.length && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setPageNo((prev) => prev + 1)}
            className="flex justify-center cursor-pointer items-center h-[51px] w-[145px] rounded-[8px] border-orange border-[1px] text-16 text-orange hover:bg-orange hover:text-white"
          >
            {isLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              " View More"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default DepartmentAnalytics;
