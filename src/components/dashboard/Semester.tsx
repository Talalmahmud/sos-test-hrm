"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SemesterCard from "./SemesterCard";
import { format } from "date-fns";
import axios from "axios";
import { EndPoint } from "@/utils/api";

type Props = {};

const Semester = (props: Props) => {
  const [semesterSaleList, setSemesterSaleList] = useState<any>(null);

  const getSale = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_SEMESTER_SALE);
    const resData = await res.data;
    setSemesterSaleList(resData);
  };
  const date = new Date();

  useEffect(() => {
    getSale();
  }, []);
  return (
    <div className=" w-full p-[16px] flex flex-col gap-[24px] bg-bg_gray rounded-[16px] shadow-md">
      <div className=" relative flex items-center gap-[8px]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M17.925 11.2251L18 11.125V7.56177L12 9.96177L6 7.56177V11.125L6.075 11.2251C6.13688 11.3076 7.644 13.2501 12 13.2501C16.356 13.2501 17.8631 11.3076 17.925 11.2251ZM23.4375 23.3751H3.1875C2.64049 23.3751 2.11589 23.1578 1.72909 22.7711C1.3423 22.3843 1.125 21.8597 1.125 21.3126C1.125 20.7656 1.3423 20.241 1.72909 19.8542C2.11589 19.4674 2.64049 19.2501 3.1875 19.2501H23.4375C23.5867 19.2501 23.7298 19.1909 23.8352 19.0854C23.9407 18.9799 24 18.8368 24 18.6876C24 18.5385 23.9407 18.3954 23.8352 18.2899C23.7298 18.1844 23.5867 18.1251 23.4375 18.1251H3.1875C2.34212 18.1251 1.53137 18.461 0.933597 19.0587C0.335825 19.6565 0 20.4673 0 21.3126C0 22.158 0.335825 22.9688 0.933597 23.5665C1.53137 24.1643 2.34212 24.5001 3.1875 24.5001H23.4375C23.5867 24.5001 23.7298 24.4409 23.8352 24.3354C23.9407 24.2299 24 24.0868 24 23.9376C24 23.7885 23.9407 23.6454 23.8352 23.5399C23.7298 23.4344 23.5867 23.3751 23.4375 23.3751Z"
              fill="black"
            />
            <path
              d="M1.875 21.3125C1.875 21.4849 1.90895 21.6555 1.97491 21.8148C2.04087 21.974 2.13755 22.1187 2.25942 22.2406C2.3813 22.3625 2.52599 22.4591 2.68523 22.5251C2.84447 22.5911 3.01514 22.625 3.1875 22.625H23.4375V20H3.1875C2.8394 20 2.50556 20.1383 2.25942 20.3844C2.01328 20.6306 1.875 20.9644 1.875 21.3125Z"
              fill="black"
            />
            <path
              d="M19.875 10.4375C20.3928 10.4375 20.8125 10.0178 20.8125 9.5C20.8125 8.98223 20.3928 8.5625 19.875 8.5625C19.3572 8.5625 18.9375 8.98223 18.9375 9.5C18.9375 10.0178 19.3572 10.4375 19.875 10.4375Z"
              fill="black"
            />
            <path
              d="M18.2454 6.65569L11.8662 4.22569L12.1332 3.52444L19.2732 6.24469L22.3842 5.00007L11.9997 0.846191L1.61523 5.00007L11.9997 9.15394L18.2454 6.65569ZM19.4997 7.13382V7.85794C19.7461 7.79755 20.0034 7.79755 20.2497 7.85794V6.61669L19.2732 6.24469L18.2454 6.65569L19.4997 7.13382ZM3.37473 14.7501C3.37473 14.949 3.45375 15.1397 3.5944 15.2804C3.73506 15.421 3.92582 15.5001 4.12473 15.5001H17.8647L18.1145 14.0001H4.12473C3.92582 14.0001 3.73506 14.0791 3.5944 14.2197C3.45375 14.3604 3.37473 14.5512 3.37473 14.7501ZM20.9997 14.7501L20.3911 11.0983C20.0572 11.2174 19.6923 11.2174 19.3584 11.0983L18.7497 14.7501H20.9997Z"
              fill="black"
            />
            <path
              d="M4.125 17.375H20.4375C20.5867 17.375 20.7298 17.3157 20.8352 17.2102C20.9407 17.1048 21 16.9617 21 16.8125C21 16.6633 20.9407 16.5202 20.8352 16.4148C20.7298 16.3093 20.5867 16.25 20.4375 16.25H4.125C3.72718 16.25 3.34564 16.092 3.06434 15.8107C2.78304 15.5294 2.625 15.1478 2.625 14.75C2.625 14.3522 2.78304 13.9706 3.06434 13.6893C3.34564 13.408 3.72718 13.25 4.125 13.25H7.755C7.07786 12.9827 6.45107 12.6023 5.90138 12.125H4.125C3.42881 12.125 2.76113 12.4016 2.26884 12.8938C1.77656 13.3861 1.5 14.0538 1.5 14.75C1.5 15.4462 1.77656 16.1139 2.26884 16.6062C2.76113 17.0984 3.42881 17.375 4.125 17.375ZM18.4275 12.125H18.099C17.5492 12.6023 16.9223 12.9828 16.245 13.25H18.24L18.4275 12.125Z"
              fill="black"
            />
          </svg>
        </div>

        <p className=" text-[20px] font-semibold">
          Semester : {format(date, "MMMM  yyyy")}
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[8px]">
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.first_semester}
          currentSale={semesterSaleList?.current_month?.first_semester}
          prevEnroll={semesterSaleList?.previous_month?.first_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.first_semester_student
          }
          title="1st Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.second_semester}
          currentSale={semesterSaleList?.current_month?.second_semester}
          prevEnroll={semesterSaleList?.previous_month?.second_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.second_semester_student
          }
          title="2nd Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.third_semester}
          currentSale={semesterSaleList?.current_month?.third_semester}
          prevEnroll={semesterSaleList?.previous_month?.third_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.third_semester_student
          }
          title="3rd Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.fourth_semester}
          currentSale={semesterSaleList?.current_month?.fourth_semester}
          prevEnroll={semesterSaleList?.previous_month?.fourth_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.fourth_semester_student
          }
          title="4th Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.fifth_semester}
          currentSale={semesterSaleList?.current_month?.fifth_semester}
          prevEnroll={semesterSaleList?.previous_month?.fifth_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.fifth_semester_student
          }
          title="5th Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.sixth_semester}
          currentSale={semesterSaleList?.current_month?.sixth_semester}
          prevEnroll={semesterSaleList?.previous_month?.sixth_semester_student}
          currentEnroll={
            semesterSaleList?.current_month?.sixth_semester_student
          }
          title="6th Semester"
        />
        <SemesterCard
          prevSale={semesterSaleList?.previous_month?.seventh_semester}
          currentSale={semesterSaleList?.current_month?.seventh_semester}
          prevEnroll={
            semesterSaleList?.previous_month?.seventh_semester_student
          }
          currentEnroll={
            semesterSaleList?.current_month?.seventh_semester_student
          }
          title="7th Semester"
        />
      </div>
    </div>
  );
};

export default Semester;
