"use client";
import { EndPoint } from "@/utils/api";
import { monthLabel, semesterList } from "@/utils/staticData";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import CustomEnrollmentChart from "../CustomEnrollmentChart";
import { AuthContext } from "../ContextProvider";
import DateFilterDropdown from "../DateFilterDropdown";
import { formatDate } from "date-fns";

type Props = {};

const RefardReport = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [overAll, setOverAll] = useState<any>("");
  const [sessionList, setSessionList] = useState<any>([]);
  const [selectSession, setSelelctSession] = useState<any>("");
  const [selectedSemester, setSelectedSemester] = useState<any>({
    label: "All semester",
    value: "",
  });
  const [departmentList, setDepartmentList] = useState<any>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [selectedDataSupportSummary, setSelectedDataSupportSummary] =
    useState<any>("Last 7 Days");
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const getOverallEarn = async () => {
    if (user) {
      const res = await axios.get(EndPoint.OVERALL_STATESTICS, {
        params: {
          start_date: selectedDataSupportSummary ? "" : startDateSupportSummary,
          end_date: selectedDataSupportSummary ? "" : endDateSupportSummary,
          options: selectedDataSupportSummary,
        },
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      const resData = await res.data;
      setOverAll(resData);
    }
  };

  const getChartData = async () => {
    const res = await axios.get(EndPoint.ENROLLMENT_MONTHLY_CHART_2, {
      params: {
        department_id: selectedDepartment?.value,
        semester: selectedSemester?.value,
        session_id: selectSession?.value,
        package_name: "Refard Course",
      },
    });
    const resData = await res.data;
    //     console.log(resData);

    const transformedEnrollData = resData?.map((item: any) => ({
      day: monthLabel(item.month),
      enroll: item.enrollments,
    }));
    setChartData(transformedEnrollData);
  };

  const getAllSession = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const resData = await res.data;
    setSessionList(resData?.results);
    setSelelctSession({ label: "All session", value: "" });
  };

  const getDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT, {
      params: {
        limit: 400,
      },
    });
    const resData = await res?.data?.results;
    const allDData = [...resData, { label: "All department", value: "" }];
    setDepartmentList(allDData);
    setSelectedDepartment({ label: "All department", value: "" });
  };
  useEffect(() => {
    getOverallEarn();
  }, [
    user,
    selectedDataSupportSummary,
    startDateSupportSummary,
    endDateSupportSummary,
  ]);
  useEffect(() => {
    getChartData();
  }, [selectedDepartment, selectSession, selectedSemester]);
  useEffect(() => {
    getAllSession();
    getDepartment();
  }, []);
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" flex w-full justify-between">
        <p className=" text-[16px] font-semibold ">Refard Summary</p>
        <div className=" text-right">
          <DateFilterDropdown
            selectedData={selectedDataSupportSummary}
            setSelectedData={setSelectedDataSupportSummary}
            setStartDate={setStartDateSupportSummary}
            setEndDate={setEndDateSupportSummary}
            startDate={startDateSupportSummary}
            endDate={endDateSupportSummary}
          />
        </div>
      </div>
      <div className=" flex items-center justify-between gap-6">
        <div className=" w-full justify-between px-4 py-6 border-[1px] flex items-center border-gray_light rounded-[8px]">
          <div className=" flex gap-2">
            <div className=" h-12 w-12 relative">
              <Image src={"/icons/frame2.svg"} fill alt="" />
            </div>
            <div className=" flex flex-col gap-2">
              <p className=" text-[16px] font-semibold">
                {overAll?.total_refard_earn}{" "}
                <span className=" text-orange">TK.</span>
              </p>
              <p className=" text-[13px] text-gray">income</p>
            </div>
          </div>
          <div className=" h-[64px] w-[180px] relative">
            <Image src={"/icons/wave.svg"} fill alt="" />
          </div>
        </div>
        <div className=" w-full justify-between px-4 py-6 border-[1px] flex items-center border-gray_light rounded-[8px]">
          <div className=" flex gap-2">
            <div className=" h-12 w-12 relative">
              <Image src={"/icons/frame1.svg"} fill alt="" />
            </div>
            <div className=" flex flex-col gap-2">
              <p className=" text-[16px] font-semibold">
                {overAll?.total_refard_students}
              </p>
              <p className=" text-[13px] text-gray">enroll</p>
            </div>
          </div>
          <div className=" h-[64px] w-[180px] relative">
            <Image src={"/icons/wave.svg"} fill alt="" />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <Select
          value={selectedDepartment}
          options={departmentList}
          onChange={(e) => setSelectedDepartment(e)}
          placeholder="Select Department"
          maxMenuHeight={150}
          isClearable
        />
        <Select
          value={selectedSemester}
          options={semesterList}
          onChange={(e) => setSelectedSemester(e)}
          placeholder="Select Semester"
          maxMenuHeight={150}
          isClearable
        />
        <Select
          value={selectSession}
          options={sessionList}
          onChange={(e) => setSelelctSession(e)}
          placeholder="Select Session"
          maxMenuHeight={150}
          isClearable
        />
      </div>
      <CustomEnrollmentChart title="Refard Enrollments" dataset={chartData} />
      {/* <div className=" w-full">
    <CustomMultColumnChart />
  </div> */}
    </div>
  );
};

export default RefardReport;
