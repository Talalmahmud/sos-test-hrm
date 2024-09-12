import React, { useEffect, useState } from "react";
import MarketerCard from "./MarketerCard";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { CircularProgress } from "@mui/material";

type Props = { selectCategory: any };

const DailySale = ({ selectCategory }: Props) => {
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const getDailySalesListUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(EndPoint.DASHBOARD_SALES_USER_DAILY, {
        params: {
          category_id: selectCategory,
          limit: 12,
          offset: (pageNo - 1) * 12,
        },
      });
      const resData = res?.data;

      if (pageNo === 1) {
        // Replace the data if it's the first page
        setEmployeeList(resData?.results);
      } else {
        // Append new data to the existing list
        setEmployeeList((prev: any) => {
          const combinedData = [...prev, ...resData?.results];
          const uniqueData = Array.from(
            new Set(combinedData.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));
          return uniqueData;
        });
      }
      setTotal(resData?.count);
    } catch (error) {
      console.error("Failed to fetch daily sales list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset page number and employee list when category changes
    setPageNo(1);
    setEmployeeList([]);
  }, [selectCategory]);

  useEffect(() => {
    getDailySalesListUser();
  }, [selectCategory, pageNo]);

  return (
    <div>
      <div className="w-full bg-bg_gray rounded-[16px] p-[24px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
        {employeeList?.map((item: any, index: number) => (
          <MarketerCard isDaily={true} saleDetails={item} key={index} />
        ))}
      </div>
      {total > employeeList?.length && (
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

export default DailySale;
