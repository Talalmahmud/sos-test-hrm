"use client";
import { ApiGet } from "@/app/action";
import { EndPoint } from "@/utils/api";
import { monthLabel, profitCalculation } from "@/utils/staticData";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { AuthContext } from "../ContextProvider";
import PlanCard from "./PlanCard";
import PackageCard from "./PackageCard";

type Props = {};

const EmployeeDashboard = (props: Props) => {
  const { user, globalToggle } = useContext(AuthContext);

  const currentData = new Date();
  const [planList, setPlanList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);

  const [selectDate, setSelectDate] = useState(new Date());
  const [toogleCalendar, setToggleCalendar] = useState(false);
  const [selectCategory, setSelectCategory] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [saleCategoryList, setSaleCategoryList] = useState<any>([]);
  const [totalPendingFee, setTotalPendingFee] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const date = new Date();
  const [monthRank, setMonthRank] = useState<any>([]);
  const [dailyRank, setDailyRank] = useState<any>([]);

  const [selectedSaleCategoryList, setSelectedSaleCategoryList] = useState<any>(
    []
  );

  const getSaleCategoryData = async () => {
    if (user?.id !== "" && user?.id !== undefined) {
      const res = await axios.get(EndPoint.DASHBOARD_CATEGORY_SALE, {
        params: {
          limits: 100,
          user_id: user?.id,
        },
      });
      const resData = await res.data;
      const earn = resData?.results?.reduce((total: number, category: any) => {
        return total + category?.current_month?.total_payable_fee;
      }, 0);

      const enrollStotent = resData?.results?.reduce(
        (total: number, category: any) => {
          return total + category?.current_month?.total_enrollments;
        },
        0
      );
      const pendingEarn = resData?.results?.reduce(
        (total: number, category: any) => {
          return total + category?.current_month?.total_pending_fee;
        },
        0
      );
      setTotalEarn(earn);
      setTotalStudent(enrollStotent);
      setTotalPendingFee(pendingEarn);
      setSaleCategoryList(resData?.results);
      setSelectedSaleCategoryList(resData?.results[0]);
    }
  };

  const getMonthRank = async () => {
    if (user) {
      const res = await axios.get(EndPoint.DASHBOARD_EMPLOYEE_MONTHLY_RANKING, {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = res.data;
      setMonthRank(resData);
    }
  };
  const getDailyRank = async () => {
    if (user) {
      const res = await axios.get(EndPoint.DASHBOARD_EMPLOYEE_DAILY_RANKING, {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = res.data;

      setDailyRank(resData);
    }
  };

  const getPackageData = async () => {
    if (selectCategory !== "" && user) {
      const res = await axios.get(EndPoint.DASHBOARD_PACKAGE, {
        params: { limit: 100, category_id: selectCategory, user_id: user?.id },
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = res.data;

      setPackageList(resData?.results);
    }
  };

  const getPlanData = async () => {
    if (selectCategory !== "" && user) {
      const res = await axios.get(EndPoint.DASHBOARD_PLAN, {
        params: { limit: 100, category_id: selectCategory, user_id: user?.id },
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = res.data;
      setPlanList(resData.results);
    }

    // const res = await axios.get(EndPoint.DASHBOARD_PLAN, {
    //   params: {
    //     limit: 100,
    //   },
    // });
  };

  const getCategoryData = async () => {
    const { resData } = await ApiGet(EndPoint.GET_CATAGORY, { limits: 20 });
    setSelectCategory(resData?.results[0]?.id);

    setCategoryList(resData?.results);
  };
  const filterData = () => {
    const listFilter = saleCategoryList?.find(
      (item: any) => item?.id === selectCategory
    );

    setSelectedSaleCategoryList(listFilter);
  };

  useEffect(() => {
    getPackageData();
    getPlanData();
  }, [selectCategory, user]);

  useEffect(() => {
    filterData();
  }, [selectCategory]);

  useEffect(() => {
    getCategoryData();
    getSaleCategoryData();
    getDailyRank();
    getMonthRank();
  }, [user]);

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className=" flex flex-col gap-[16px]">
      <div className=" text-[16px] bg-bg_ingo rounded-[16px] p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
        <div
          className=" bg-gray px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <p>Best Record</p>
          <div className="  w-[160px] flex flex-col justify-center items-center gap-1">
            <span>$09494</span>
            <div className=" w-full h-[1px] bg-orange"></div>
            <span>{format(currentData, "MMMM,yyyy")}</span>
          </div>
        </div>
        <div
          className="  bg-gray px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Target Amount</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>

          <p className=" font-semibold">$09494</p>
        </div>
        <div
          className=" bg-gray px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Target Student</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>
          <p className=" font-semibold">20</p>
        </div>
        <div
          className=" bg-gray px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Incentive</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>

          <p className=" font-semibold">$09494</p>
        </div>
        <div
          className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Total Earn</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>

          <p className=" font-semibold">
            {totalEarn} <span className=" text-orange">Tk.</span>
          </p>
        </div>
        <div
          className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Student</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>
          <p className=" font-semibold">{totalStudent}</p>
        </div>
        <div
          className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p className=" ">Pending</p>
            <span>({format(currentData, "MMMM")})</span>
          </div>

          <p className=" font-semibold">
            {totalPendingFee} <span className=" text-orange">Tk.</span>
          </p>
        </div>
        {saleCategoryList?.map((sale: any, index: any) => (
          <div
            key={index}
            className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
          >
            <div>
              <p className=" ">{sale?.category_name}</p>
              <span>({format(currentData, "MMMM")})</span>
            </div>

            <div className=" flex flex-col gap-1">
              <p>({sale?.current_month?.total_enrollments})</p>
              <p className=" font-semibold">
                {sale?.current_month?.total_payable_fee}{" "}
                <span className=" text-orange">Tk.</span>
              </p>
            </div>
          </div>
        ))}

        {/* two colomn section */}
        {/* <div className=" col-span-3 ">
          <div className=" grid grid-cols-2 gap-4">
            <div
              className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
            >
              <div>
                <p className=" ">General Education</p>
                <span>({format(currentData, "MMMM")})</span>
              </div>

              <p className=" font-semibold">$09494</p>
            </div>
            <div
              className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
            >
              <div>
                <p className=" ">Daimond</p>
                <span>({format(currentData, "MMMM")})</span>
              </div>

              <p className=" font-semibold">$09494</p>
            </div>
          </div>
        </div> */}
        {/* <div className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040]">
          <div>
            <p>Holiday</p>
            <p>(Official)</p>
          </div>
          <div className="  w-[160px] flex justify-between items-center gap-1">
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Total</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Due</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Done</span>
            </div>
          </div>
        </div> */}
        {/* <div
          className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p>Holiday</p>
            <p>(Eid)</p>
          </div>
          <div className="  w-[160px] flex justify-between items-center gap-1">
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Total</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Due</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Done</span>
            </div>
          </div>
        </div> */}
        {/* <div
          className=" bg-white px-[8px] py-[16px] flex justify-between items-center rounded-[8px] shadow-md  shadow-[#00000040];
"
        >
          <div>
            <p>Holiday</p>
            <p>(Friday)</p>
          </div>
          <div className="  w-[160px] flex justify-between items-center gap-1">
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Total</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Due</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p>20</p>
              <div className=" w-full h-[1px] bg-orange"></div>
              <span>Done</span>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex items-center divide-gray_light divide-x-[1px] border-b-[1px] border-gray_light shadow-md ">
        {categoryList?.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setSelectCategory(item?.id);
            }}
            className={` ${
              selectCategory === item?.id ? "bg-black text-white" : " bg-white"
            } p-2 text-[14px]`}
          >
            {item?.category_name}
          </button>
        ))}
      </div>

      <div className=" h-auto  bg-green/20 rounded-[16px] p-[24px] flex flex-col gap-[24px] ">
        <div className=" rounded-[16px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
          {/* start */}
          <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
            <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
              <p className=" text-[16px] font-semibold ">
                ৳ {selectedSaleCategoryList?.current_day?.total_payable_fee}
              </p>
              <p className=" text-[13px]">Daily Income</p>
            </div>
            <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
              {Number(
                profitCalculation(
                  selectedSaleCategoryList?.previous_day?.total_payable_fee,
                  selectedSaleCategoryList?.current_day?.total_payable_fee
                )
              ) > 0 ? (
                <Image
                  src={"/icons/success.svg"}
                  height={24}
                  width={28}
                  alt="image"
                />
              ) : (
                <Image
                  src={"/icons/loss.svg"}
                  height={24}
                  width={28}
                  alt="image"
                />
              )}

              <p className=" text-[13px]">
                {Number(
                  profitCalculation(
                    selectedSaleCategoryList?.previous_day?.total_payable_fee,
                    selectedSaleCategoryList?.current_day?.total_payable_fee
                  )
                )}
                %
              </p>
            </div>
          </div>
          <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
            <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
              <p className=" text-[16px] font-semibold ">
                {selectedSaleCategoryList?.current_day?.total_enrollments}
              </p>
              <p className=" text-[13px]">New Student</p>
            </div>
            <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
              {Number(
                profitCalculation(
                  selectedSaleCategoryList?.previous_day?.total_enrollments,
                  selectedSaleCategoryList?.current_day?.total_enrollments
                )
              ) > 0 ? (
                <Image
                  src={"/icons/success.svg"}
                  height={24}
                  width={28}
                  alt="image"
                />
              ) : (
                <Image
                  src={"/icons/loss.svg"}
                  height={24}
                  width={28}
                  alt="image"
                />
              )}
              <p className=" text-[13px]">
                {profitCalculation(
                  selectedSaleCategoryList?.previous_day?.total_enrollments,
                  selectedSaleCategoryList?.current_day?.total_enrollments
                )}
                %
              </p>
            </div>
          </div>
          <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
            <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
              <div className=" flex items-center gap-1">
                <p className=" text-[16px] font-semibold ">
                  ৳ {selectedSaleCategoryList?.current_day?.total_pending_fee}
                </p>
                <p className="text-[16px]">/</p>
                <p className=" text-[16px] font-semibold ">
                  {
                    selectedSaleCategoryList?.current_day
                      ?.total_pending_enrollments
                  }
                </p>
              </div>
              <p className=" text-[13px]">Processing Amount</p>
            </div>
          </div>
          <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
            <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
              <div className=" flex items-center gap-1">
                <p className=" text-[16px] font-semibold ">
                  ৳
                  {selectedSaleCategoryList?.current_day?.total_course_fee -
                    selectedSaleCategoryList?.current_day?.total_payable_fee}
                </p>
                <p className="text-[16px]">/</p>
                <p className=" text-[16px] font-semibold ">
                  {selectedSaleCategoryList?.current_day?.total_due_enrollments}
                </p>
              </div>
              <p className=" text-[13px]">Processing Due Amount</p>
            </div>
          </div>
          {/* <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">12</p>
            <p className=" text-[13px]">Polytechnic</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">Job</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">DUET</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">Dreamer</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div>
        <div className=" h-[98px] bg-white rounded-[16px] flex justify-center items-center gap-[10px] ">
          <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
            <p className=" text-[16px] font-semibold ">10</p>
            <p className=" text-[13px]">ICT</p>
          </div>
          <div className=" w-[109px] flex flex-col items-center justify-center text-[#474D5C] gap-[8px] ">
            <Image
              src={"/icons/success.svg"}
              height={24}
              width={28}
              alt="image"
            />
            <p className=" text-[13px]">-33%</p>
          </div>
        </div> */}
        </div>
      </div>

      <div className=" w-full p-[16px] bg-[#F6F7F8] rounded-[16px] border-[1px] border-bg_orange">
        <div className=" flex items-center justify-center gap-[4px] mb-[24px]">
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
          <p>
            Package : {monthLabel(date.getMonth() + 1)} {date.getFullYear()}
          </p>
        </div>
        <div
          className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]`}
        >
          {packageList?.map((item: any, index: any) => (
            <PackageCard key={index} title="Bronze" packageData={item} />
          ))}
        </div>
      </div>

      <div className=" w-full bg-bg_gray rounded-[16px] p-[16px] ">
        <p className=" flex items-center justify-center pb-[16px] text-[20px] font-semibold ">
          Plan : {monthLabel(date.getMonth() + 1)} {date.getFullYear()}
        </p>

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-[16px]">
          {planList?.map((item: any, index: any) => (
            <PlanCard key={index} planData={item} title="Basic" />
          ))}
        </div>
      </div>

      {/* sales poistion */}
      <div className="bg-[#FBFBFB] shadow-md p-4 rounded-[16px] flex flex-col gap-4">
        <p className=" text-[24px] text-center font-semibold">
          {format(currentData, "dd MMMM, yyyy")}
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-[#FBFBFB] rounded-[16px]">
          {/* start */}
          {dailyRank?.map((item: any, index: number) => (
            <div className=" rounded-[8px] bg-bg_orange px-4 py-2 flex flex-col gap-2 items-center justify-center">
              <div key={index} className="w-full flex justify-between">
                <div className=" flex items-center gap-1">
                  <div className=" relative overflow-auto h-[40px] w-[40px] rounded-full">
                    <Image src={"/assets/im2.jpeg"} fill alt="" />
                  </div>
                  <p>{item?.name}</p>
                </div>
                <div className=" p-2 bg-bg_ingo shadow-md flex justify-center items-center rounded-full">
                  <p className=" font-semibold">
                    {item?.current_day?.position}th
                  </p>
                </div>
              </div>
              <div className="  flex justify-center items-center gap-[10px] ">
                <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
                  <p className=" text-[16px] font-semibold ">
                    ৳ {item?.current_day?.total_earnings}
                  </p>
                </div>
                <div className=" w-[109px] flex  items-center justify-center text-[#474D5C] gap-[8px] ">
                  <Image
                    src={
                      Number(
                        profitCalculation(
                          item?.previous_day?.total_earnings,
                          item?.current_day?.total_earnings
                        )
                      ) > 0
                        ? "/icons/success.svg"
                        : "/icons/loss.svg"
                    }
                    height={20}
                    width={22}
                    alt="image"
                  />
                  <p className=" text-[13px]">
                    {profitCalculation(
                      item?.previous_day?.total_earnings,
                      item?.current_day?.total_earnings
                    )}
                    %
                  </p>
                </div>
              </div>
              <div className=" h-[1px] bg-orange w-full"></div>
              <p className=" text-4 text-center">
                {" "}
                ST-{item?.current_day?.enrollments}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* sale position 2 */}
      <div className="bg-[#FBFBFB] shadow-md p-4 rounded-[16px] flex flex-col gap-4">
        <p className=" text-[24px] text-center font-semibold">
          {format(currentData, "MMMM-yyyy")}
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-[#FBFBFB] rounded-[16px]">
          {monthRank?.map((item: any, index: number) => (
            <div className=" rounded-[8px] bg-bg_orange px-4 py-2 flex flex-col gap-2 items-center justify-center">
              <div key={index} className="w-full flex justify-between">
                <div className=" flex items-center gap-1">
                  <div className=" relative overflow-auto h-[40px] w-[40px] rounded-full">
                    <Image src={"/assets/im2.jpeg"} fill alt="" />
                  </div>
                  <p>{item?.name}</p>
                </div>
                <div className=" p-2 bg-bg_ingo shadow-md flex justify-center items-center rounded-full">
                  <p className=" font-semibold">
                    {item?.current_month?.position}th
                  </p>
                </div>
              </div>
              <div className="  flex justify-center items-center gap-[10px] ">
                <div className=" w-[152px] flex flex-col items-center justify-center text-[#474D5C] ">
                  <p className=" text-[16px] font-semibold ">
                    ৳ {item?.current_month?.total_earnings}
                  </p>
                </div>
                <div className=" w-[109px] flex  items-center justify-center text-[#474D5C] gap-[8px] ">
                  <Image
                    src={
                      Number(
                        profitCalculation(
                          item?.previous_month?.total_earnings,
                          item?.current_month?.total_earnings
                        )
                      ) > 0
                        ? "/icons/success.svg"
                        : "/icons/loss.svg"
                    }
                    height={20}
                    width={22}
                    alt="image"
                  />
                  <p className=" text-[13px]">
                    {profitCalculation(
                      item?.previous_month?.total_earnings,
                      item?.current_month?.total_earnings
                    )}
                    %
                  </p>
                </div>
              </div>
              <div className=" h-[1px] bg-orange w-full"></div>
              <p className=" text-4 text-center">
                {" "}
                ST-{item?.current_month?.enrollments}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
