"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import AnalyticsCard from "./AnalyticsCard";
import { CircularProgress } from "@mui/material";
type Props = {};

const InstituteAnalytics = (props: Props) => {
  const [institiuteAnalyticsList, setInstituteAnlyticsList] = useState<any>([]);

  const [institiuteUnfilterAnalyticsList, setInstituteUnfilterAnlyticsList] =
    useState<any>([]);
  const [institute, setInstitute] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getInstituteAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(EndPoint.DASHBOARD_INSTITUTE_ANALYTICS, {
        params: {
          limit: 12,
          offset: (pageNo - 1) * 12,
        },
      });

      const resData = res.data;
      const combinedData = [...institiuteAnalyticsList, ...resData?.results];
      // Use a Set to ensure unique entries
      const uniqueData = Array.from(
        new Set(combinedData.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));

      setInstituteAnlyticsList(uniqueData);
      setInstituteUnfilterAnlyticsList(uniqueData);
      setTotal(resData?.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const searchInstitut = useCallback(async () => {
    if (institute === "") {
      setInstituteAnlyticsList(institiuteUnfilterAnalyticsList);
    } else {
      const filterData = institiuteAnalyticsList?.filter((item: any) =>
        item?.polytechnic_name
          ?.toLowerCase()
          .startsWith(institute?.toLowerCase())
      );
      setInstituteAnlyticsList(filterData);
    }
  }, [institute]);

  useEffect(() => {
    searchInstitut();
  }, [institute]);
  useEffect(() => {
    getInstituteAnalytics();
  }, [pageNo]);
  return (
    <>
      <input
        value={institute}
        onChange={(e) => setInstitute(e.target.value)}
        className=" text-[14px] rounded-[8px] px-[8px] py-[4px] placeholder:text-black border-[1px] border-gray_light "
        type="text"
        placeholder="Search by polytechnic"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
        {institiuteAnalyticsList?.map((item: any) => (
          <AnalyticsCard title={item?.polytechnic_name} itemDetails={item} />
        ))}
      </div>

      {total > institiuteAnalyticsList?.length && (
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

export default InstituteAnalytics;
