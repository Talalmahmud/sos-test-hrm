"use client";
import Category from "@/components/dashboard/Category";
import CurrentDate from "@/components/dashboard/CurrentDate";
import Package from "@/components/dashboard/Package";
import Plan from "@/components/dashboard/Plan";
import Semester from "@/components/dashboard/Semester";
import Statistics from "@/components/dashboard/Statistics";
import Target from "@/components/dashboard/Target";
import { BarChart } from "@mui/x-charts";

import React, { useContext, useEffect, useState } from "react";
import NavMenu from "../../../../components/navbar/NavMenu";
import CustomizedTables from "@/components/user/CustomizedTables";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoadingProgressBar from "@/components/LoadingProgressBar";
import { getSession } from "@/utils/commonfunction";
import { AuthContext } from "@/components/ContextProvider";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import CustomBarChart from "@/components/CustomBarChart";
import {
  getCurrentMonthLabel,
  getCurrentYearLabel,
  monthLabel,
  monthList,
  yearList,
} from "@/utils/staticData";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import ReactSelect from "react-select";
import CustomEnrollmentChart from "@/components/CustomEnrollmentChart";
import { roleList } from "../../../../utils/staticData";
import { useRouter } from "next/navigation";
import Category2 from "@/components/dashboard/Category2";

type Props = {};
interface TransformedData {
  month: string;
  enrollments: number;
  total_earning: number;
}

const Page = (props: Props) => {
  // const { data } = useSession();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [month, setMonth] = useState<any>(getCurrentMonthLabel());
  const [month2, setMonth2] = useState<any>(getCurrentYearLabel());
  const [year, setYear] = useState<any>(getCurrentYearLabel());
  const [dailyEnrollment, setDailyEnrollment] = useState<any>([]);

  const [monthlyEnrollment, setMonthlyEnrollment] = useState<any>([]);

  const [dailyIncome, setDailyIncome] = useState<any>([]);

  const [monthlyIncome, setMonthlyIncome] = useState<any>([]);

  const getDailyEnrollData = async () => {
    if (user) {
      const urlParms =
        user?.role === 0
          ? `?month=${month?.value}&year=${year?.value}`
          : `?month=${month?.value}&year=${year?.value}&user_id=${user?.id}`;
      const res = await axios.get(EndPoint.ENROLLMENT_DAILY_CHART_2 + urlParms);
      const resData = await res.data;

      const transformedData = resData?.map((item: any) => ({
        day: item.day,
        income: item.total_earning,
      }));

      const transformedEnrollData = resData?.map((item: any) => ({
        day: item.day,
        enroll: item.enrollments,
      }));
      setDailyEnrollment(transformedEnrollData);
      // console.log("t", transformedData);
      setDailyIncome(transformedData);
    }
  };

  const getMonthlyEnrollData = async () => {
    if (user) {
      const urlParms =
        user?.role === 0
          ? `?year=${month2?.value}`
          : `?year=${month2?.value}&user_id=${user?.id}`;
      const res = await axios.get(
        EndPoint.ENROLLMENT_MONTHLY_CHART_2 + urlParms
      );
      const resData = await res.data;
      const transformedData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        income: item.total_earning,
      }));
      const transformedEnrollData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        enroll: item.enrollments,
      }));
      setMonthlyEnrollment(transformedEnrollData);
      setMonthlyIncome(transformedData);
    }
  };
  // useEffect(() => {
  //   user?.role === 0
  //     ? router.push("/management/dashboard/admin")
  //     : router.push("/management/dashboard/employee");
  // }, [user]);
  useEffect(() => {
    getDailyEnrollData();
  }, [month, year, user]);

  useEffect(() => {
    getMonthlyEnrollData();
  }, [month2, user]);

  return (
    <div className=" w-full ">
      {user?.role === 0 && (
        <div className=" w-full">
          <div className=" flex flex-col lg:flex-row gap-[24px] py-[24px]">
            <div className=" w-full flex flex-col gap-[24px] ">
              <div className=" flex flex-col gap-1">
                <CurrentDate />
              </div>
              <Target />
              <div className=" w-full">
                <Category2 />
              </div>

              {/* <Statistics /> */}
            </div>
          </div>

          <div className=" w-full">
            <Package />
          </div>

          <div>{/* <DashboardChart /> */}</div>
          {/* <div className=" py-[24px] flex flex-col lg:flex-row gap-[16px] lg:gap-[24px]">
            <div>
              <Category />
            </div>
            <div className=" w-full">
              <Package />
            </div>
          </div> */}
          <div className=" w-full mt-4">
            <Plan />
          </div>
          <div className=" w-full my-4">
            <Semester />
          </div>
          {/* <div>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "A",
                    "B",
                    "C",
                    "d",
                    "e",
                    "f",
                    "g",
                    "h",
                    "i",
                    "j",
                    "k",
                    "l",
                  ],
                },
              ]}
              series={[{ data: [4, 3, 5, 7, 9, 8, 10, 15, 9, 8, 10, 15] }]}
              width={400}
              height={300}
            />
          </div> */}
          {/* <div className=" mx-2">
            
            <CustomBarChart />
          </div> */}
        </div>
      )}
      {user?.role !== 0 && <EmployeeDashboard />}

      <div className=" w-full flex flex-col gap-4  py-4">
        <div className=" bg-gray_light rounded-[8px] flex flex-col gap-2">
          <div className=" flex gap-2 justify-end">
            <div className=" flex items-center">
              <p>Month:</p>
              <ReactSelect
                value={month}
                onChange={(e) => setMonth(e)}
                isClearable
                options={monthList}
              />
            </div>
            <div className=" flex items-center">
              <p>Year:</p>
              <ReactSelect
                value={year}
                onChange={(e) => setYear(e)}
                isClearable
                options={yearList}
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
            <CustomBarChart title="Daily Income" dataset={dailyIncome} />
            <CustomEnrollmentChart
              title="Daily Enrollments"
              dataset={dailyEnrollment}
            />
          </div>
        </div>

        <div className=" bg-gray_light rounded-[8px] flex flex-col gap-2">
          <div className=" flex justify-end">
            <div className=" flex items-center">
              <p>Year:</p>
              <ReactSelect
                value={month2}
                onChange={(e) => setMonth2(e)}
                isClearable
                options={yearList}
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
            <CustomBarChart title="Monthly Income" dataset={monthlyIncome} />

            <CustomEnrollmentChart
              title="Monthly Enrollments"
              dataset={monthlyEnrollment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
