"use client";
import React, { useEffect, useState } from "react";
import CatagoryCard from "./CatagoryCard";
import { monthLabel } from "@/utils/staticData";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { ApiGet } from "@/app/action";

type Props = {};

const Category = (props: Props) => {
  const [categoryList, setCategoryList] = useState<any>([]);
  const date = new Date();

  const getCategoryData = async () => {
    const { resData } = await ApiGet(EndPoint.DASHBOARD_CATEGORY);
    setCategoryList(resData);
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <div className=" p-[16px] w-full lg:w-[318px] border-[1px] border-bg_orange rounded-[16px]">
      <div className=" flex items-center justify-center text-[16px] gap-[8px]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M8.375 2.125V7.375C8.375 7.77282 8.21696 8.15436 7.93566 8.43566C7.65436 8.71696 7.27282 8.875 6.875 8.875H1.625C1.22718 8.875 0.845644 8.71696 0.56434 8.43566C0.283035 8.15436 0.125 7.77282 0.125 7.375V2.125C0.125 1.72718 0.283035 1.34564 0.56434 1.06434C0.845644 0.783035 1.22718 0.625 1.625 0.625H6.875C7.27282 0.625 7.65436 0.783035 7.93566 1.06434C8.21696 1.34564 8.375 1.72718 8.375 2.125ZM17.375 0.625H12.125C11.7272 0.625 11.3456 0.783035 11.0643 1.06434C10.783 1.34564 10.625 1.72718 10.625 2.125V7.375C10.625 7.77282 10.783 8.15436 11.0643 8.43566C11.3456 8.71696 11.7272 8.875 12.125 8.875H17.375C17.7728 8.875 18.1544 8.71696 18.4357 8.43566C18.717 8.15436 18.875 7.77282 18.875 7.375V2.125C18.875 1.72718 18.717 1.34564 18.4357 1.06434C18.1544 0.783035 17.7728 0.625 17.375 0.625ZM6.875 11.125H1.625C1.22718 11.125 0.845644 11.283 0.56434 11.5643C0.283035 11.8456 0.125 12.2272 0.125 12.625V17.875C0.125 18.2728 0.283035 18.6544 0.56434 18.9357C0.845644 19.217 1.22718 19.375 1.625 19.375H6.875C7.27282 19.375 7.65436 19.217 7.93566 18.9357C8.21696 18.6544 8.375 18.2728 8.375 17.875V12.625C8.375 12.2272 8.21696 11.8456 7.93566 11.5643C7.65436 11.283 7.27282 11.125 6.875 11.125ZM14.75 11.125C13.9342 11.125 13.1366 11.3669 12.4583 11.8202C11.7799 12.2734 11.2512 12.9177 10.939 13.6714C10.6268 14.4252 10.5451 15.2546 10.7043 16.0547C10.8634 16.8549 11.2563 17.5899 11.8332 18.1668C12.4101 18.7437 13.1451 19.1366 13.9453 19.2957C14.7454 19.4549 15.5748 19.3732 16.3286 19.061C17.0823 18.7488 17.7266 18.2201 18.1798 17.5417C18.6331 16.8634 18.875 16.0658 18.875 15.25C18.875 14.156 18.4404 13.1068 17.6668 12.3332C16.8932 11.5596 15.844 11.125 14.75 11.125Z"
              fill="#121212"
            />
          </svg>
        </div>
        <p>
          Category : {monthLabel(date.getMonth() + 1)} {date.getFullYear()}
        </p>
      </div>
      <div>
        <div className=" w-full pt-[24px] px-[8px] lg:px-[0px] flex flex-col justify-center gap-[16px] items-center ">
          {categoryList?.map((item: any, index: any) => (
            <CatagoryCard
              cardData={item}
              key={index}
              title={item?.category_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
