"use client";
import React, { useContext, useEffect, useState } from "react";
import StudentList from "./StudentList";
import StudenFilter from "./StudenFilter";
import { AuthContext } from "../ContextProvider";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "../Pagination";
import { ApiGet } from "@/app/action";

type Props = {};

const Student = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState();
  const [phone, setPhone] = useState<any>("");
  const [semester, setSemester] = useState<any>("");
  const [institute, setInstitute] = useState("");
  const [listData, setListData] = useState([]);

  const [boardRoll, setBoardRoll] = useState<any>("");
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState<any>("");
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const [selectedStatus, setSelectedStatus] = useState<any>("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(7);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(true);

  const getAll = async () => {
    setIsLoading(true);
    if (user && pageNo >= 0 && pageSize > 0) {
      // const res = await axios.get(EndPoint.GET_STUDENT, {
      //   headers: { Authorization: "Bearer " + user?.token },
      //   params: {
      //     limit: pageSize,
      //     offset: pageSize * pageNo,
      //     department: selectedDepartment?.label,
      //     phone_number: phone,
      //     status: selectedStatus?.value,
      //     polytechnic: institute,
      //     semester: semester?.value,
      //     session: selectedSession?.label,
      //   },
      // });
      // const resData = await res.data;

      const { resData, success } = await ApiGet(
        EndPoint.GET_STUDENT,
        {
          limit: pageSize,
          offset: pageSize * pageNo,
          department: selectedDepartment?.label,
          phone_number: phone,
          status: selectedStatus?.value,
          polytechnic: institute,
          semester: semester?.value,
          session: selectedSession?.label,
          student_board_roll: boardRoll,
        },
        user?.access_token
      );
      setListData(resData?.results);
      setTotalDataSet(resData?.count);
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
    boardRoll,
    selectedDepartment,
    selectedStatus,
  ]);
  return (
    <div className=" w-full flex flex-col gap-[8px]  ">
      {hide && (
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
          boardRoll={boardRoll}
          setBoardRoll={setBoardRoll}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setSelectedDepartment={setSelectedDepartment}
        />
      )}
      <button
        className=" flex justify-center text-[14px] items-center bg-green/20 "
        onClick={() => setHide(!hide)}
      >
        {hide ? "Filter Hide" : "Filter Show"}
      </button>
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

export default Student;
