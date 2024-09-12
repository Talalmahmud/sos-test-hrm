"use client";
import React, { useContext, useEffect, useState } from "react";
import StudentList from "../StudentList";
import StudenFilter from "../StudenFilter";
import { AuthContext } from "@/components/ContextProvider";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";

type Props = {};

const PaidStudent = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState();
  const [phone, setPhone] = useState<any>("");
  const [semester, setSemester] = useState<any>("");
  const [institute, setInstitute] = useState("");
  const [listData, setListData] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState<any>("");
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    setIsLoading(true);
    if (user && pageNo >= 0 && pageSize > 0) {
      const res = await axios.get(EndPoint.GET_ENROLLMENT_LIST, {
        headers: { Authorization: "Bearer " + user?.access_token },
        params: {
          limit: pageSize,
          offset: pageSize * pageNo,
          department: selectedDepartment?.label,
          phone_number: phone,
          status: "Complete",
          polytechnic: institute,
          semester: semester?.value,
          session: selectedSession?.label,
          employee: user?.id,
        },
      });
      const resData = await res.data;
      setListData(resData.results?.map((item: any) => item?.student));
      setTotalDataSet(resData.count);
      setIsLoading(false);
    }
  };

  const getAllSession = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const resData = await res.data;
    setSessionList(resData?.results);
  };

  const getAllDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT);
    const resData = await res.data;
    setDepartmentList(resData?.results);
  };

  useEffect(() => {
    getAllSession();
    getAllDepartment();
  }, []);

  useEffect(() => {
    getAll();
  }, [
    user,
    pageNo,
    pageSize,
    institute,
    selectedSession,
    phone,
    semester,
    selectedDepartment,
  ]);
  return (
    <div className=" w-full flex flex-col gap-[24px] p-[8px] ">
      <StudenFilter
        semester={semester}
        setSemester={setSemester}
        phone={phone}
        setPhone={setPhone}
        selectedSession={selectedSession}
        setSelectedSession={setSelectedSession}
        sessionList={sessionList}
        institute={institute}
        setInstitute={setInstitute}
        deprtmentList={departmentList}
        selectedDepartment={selectedDepartment}
        department={department}
        setSelectedDepartment={setSelectedDepartment}
      />
      <StudentList
        isLoading={isLoading}
        listUpdate={getAll}
        studentList={listData}
      />
      <Pagination
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        totalPage={totalDataSet}
      />
    </div>
  );
};

export default PaidStudent;
