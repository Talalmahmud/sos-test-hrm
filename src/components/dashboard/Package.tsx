"use client";
import React, { useContext, useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { AuthContext } from "../ContextProvider";
import { ApiGet } from "@/app/action";
import { monthLabel } from "@/utils/staticData";

type Props = {};

const Package = (props: Props) => {
  const [packageList, setPackageList] = useState<any>([]);
  const { user } = useContext(AuthContext);
  const { globalToggle } = useContext(AuthContext);
  const date = new Date();

  const getPackageData = async () => {
    if (user?.role === 0) {
      const { resData } = await ApiGet(EndPoint.DASHBOARD_PACKAGE, {
        limit: 100,
      });
      setPackageList(resData?.results);
    }
  };
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <div className=" w-full p-[16px] bg-[#F6F7F8] rounded-[16px] border-[1px] border-bg_orange">
      <div className=" flex items-center gap-[4px] mb-[24px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.9844 14.1562C16.2707 14.1562 14.0625 16.3645 14.0625 19.0781C14.0625 21.7918 16.2707 24 18.9844 24C21.698 24 24 21.7918 24 19.0781C24 16.3645 21.698 14.1562 18.9844 14.1562ZM20.3906 19.7812H18.9844C18.5957 19.7812 18.2812 19.4668 18.2812 19.0781V17.6719C18.2812 17.2832 18.5957 16.9688 18.9844 16.9688C19.373 16.9688 19.6875 17.2832 19.6875 17.6719V18.375H20.3906C20.7793 18.375 21.0938 18.6895 21.0938 19.0781C21.0938 19.4668 20.7793 19.7812 20.3906 19.7812ZM2.8125 17.6719H1.40625C0.629578 17.6719 0 18.3015 0 19.0781C0 19.8547 0.629578 20.4844 1.40625 20.4844H2.8125C3.58917 20.4844 4.21875 19.8547 4.21875 19.0781C4.21875 18.3015 3.58917 17.6719 2.8125 17.6719ZM2.8125 10.6406H1.40625C0.629578 10.6406 0 11.2702 0 12.0469C0 12.8235 0.629578 13.4531 1.40625 13.4531H2.8125C3.58917 13.4531 4.21875 12.8235 4.21875 12.0469C4.21875 11.2702 3.58917 10.6406 2.8125 10.6406ZM2.8125 3.51562H1.40625C0.629578 3.51562 0 4.1452 0 4.92188C0 5.69845 0.629578 6.32812 1.40625 6.32812H2.8125C3.58917 6.32812 4.21875 5.69845 4.21875 4.92188C4.21875 4.1452 3.58917 3.51562 2.8125 3.51562Z"
            fill="black"
          />
          <path
            d="M20.3906 0H4.92188C3.75872 0 2.8125 0.946219 2.8125 2.10938C4.36364 2.10938 5.625 3.37073 5.625 4.92188C5.625 6.47302 4.36364 7.73438 2.8125 7.73438V9.23438C4.36364 9.23438 5.625 10.4957 5.625 12.0469C5.625 13.598 4.36364 14.8594 2.8125 14.8594V16.2656C4.36364 16.2656 5.625 17.527 5.625 19.0781C5.625 20.6293 4.36364 21.8906 2.8125 21.8906C2.8125 23.0538 3.75872 24 4.92188 24H15.056C13.6053 22.8394 12.6562 21.0763 12.6562 19.0781C12.6562 15.5886 15.4949 12.75 18.9844 12.75C20.2848 12.75 21.5873 13.146 22.5938 13.8212V2.10938C22.5938 0.946219 21.5538 0 20.3906 0ZM12.4503 15.3565L9.63773 18.169C9.50039 18.3063 9.32048 18.375 9.14062 18.375C8.96077 18.375 8.78081 18.3063 8.64352 18.169L7.0395 16.565C6.76486 16.2903 6.76486 15.8453 7.0395 15.5707C7.31414 15.2961 7.75912 15.2961 8.03377 15.5707L9.14062 16.6776L11.456 14.3622C11.7307 14.0876 12.1756 14.0876 12.4503 14.3622C12.7249 14.6369 12.7249 15.0818 12.4503 15.3565ZM12.4503 9.73148L9.63778 12.544C9.50044 12.6813 9.32053 12.75 9.14067 12.75C8.96081 12.75 8.78086 12.6813 8.64356 12.544L7.03955 10.94C6.76481 10.6653 6.76481 10.2204 7.0395 9.94575C7.31414 9.67111 7.75912 9.67111 8.03377 9.94575L9.14062 11.0526L11.456 8.73722C11.7307 8.46258 12.1756 8.46258 12.4503 8.73722C12.7249 9.01186 12.7249 9.45684 12.4503 9.73148ZM12.4503 4.01273L9.63778 6.82523C9.50044 6.96258 9.32053 7.03125 9.14067 7.03125C8.96081 7.03125 8.78086 6.96258 8.64356 6.82523L7.03955 5.22122C6.76481 4.94658 6.76481 4.50164 7.0395 4.227C7.31414 3.95236 7.75912 3.95236 8.03377 4.227L9.14062 5.33386L11.456 3.01847C11.7307 2.74383 12.1756 2.74383 12.4503 3.01847C12.7249 3.29311 12.7249 3.73809 12.4503 4.01273ZM18.9844 11.3438H14.7656C14.377 11.3438 14.0625 11.0293 14.0625 10.6406C14.0625 10.252 14.377 9.9375 14.7656 9.9375H18.9844C19.373 9.9375 19.6875 10.252 19.6875 10.6406C19.6875 11.0293 19.373 11.3438 18.9844 11.3438ZM18.9844 5.625H14.7656C14.377 5.625 14.0625 5.31052 14.0625 4.92188C14.0625 4.53323 14.377 4.21875 14.7656 4.21875H18.9844C19.373 4.21875 19.6875 4.53323 19.6875 4.92188C19.6875 5.31052 19.373 5.625 18.9844 5.625Z"
            fill="black"
          />
        </svg>
        <p className=" text-[16px] xl:text-[20px] font-semibold ">
          Package : {monthLabel(date.getMonth() + 1)} {date.getFullYear()}
        </p>
      </div>
      <div
        className={` grid ${
          globalToggle
            ? " grid-cols-1 lg:grid-cols-4"
            : " grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
        } gap-[16px]`}
      >
        {packageList?.map((item: any, index: any) => (
          <PackageCard key={index} title="Bronze" packageData={item} />
        ))}
      </div>
    </div>
  );
};

export default Package;
