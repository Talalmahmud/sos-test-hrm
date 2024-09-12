import { EndPoint } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MonthlyInstituteCard from "../dashboard/MonthlyInstituteCard";
import { CircularProgress } from "@mui/material";

type Props = { selectCategory: any };

const InstituteSale = ({ selectCategory }: Props) => {
  const [instituteSale, setInstituteSale] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const getSales = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(EndPoint.DASHBOARD_INSTITUTE_MONTHLY_SALE, {
        params: {
          category_id: selectCategory,
          limit: 12,
          offset: (pageNo - 1) * 12,
        },
      });
      const resData = await res.data;

      if (pageNo === 1) {
        // If it's the first page, replace the existing data
        setInstituteSale(resData?.results);
      } else {
        // Otherwise, append the new data to the existing list
        setInstituteSale((prev: any) => {
          const combinedData = [...prev, ...resData?.results];
          const uniqueData = Array.from(
            new Set(combinedData.map((item) => JSON.stringify(item)))
          ).map((item) => JSON.parse(item));
          return uniqueData;
        });
      }
      setTotal(resData?.count);
    } catch (error) {
      console.error("Failed to fetch institute sales:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset page number and institute sale list when category changes
    setPageNo(1);
    setInstituteSale([]);
  }, [selectCategory]);

  useEffect(() => {
    getSales();
  }, [selectCategory, pageNo]);

  return (
    <div className="p-6 bg-[#F4F5F9] rounded-[16px] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Image src={"/icons/sale_title.svg"} height={23} width={21} alt="img" />
        <p className="font-semibold text-[20px] py-[8px]">Institute</p>
      </div>
      <div className="grid grid-cols-3 gap-[16px]">
        {instituteSale?.map((item: any, index: number) => (
          <MonthlyInstituteCard
            key={index}
            title={item?.polytechnic_name}
            saleDetails={item}
          />
        ))}
      </div>
      {total > instituteSale?.length && (
        <div className="flex justify-center items-center mt-2">
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
    </div>
  );
};

export default InstituteSale;
