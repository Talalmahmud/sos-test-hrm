"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import SemesterCard from "./SemesterCard";
import { semesterLabel } from "@/utils/staticData";
import Select from "react-select";

type Props = {};

const SemesterAnalytics = (props: Props) => {
  const [sessionList, setSessionList] = useState<any>([]);
  const [selectedsession, setSelectedSession] = useState<any>("");
  const [semesterAnalyticsList, setSemsterAnlyticsList] = useState<any>([]);

  const getSessionList = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const resData = await res.data.results;
    const modifiedList = [...resData, { label: "All", value: "" }];

    setSessionList(modifiedList?.reverse());
    setSelectedSession({ label: "All", value: "" });
  };

  const getSemesterAnalytics = async () => {
    const res = await axios.get(EndPoint.DASHBOARD_SEMESTER_ANALYTICS, {
      params: {
        session_id: selectedsession?.value,
      },
    });
    const resData = await res.data;
    // console.log("t", resData);
    setSemsterAnlyticsList(resData);
  };
  useEffect(() => {
    getSemesterAnalytics();
  }, [selectedsession]);

  useEffect(() => {
    getSessionList();
  }, []);
  return (
    <>
      <div className=" w-[300px]">
        <Select
          className=" text-[14px]"
          value={selectedsession}
          isClearable
          onChange={(e) => setSelectedSession(e)}
          maxMenuHeight={150}
          options={sessionList}
          placeholder="Select session.."
        />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-[16px]">
        {semesterAnalyticsList?.map((item: any) => (
          <SemesterCard
            title={semesterLabel(item?.semester) + " Semester"}
            itemDetails={item}
          />
        ))}
      </div>
    </>
  );
};

export default SemesterAnalytics;
