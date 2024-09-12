"use client";
import { ApiGet } from "@/app/action";
import InstituteCard from "@/components/dashboard/InstituteCard";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBarChart from "@/components/CustomBarChart";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import SemesterCard from "@/components/analytics/SemesterCard";
import { anlyticsCategoryList, semesterLabel } from "@/utils/staticData";
import Select from "react-select";
import YearlyInstituteCard from "@/components/dashboard/YearlyInstituteCard";
import JobAnalytics from "@/components/analytics/JobAnalytics";
import DuetAnalytics from "@/components/analytics/DuetAnalytics";
import DepartmentAnalytics from "@/components/analytics/DepartmentAnalytics";
import InstituteAnalytics from "@/components/analytics/InstituteAnalytics";
import SessionAnalytics from "@/components/analytics/SessionAnalytics";
import SemesterAnalytics from "@/components/analytics/SemesterAnalytics";

type Props = {};

const page = (props: Props) => {
  const [selectItem, setSelectItem] = useState("Job");

  // const [selectCategory, setSelectCategory] = useState<any>(null);
  // const [categoryList, setCategoryList] = useState<any>([]);

  // const [department, setDepartment] = useState("");
  // const [institute, setInstitute] = useState("");

  // const [sessionList, setSessionList] = useState<any>([]);
  // const [selectedsession, setSelectedSession] = useState<any>("");

  // const [jobsessionSaleList, setJobSessionSaleList] = useState<any>([]);
  // const [duetsessionSaleList, setDuetSessionSaleList] = useState<any>([]);

  // const [semesterAnalyticsList, setSemsterAnlyticsList] = useState<any>([]);
  // const [sessionAnalyticsList, setSessionAnlyticsList] = useState<any>([]);
  // const [departmentAnalyticsList, setDepartmentAnlyticsList] = useState<any>(
  //   []
  // );
  // const [institiuteAnalyticsList, setInstituteAnlyticsList] = useState<any>([]);

  // const getSessionList = async () => {
  //   const res = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
  //   const resData = await res.data.results;
  //   const modifiedList = [...resData, { label: "All", value: "" }];

  //   setSessionList(modifiedList?.reverse());
  //   setSelectedSession({ label: "All", value: "" });
  // };
  // const getCategoryData = async () => {
  //   const { resData } = await ApiGet(EndPoint.GET_CATAGORY, { limits: 200 });
  //   setSelectCategory(resData?.results[0]?.category_name);

  //   setCategoryList(resData?.results);
  // };

  // const getDepartmentAnalytics = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_DEPARTMENT_ANALYTICS, {
  //     params: {
  //       department_name: department,
  //     },
  //   });
  //   const resData = await res.data;
  //   setDepartmentAnlyticsList(resData?.results);
  // };

  // const getSessionAnalytics = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_SESSION_ANALYTICS);
  //   const resData = await res.data;

  //   setSessionAnlyticsList(resData?.results);
  // };

  // const getInstituteAnalytics = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_INSTITUTE_ANALYTICS, {
  //     params: {
  //       polytechnic_name: institute,
  //     },
  //   });
  //   const resData = await res.data;
  //   setInstituteAnlyticsList(resData?.results);
  // };

  // const getSemesterAnalytics = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_SEMESTER_ANALYTICS, {
  //     params: {
  //       session_id: selectedsession?.value,
  //     },
  //   });
  //   const resData = await res.data;
  //   // console.log("t", resData);
  //   setSemsterAnlyticsList(resData);
  // };
  // const getJobSales = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_JOB_ANALYTICS_YEARLY);
  //   const resData = await res.data;
  //   setJobSessionSaleList(resData?.results);
  // };
  // const getDuetSales = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_DUET_ANALYTICS_YEARLY);
  //   const resData = await res.data;
  //   setDuetSessionSaleList(resData?.results);
  // };

  // useEffect(() => {
  //   getSemesterAnalytics();
  // }, [selectedsession]);

  // useEffect(() => {
  //   getInstituteAnalytics();
  // }, [institute]);

  // useEffect(() => {
  //   getDepartmentAnalytics();
  // }, [department]);

  // useEffect(() => {
  //   getSessionAnalytics();
  //   getSessionList();

  //   getJobSales();
  //   getDuetSales();

  //   getCategoryData();
  // }, []);
  return (
    <div className=" flex flex-col gap-4 ">
      <div className="  flex bg-green/40  h-[40px] shadow-md overflow-auto no-scrollbar">
        {anlyticsCategoryList?.map((item: any, index: any) => (
          <button
            key={index}
            onClick={() => setSelectItem(item)}
            className={` flex-1 px-4 ${
              item === selectItem ? "bg-orange text-white" : ""
            } hover:bg-border_orange hover:text-white active:bg-orange active:text-white `}
          >
            {item}
          </button>
        ))}
      </div>
      {selectItem === anlyticsCategoryList[0] && <JobAnalytics />}
      {selectItem === anlyticsCategoryList[1] && <DuetAnalytics />}
      {selectItem === anlyticsCategoryList[2] && <DepartmentAnalytics />}
      {selectItem === anlyticsCategoryList[3] && <InstituteAnalytics />}
      {selectItem === anlyticsCategoryList[4] && <SessionAnalytics />}
      {selectItem === anlyticsCategoryList[5] && <SemesterAnalytics />}
      {/* <div className="flex items-center divide-gray_light divide-x-[1px] border-b-[1px] border-gray_light shadow-md ">
        {categoryList?.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setSelectCategory(item?.category_name);
            }}
            className={` ${
              selectCategory === item?.category_name
                ? "bg-black text-white"
                : " bg-white"
            } p-2 text-[14px]`}
          >
            {item?.category_name}
          </button>
        ))}
      </div> */}
      {/* <p className=" bg-light_red font-bold text-[24px] underline py-[8px]">
        JOB statistics:
      </p>
      <div className="grid grid-cols-3 gap-[16px]">
        {jobsessionSaleList?.map((item: any) => (
          <YearlyInstituteCard title={item?.session_year} saleDetails={item} />
        ))}
      </div> */}
      {/* <p className=" bg-light_red font-bold text-[24px] underline py-[8px]">
        DUET statistics:
      </p>
      <div className="grid grid-cols-3 gap-[16px]">
        {duetsessionSaleList?.map((item: any) => (
          <YearlyInstituteCard title={item?.session_year} saleDetails={item} />
        ))}
      </div> */}
      {/* <div className=" px-2 flex justify-between items-center bg-light_red  py-[8px]">
        <p className="font-bold text-[24px] underline"> Semester Analytics:</p>
        <div className="">
          <Select
            className=" text-[14px]"
            value={selectedsession}
            isClearable
            onChange={(e) => setSelectedSession(e)}
            maxMenuHeight={100}
            options={sessionList}
            placeholder="Select session.."
          />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-[16px]">
        {semesterAnalyticsList?.map((item: any) => (
          <SemesterCard
            title={semesterLabel(item?.semester) + " Semester"}
            itemDetails={item}
          />
        ))}
      </div> */}
      {/* <div className=" px-2 flex justify-between items-center bg-light_red  py-[8px]">
        <p className="font-bold text-[24px] underline"> Session Analytics:</p>
      </div>
      <div className="grid grid-cols-8 gap-[16px]">
        {sessionAnalyticsList?.map((item: any) => (
          <SemesterCard title={item?.session_year} itemDetails={item} />
        ))}
      </div> */}
      {/* <div className=" px-2 flex justify-between items-center bg-light_red  py-[8px]">
        <p className="font-bold text-[24px] underline">Department Analytics:</p>
        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className=" text-[14px] rounded-[8px] px-[8px] py-[4px] placeholder:text-black border-[1px] border-gray_light "
          type="text"
          placeholder="Search by department"
        />
      </div> */}
      {/* <div className="grid grid-cols-4 gap-[16px]">
        {departmentAnalyticsList?.map((item: any) => (
          <AnalyticsCard title={item?.full_name} itemDetails={item} />
        ))}
      </div> */}
      {/* <div className=" px-2 flex justify-between items-center bg-light_red  py-[8px]">
        <p className="font-bold text-[24px] underline">
          Polytechnic Analytics:
        </p>
        <input
          value={institute}
          onChange={(e) => setInstitute(e.target.value)}
          className=" text-[14px] rounded-[8px] px-[8px] py-[4px] placeholder:text-black border-[1px] border-gray_light "
          type="text"
          placeholder="Search by polytechnic"
        />
      </div>
      <div className="grid grid-cols-4 gap-[16px]">
        {institiuteAnalyticsList?.map((item: any) => (
          <AnalyticsCard title={item?.polytechnic_name} itemDetails={item} />
        ))}
      </div> */}
      {/* <CustomBarChart /> */}
    </div>
  );
};

export default page;
