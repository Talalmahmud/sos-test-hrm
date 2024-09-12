"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DepartmentCard from "../dashboard/DepartmentCard";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { CircularProgress } from "@mui/material";

type Props = {
  selectCategory: any;
};

const Department = ({ selectCategory }: Props) => {
  const [departmentSaleList, setDepartmentSaleList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const getSalesListDepartment = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(EndPoint.DASHBOARD_DEPARTMENT_MONTHLY_SALE, {
        params: {
          category_id: selectCategory,
          limit: 12,
          offset: (pageNo - 1) * 12,
        },
      });
      const resData = await res.data;

      if (pageNo === 1) {
        // If it's the first page, replace the existing data
        setDepartmentSaleList(resData?.results);
      } else {
        // Otherwise, append the new data to the existing list
        setDepartmentSaleList((prev: any) => {
          const combinedData = [...prev, ...resData?.results];
          const uniqueData = Array.from(
            new Set(combinedData.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));
          return uniqueData;
        });
      }
      setTotal(resData?.count);
    } catch (error) {
      console.error("Failed to fetch department sales list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset page number and department sale list when category changes
    setPageNo(1);
    setDepartmentSaleList([]);
  }, [selectCategory]);

  useEffect(() => {
    getSalesListDepartment();
  }, [selectCategory, pageNo]);

  return (
    <div className="min-w-full bg-[#F4F5F9] p-[24px] flex flex-col gap-[24px] rounded-[16px]">
      <div className="w-full relative flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <Image
            src={"/icons/sale_title.svg"}
            height={23}
            width={21}
            alt="img"
          />
          <p className="text-[20px] font-semibold">Department</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {departmentSaleList?.map((item: any, index: any) => (
          <DepartmentCard
            saleDetails={item}
            title={item?.department_name}
            key={index}
          />
        ))}
      </div>

      {total > departmentSaleList?.length && (
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={() => setPageNo((prev) => prev + 1)}
            className="flex justify-center cursor-pointer items-center h-[51px] w-[145px] rounded-[8px] border-orange border-[1px] text-16 text-orange hover:bg-orange hover:text-white"
          >
            {isLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "View More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Department;
